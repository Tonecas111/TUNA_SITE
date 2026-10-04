
(function () {
  // -------- Read URL parameters --------
  // ?id=<sistemaId>   -> which system to load (required)
  // ?from=rXcY        -> origin cell in the galaxy (used for the back button)
  const params = new URLSearchParams(location.search);
  const sistemaId = params.get("id");
  const fromParam = params.get("from");

  // Guard: without an id there's nothing to render.
  if (!sistemaId) {
    document.body.innerHTML =
      "<p style='color:#ececec;padding:40px;font-family:sans-serif'>Sistema solar não especificado.</p>";
    return;
  }

  // -------- Back-to-galaxy button --------
  // If we know where we came from, point the back link to the exact
  // cell in galaxia.html so the user lands right back on it.
  const backBtn = document.getElementById("back-galaxia");
  if (fromParam) {
    const m = fromParam.match(/r(\d+)c(\d+)/);
    if (m) {
      backBtn.href = `galaxia.html?row=${m[1]}&col=${m[2]}`;
    }
  }

  // -------- Dynamically load the data file --------
  // Each system has its own data file under /data/<id>.js that
  // populates window.sistemasData[id]. We load it on demand instead
  // of shipping every system's data upfront.
  const script = document.createElement("script");
  script.src = `data/${sistemaId}.js`;
  script.onload = () => {
    const data = window.sistemasData && window.sistemasData[sistemaId];
    if (!data) {
      document.body.innerHTML =
        "<p style='color:#ececec;padding:40px;font-family:sans-serif'>Dados do sistema não encontrados.</p>";
      return;
    }
    initSistema(data);
  };
  script.onerror = () => {
    document.body.innerHTML = `<p style='color:#ececec;padding:40px;font-family:sans-serif'>Ficheiro data/${sistemaId}.js não encontrado.</p>`;
  };
  document.head.appendChild(script);

  // -------- Main entry point (runs after data is loaded) --------
  function initSistema(data) {
    // -------- Data unpacking & DOM references --------
    const ROWS = data.rows;
    const COLS = data.cols;
    const items = data.items || [];
    const captionMode = data.captionMode || "individual"; // "common" | "individual"
    const systemCaption = data.caption || "";

    const sistema = document.getElementById("sistema");
    const overlay = document.getElementById("overlay");
    const backdrop = document.getElementById("overlay-backdrop");
    const overlayMedia = overlay.querySelector(".overlay-media");
    const overlayCaption = document.getElementById("overlay-caption");
    const sistemaCaption = document.getElementById("sistema-caption");
    const btnNext = document.getElementById("btn-next");

    // -------- Seeded pseudo-random generator --------
    // Mulberry32 — deterministic: the same seed always yields the same
    // sequence. We seed with sistemaId so each system always lays out
    // the same way across reloads, but different systems look different.
    function makeRng(seedStr) {
      // Hash the string into a 32-bit integer (FNV-1a style)
      let h = 2166136261;
      for (let i = 0; i < seedStr.length; i++) {
        h ^= seedStr.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      let a = h >>> 0;
      return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rand = makeRng(sistemaId);

    // Inject grid dimensions into CSS custom properties so the stylesheet
    // can build the correct number of columns/rows.
    sistema.style.setProperty("--cols", COLS);
    sistema.style.setProperty("--rows", ROWS);

    // General system caption — only shown in "common" mode.
    // In "individual" mode the system caption never appears (only the item's).
    if (systemCaption && captionMode === "common") {
      sistemaCaption.textContent = systemCaption;
      sistemaCaption.classList.remove("hidden");
    }

    // -------- Animations --------
    const ANIM_DURATION = 260;
    const ANIM_EASING = "ease-in-out";

    // Fade an element from 0 -> 1 opacity.
    function animateIn(el) {
      return el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: ANIM_DURATION,
        easing: ANIM_EASING,
        fill: "forwards",
      }).finished;
    }

    // -------- Random distribution with central concentration --------
    // Items aren't placed uniformly — they cluster around the center of
    // the grid. The tunables below control how aggressive that clustering
    // is and how the empty cells look (black/gray/white) at the edges.
    const EXCLUDE_EDGE_RATIO = 0.75; // don't place content in cells with normalized distance > this
    const CONCENTRATION_POWER = 7; // higher = more concentrated at the center
    const BLACK_BASE_PROB = 0.05; // base probability of an empty cell being black
    const BLACK_EDGE_BOOST = 0.5; // max added prob. of black at the edges
    const GRAY_PROB = 0.5; // probability of a non-black cell being gray (vs. white)

    // Geometric center of the grid (works for both odd and even sizes).
    const centerR = (ROWS + 1) / 2;
    const centerC = (COLS + 1) / 2;
    const maxDist = Math.hypot(centerR - 1, centerC - 1);

    // Distance from (r,c) to the center, normalized to [0, 1].
    function normDist(r, c) {
      return Math.hypot(r - centerR, c - centerC) / maxDist;
    }

    // Builds a weighted list of candidate cells (closer to center = heavier)
    // and samples one cell per item (without replacement) using those weights.
    // Mutates each item with its chosen row/col and returns a position map.
    function distributeItems() {
      const candidates = [];
      for (let r = 1; r <= ROWS; r++) {
        for (let c = 1; c <= COLS; c++) {
          const nd = normDist(r, c);
          if (nd > EXCLUDE_EDGE_RATIO) continue;
          const weight = Math.pow(1 - nd, CONCENTRATION_POWER);
          candidates.push({ r, c, weight });
        }
      }

      const placements = new Map();
      for (const item of items) {
        if (candidates.length === 0) break;
        // Weighted random pick: sum all weights, roll in [0, totalW],
        // then walk the array subtracting until we cross zero.
        const totalW = candidates.reduce((s, x) => s + x.weight, 0);
        let pick = rand() * totalW;
        let idx = 0;
        for (let i = 0; i < candidates.length; i++) {
          pick -= candidates[i].weight;
          if (pick <= 0) {
            idx = i;
            break;
          }
        }
        const chosen = candidates[idx];
        placements.set(`${chosen.r}-${chosen.c}`, item);
        item.row = chosen.r;
        item.col = chosen.c;
        candidates.splice(idx, 1); // remove so it isn't picked twice
      }
      return placements;
    }

    const byPos = distributeItems();

    // Currently opened item (null when the overlay is closed).
    let currentItem = null;

    // -------- Grid construction --------
    // Creates ROWS x COLS cells. Cells that match a placed item get the
    // actual content + click handler; the rest become decorative empty
    // cells (black near the edges, otherwise gray/white).
    for (let r = 1; r <= ROWS; r++) {
      for (let c = 1; c <= COLS; c++) {
        const cell = document.createElement("div");
        cell.className = "gcell";
        cell.dataset.row = r;
        cell.dataset.col = c;

        const item = byPos.get(`${r}-${c}`);

        if (item) {
          cell.classList.add("has-content");
          renderCellContent(cell, item);
          cell.addEventListener("click", () => openOverlay(item, cell));
        } else {
          // Empty cell colouring: edges are more likely to be black,
          // creating a soft vignette around the system.
          const nd = normDist(r, c);
          const blackProb = BLACK_BASE_PROB + BLACK_EDGE_BOOST * nd * nd;
          const isBlack = rand() < Math.min(blackProb, 1);
          if (isBlack) {
            cell.classList.add("empty-black");
          } else {
            // Among non-black cells: GRAY_PROB chance of being gray, rest white
            const isGray = rand() < GRAY_PROB;
            cell.classList.add(isGray ? "empty-gray" : "empty-white");
          }
        }

        // Linger effect applied to ALL cells (same as the galaxy):
        // keeps a visual trace for 1s after the cursor leaves.
        let lingerTimeout;
        cell.addEventListener("mouseenter", () => {
          clearTimeout(lingerTimeout);
          cell.classList.remove("linger");
        });
        cell.addEventListener("mouseleave", () => {
          cell.classList.add("linger");
          lingerTimeout = setTimeout(() => {
            cell.classList.remove("linger");
          }, 1000);
        });

        sistema.appendChild(cell);
      }
    }

    // -------- Render the content of a single cell --------
    // Branches by item.type. Note: unlike the galaxy view, media here
    // loads immediately (no IntersectionObserver) because systems are
    // small enough to fit in one screen.
    function renderCellContent(cell, item) {
      if (item.type === "fotografia") {
        const img = document.createElement("img");
        img.className = "media";
        img.src = item.media;
        img.alt = item.caption || "";
        cell.appendChild(img);
      } else if (item.type === "video") {
        const vid = document.createElement("video");
        vid.className = "media";
        // Media fragment "#t=..." tells the browser to display that
        // timestamp as the poster frame — no manual seeking needed.
        vid.src = item.media + "#t=" + (item.thumbTime ?? 0.1);
        vid.muted = true;
        vid.playsInline = true;
        vid.preload = "metadata";
        cell.appendChild(vid);

        const play = document.createElement("div");
        play.className = "play-icon";
        cell.appendChild(play);

        // Expose the native aspect ratio to CSS for layout tweaks.
        vid.addEventListener("loadedmetadata", () => {
          cell.style.setProperty("--vratio", vid.videoWidth / vid.videoHeight);
        });
      } else if (item.type === "texto") {
        const div = document.createElement("div");
        div.className = "text-preview";
        const t = (item.text || "").trim();
        div.textContent = t.length > 60 ? t.slice(0, 60) + "…" : t;
        cell.appendChild(div);
      }
    }

    // -------- Center the system in the viewport --------
    // If the system is larger than the screen, the CSS aligns it to
    // the top/left (safe center) and this scroll brings it to the center.
    // If it's smaller, the body's flex already centered it and
    // scrollTo(0,0) keeps it visible.
    function scrollToCenter() {
      const rect = sistema.getBoundingClientRect();
      const cx =
        window.scrollX + rect.left + rect.width / 2 - window.innerWidth / 2;
      const cy =
        window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
      window.scrollTo({
        left: Math.max(0, cx),
        top: Math.max(0, cy),
        behavior: "auto",
      });
    }
    scrollToCenter();

    // -------- Auto-open the first item --------
    // Systems are meant to be browsed sequentially, so we land directly
    // on the first item with its overlay already open.
    if (items.length > 0) {
      const firstItem = items[0];
      const cellEl = scrollToCell(firstItem.row, firstItem.col, false);
      if (cellEl) openOverlay(firstItem, cellEl);
    }

    // Scroll the window so a given cell sits in the middle of the viewport.
    function scrollToCell(row, col, smooth = false) {
      const target = sistema.querySelector(
        `[data-row="${row}"][data-col="${col}"]`,
      );
      if (!target) return null;
      const rect = target.getBoundingClientRect();
      const cx =
        window.scrollX + rect.left + rect.width / 2 - window.innerWidth / 2;
      const cy =
        window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
      window.scrollTo({
        left: cx,
        top: cy,
        behavior: smooth ? "smooth" : "auto",
      });
      return target;
    }

    // -------- Open the overlay for a given item --------
    // Builds the media node, swaps captions according to captionMode,
    // and runs the right animation (full open vs. item-to-item transition).
    function openOverlay(item, cellEl) {
      currentItem = item;

      // Cancel pending animations so a fast click doesn't stack tweens.
      [overlay, overlayMedia, overlayCaption].forEach((el) =>
        el.getAnimations().forEach((a) => a.cancel()),
      );

      const wasHidden = overlay.classList.contains("hidden");
      overlayMedia.innerHTML = "";

      // Build media node based on item.type
      if (item.type === "fotografia") {
        const img = document.createElement("img");
        img.src = item.media;
        img.alt = item.caption || "";
        overlayMedia.appendChild(img);
      } else if (item.type === "video") {
        const vid = document.createElement("video");
        vid.src = item.media;
        vid.controls = false;
        vid.autoplay = true;
        vid.loop = true;
        overlayMedia.appendChild(vid);
      } else if (item.type === "texto") {
        const div = document.createElement("div");
        div.className = "full-text";
        div.textContent = item.text || "";
        overlayMedia.appendChild(div);
      }

      // Captions: behaviour depends on the mode
      if (captionMode === "individual") {
        overlayCaption.textContent = item.caption2 || item.caption || "";
        overlayCaption.classList.remove("hidden");
        // sistemaCaption stays visible below
      } else {
        // "common" mode: only the general system caption is shown
        overlayCaption.classList.add("hidden");
      }

      overlay.classList.remove("hidden");
      backdrop.classList.remove("hidden");

      if (wasHidden) {
        // Fresh open
        animateIn(overlay);
        // backdrop has been visible since load — don't animate it
        if (captionMode === "individual") animateIn(overlayCaption);
      } else {
        // Transition between items: fade-in the new content
        const fadeInOptions = {
          duration: 200,
          easing: "ease-out",
          fill: "forwards",
        };
        const fadeInTargets = [overlayMedia, btnNext];
        if (captionMode === "individual") fadeInTargets.push(overlayCaption);

        fadeInTargets.forEach((el) =>
          el.animate([{ opacity: 0 }, { opacity: 1 }], fadeInOptions),
        );
      }
    }

    // -------- Linear navigation (with wrap-around) --------
    // Fades the current content out, scrolls to the next item's cell,
    // and reopens the overlay there. The 100ms delay matches the
    // fade-out duration so there's no visual overlap.
    async function goToItem(nextItem) {
      if (!nextItem) return;

      const fadeOutOptions = {
        duration: 100,
        easing: "ease-in",
        fill: "forwards",
      };
      const fadeOutTargets = [overlayMedia, btnNext];
      if (captionMode === "individual") fadeOutTargets.push(overlayCaption);

      await Promise.all(
        fadeOutTargets.map(
          (el) =>
            el.animate([{ opacity: 1 }, { opacity: 0 }], fadeOutOptions)
              .finished,
        ),
      );

      scrollToCell(nextItem.row, nextItem.col, true);
      setTimeout(() => {
        const cellEl = sistema.querySelector(
          `[data-row="${nextItem.row}"][data-col="${nextItem.col}"]`,
        );
        if (cellEl) openOverlay(nextItem, cellEl);
      }, 100);
    }

    // Advance to the next item in the data file's order, wrapping to
    // the first when we reach the end.
    function goNext() {
      if (!currentItem || items.length === 0) return;
      const idx = items.indexOf(currentItem);
      const nextItem = items[(idx + 1) % items.length];
      goToItem(nextItem);
    }

    // -------- Global controls --------
    btnNext.addEventListener("click", goNext);

    // ArrowRight -> next item
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") goNext();
    });

    // Space toggles play/pause on the currently open video
    // (and prevents the default page-scroll behaviour).
    document.addEventListener("keydown", (e) => {
      if (e.code !== "Space") return;
      if (overlay.classList.contains("hidden")) return;
      const vid = overlayMedia.querySelector("video");
      if (!vid) return;
      e.preventDefault();
      if (vid.paused) vid.play();
      else vid.pause();
    });
  }
})();
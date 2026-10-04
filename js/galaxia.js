
(function () {
  // -------- Grid dimensions & limits --------
  const ROWS = 23;
  const COLS = 41;
  const TEXT_PREVIEW_MAX = 33; // max number of characters shown in the text preview

  // -------- DOM references --------
  const galaxia = document.getElementById("galaxia");
  const overlay = document.getElementById("overlay");
  const backdrop = document.getElementById("overlay-backdrop");
  const overlayMedia = overlay.querySelector(".overlay-media");
  const overlayCaption = document.getElementById("overlay-caption");
  const btnClose = document.getElementById("btn-close");
  const btnNext = document.getElementById("btn-next");
  const btnPlus = document.getElementById("btn-plus");
  const tooltip = document.getElementById("tooltip");

  // -------- Overlay animations --------
  // Shared timing for all fade in/out transitions on the overlay.
  const ANIM_DURATION = 260; // milliseconds
  const ANIM_EASING = "ease-in-out";

  // Fade an element from 0 -> 1 opacity.
  function animateIn(el) {
    // Note: the final transform must preserve translate(-50%, -50%)
    return el.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: ANIM_DURATION,
      easing: ANIM_EASING,
      fill: "forwards",
    }).finished;
  }

  // Fade an element from 1 -> 0 opacity.
  function animateOut(el) {
    return el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: ANIM_DURATION,
      easing: ANIM_EASING,
      fill: "forwards",
    }).finished;
  }

  // Generic opacity tween for the backdrop (explicit from/to values).
  function fadeBackdrop(el, from, to) {
    return el.animate([{ opacity: from }, { opacity: to }], {
      duration: ANIM_DURATION,
      easing: ANIM_EASING,
      fill: "forwards",
    }).finished;
  }

  // -------- Item indexes --------
  // Two lookup maps built from cosmosData:
  //   byPos -> find item by "row-col" key (used while building the grid)
  //   byId  -> find item by id (used by the linear ">" navigation)
  const byPos = new Map();
  const byId = new Map();
  cosmosData.forEach((d) => {
    byPos.set(`${d.row}-${d.col}`, d);
    if (d.id) byId.set(d.id, d);
  });

  // Currently opened item (null when the overlay is closed).
  let currentItem = null;

  // -------- Lazy loading of media --------
  // IntersectionObserver that defers loading of images/videos until
  // the cell approaches the viewport (300px rootMargin for pre-fetch).
  const mediaObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target.querySelector("img[data-src], video[data-src]");
        if (!el) {
          mediaObserver.unobserve(entry.target);
          continue;
        }

        if (el.tagName === "VIDEO") {
          // For videos we want to display a specific frame as the "thumbnail".
          const thumbTime = parseFloat(el.dataset.thumbTime) || 0.1;
          el.preload = "auto";

          // Seek to the desired thumbnail time, retrying while the
          // seekable range isn't yet populated (Safari quirk).
          const doSeek = (attempt = 0) => {
            // Safari: sometimes loadedmetadata fires before seekable is ready
            if (!el.seekable || el.seekable.length === 0) {
              if (attempt < 20) {
                setTimeout(() => doSeek(attempt + 1), 50);
              }
              return;
            }
            const maxSeek = el.seekable.end(el.seekable.length - 1);
            const dur = el.duration || thumbTime;
            const target = Math.min(thumbTime, maxSeek - 0.05, dur - 0.05);
            if (target <= 0) return;

            try {
              el.currentTime = target;
            } catch (err) {
              if (attempt < 3) setTimeout(() => doSeek(attempt + 1), 100);
            }
          };

          // If metadata already arrived (cache), seek immediately;
          // otherwise wait for the event.
          if (el.readyState >= 1) {
            doSeek();
          } else {
            el.addEventListener("loadedmetadata", () => doSeek(), {
              once: true,
            });
          }

          el.src = el.dataset.src;
          el.load();
          delete el.dataset.src;
          // ⚠️ DO NOT delete dataset.thumbTime — we need it for the retry check
        } else {
          // Image: simply promote data-src to src.
          el.src = el.dataset.src;
          delete el.dataset.src;
        }

        mediaObserver.unobserve(entry.target);
      }
    },
    { rootMargin: "300px" },
  );

  // -------- Deterministic pseudo-random --------
  // Produces a stable "random" number for a given (row, col) pair, so that
  // empty cells always get the same black/white colour across reloads.
  function pseudoRand(r, c) {
    const x = Math.sin(r * 928371 + c * 12345) * 10000;
    return x - Math.floor(x);
  }

  // -------- Grid construction --------
  // Creates ROWS x COLS cells. If a cell corresponds to a cosmosData item,
  // its content is rendered and click/hover handlers are attached. Otherwise
  // the cell is marked as empty (black or white, deterministically).
  for (let r = 1; r <= ROWS; r++) {
    for (let c = 1; c <= COLS; c++) {
      const cell = document.createElement("div");
      cell.className = "gcell";
      cell.dataset.row = r;
      cell.dataset.col = c;

      const rawItem = byPos.get(`${r}-${c}`);
      // In the galaxy view, "creditos" items are ignored (treated as empty cells)
      const item = rawItem && rawItem.type !== "creditos" ? rawItem : null;

      if (item) {
        cell.classList.add("has-content");
        renderCellContent(cell, item);
        cell.addEventListener("click", () => openOverlay(item, cell));
        cell.addEventListener("mouseenter", () => {
          tooltip.textContent = item.caption || "";
          tooltip.classList.remove("hidden");
        });
        cell.addEventListener("mouseleave", () => {
          tooltip.classList.add("hidden");
        });
      } else {
        const black = pseudoRand(r, c) < 0.5;
        cell.classList.add(black ? "empty-black" : "empty-white");
      }

      // "Linger" effect: when the cursor leaves a cell, keep a visual trace
      // for 1 second before clearing. Applied to ALL cells (empty or not).
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

      galaxia.appendChild(cell);
    }
  }

  // Global listener that follows the cursor with the tooltip.
  // Declared OUTSIDE the loop so it's only registered ONCE.
  document.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + "px";
    tooltip.style.top = e.clientY + "px";

    // If the cursor is in the right half of the viewport, flip the
    // tooltip so it opens to the left instead of overflowing.
    if (e.clientX > window.innerWidth / 2) {
      tooltip.classList.add("flip");
    } else {
      tooltip.classList.remove("flip");
    }
  });

  // -------- Render the content of a single cell --------
  // Branches by item.type (fotografia / video / texto) and attaches
  // the "+" extras marker if plusUrl is defined.
  function renderCellContent(cell, item) {
    if (item.type === "fotografia") {
      const img = document.createElement("img");
      img.decoding = "async";
      img.className = "media";
      img.dataset.src = item.media; // don't load yet — handled by the observer
      img.alt = item.caption || "";
      img.addEventListener("load", () => cell.classList.add("loaded"));
      cell.appendChild(img);
      mediaObserver.observe(cell);
    } else if (item.type === "video") {
      const vid = document.createElement("video");
      vid.className = "media";
      vid.muted = true;
      vid.playsInline = true;
      vid.preload = "none";
      vid.dataset.src = item.media;
      vid.dataset.thumbTime = item.thumbTime ?? 0.1;
      cell.appendChild(vid);

      // Overlay play icon on top of the video thumbnail.
      const play = document.createElement("div");
      play.className = "play-icon";
      cell.appendChild(play);

      const markLoaded = () => cell.classList.add("loaded");

      // Store the native aspect ratio as a CSS variable, so the CSS
      // can shape the cell/preview if needed.
      vid.addEventListener("loadedmetadata", () => {
        cell.style.setProperty("--vratio", vid.videoWidth / vid.videoHeight);
      });

      // Guard so "loaded" is only applied once (multiple events can fire).
      let loaded = false;
      const markLoadedOnce = () => {
        if (loaded) return;
        loaded = true;
        cell.classList.add("loaded");
      };

      // requestVideoFrameCallback is the MOST reliable signal that a frame
      // has actually been painted. Supported in Safari 15.4+ and Chrome/Edge.
      const supportsRVFC =
        "requestVideoFrameCallback" in HTMLVideoElement.prototype;

      // Fires after the seek completes. Validates the result and only
      // marks the cell as loaded once we're confident a real frame is up.
      const onSeeked = () => {
        const expected = parseFloat(vid.dataset.thumbTime) || 0;
        // If we requested a frame > 0 but ended up near 0, the seek failed.
        // Try again (up to 3 times).
        if (expected > 0.1 && vid.currentTime < 0.05) {
          const attempts = parseInt(vid.dataset.seekAttempts || "0", 10);
          if (attempts < 3) {
            vid.dataset.seekAttempts = attempts + 1;
            try {
              vid.currentTime = expected;
            } catch (e) {}
            return; // wait for a new "seeked" event
          }
        }

        // Wait until the frame is really painted before revealing the cell.
        if (supportsRVFC) {
          vid.requestVideoFrameCallback(() => markLoadedOnce());
          // Safety net: in case the callback never arrives for some reason
          setTimeout(markLoadedOnce, 1500);
        } else {
          // Small delay so old Safari has time to paint
          setTimeout(markLoadedOnce, 80);
        }
      };

      vid.addEventListener("seeked", onSeeked);

      // Fallbacks: if we never actually seeked (thumbTime=0 or total failure),
      // accept loadeddata/canplay as a minimum "ready" signal.
      vid.addEventListener("loadeddata", () => {
        const expected = parseFloat(vid.dataset.thumbTime) || 0;
        if (expected <= 0.1) markLoadedOnce();
      });
      vid.addEventListener("canplay", () => {
        const expected = parseFloat(vid.dataset.thumbTime) || 0;
        if (expected <= 0.1) markLoadedOnce();
      });

      mediaObserver.observe(cell);
    } else if (item.type === "texto") {
      // Text preview: lowercase, no whitespace, truncated to TEXT_PREVIEW_MAX.
      const div = document.createElement("div");
      div.className = "text-preview";
      const raw = (item.text || "").trim().toLowerCase();
      const clean = raw.replace(/\s+/g, "");
      div.textContent = clean.slice(0, TEXT_PREVIEW_MAX);
      cell.appendChild(div);
      // 👇 ADD — text has no load event, mark it as loaded immediately
      cell.classList.add("loaded");
    }

    // Optional "+" marker that links to extra content for this item.
    if (item.plusUrl) {
      const mark = document.createElement("a"); // or "div", depending on the version you used
      mark.className = "plus-marker";
      mark.textContent = "+";
      const sep = item.plusUrl.includes("?") ? "&" : "?";
      // Append from=rXcY so the extras page knows where to return to.
      mark.href = `${item.plusUrl}${sep}from=r${item.row}c${item.col}`;

      mark.title = "Ver extras";

      // Prevent the "+" click from bubbling up and opening the overlay.
      mark.addEventListener("click", (e) => e.stopPropagation());
      mark.addEventListener("pointerdown", (e) => e.stopPropagation());

      // Hide the tooltip while hovering the "+"
      mark.addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        tooltip.classList.add("hidden");
      });

      // (Optional) show it again when leaving the "+" but still inside the cell
      mark.addEventListener("mouseleave", (e) => {
        e.stopPropagation();
        if (item.caption) {
          tooltip.textContent = item.caption;
          tooltip.classList.remove("hidden");
        }
      });

      cell.appendChild(mark);
    }
  }

  // -------- Center the page on the cell coming from the cosmos --------
  // The cosmos view links here with ?row=X&col=Y so we land right on
  // the item that was clicked. If no params, center the grid.
  const params = new URLSearchParams(location.search);
  const wantRow = parseInt(params.get("row"));
  const wantCol = parseInt(params.get("col"));

  // Scroll the window so a given cell sits in the middle of the viewport.
  function scrollToCell(row, col, smooth = false) {
    const target = galaxia.querySelector(
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

  if (!isNaN(wantRow) && !isNaN(wantCol)) {
    scrollToCell(wantRow, wantCol);
  } else {
    scrollToCell(Math.ceil(ROWS / 2), Math.ceil(COLS / 2));
  }

  // -------- Drag to navigate --------
  // Click-and-drag on the galaxy pans the viewport (like dragging a map).
  // A small threshold (4px) distinguishes a drag from a click so cells
  // still open on simple clicks.
  (function enableDragScroll() {
    let isDown = false;
    let startX = 0,
      startY = 0;
    let startScrollX = 0,
      startScrollY = 0;
    let moved = false;

    galaxia.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return; // only left button
      isDown = true;
      moved = false;
      startX = e.clientX;
      startY = e.clientY;
      startScrollX = window.scrollX;
      startScrollY = window.scrollY;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!moved && Math.hypot(dx, dy) > 4) {
        moved = true;
        galaxia.classList.add("dragging");
      }
      if (moved) {
        window.scrollTo(startScrollX - dx, startScrollY - dy);
      }
    });

    window.addEventListener("mouseup", () => {
      if (!isDown) return;
      isDown = false;
      // Defer removing the class so a late click doesn't trigger an open.
      setTimeout(() => galaxia.classList.remove("dragging"), 0);
    });

    // Prevent native image/text drag from interfering.
    galaxia.addEventListener("dragstart", (e) => e.preventDefault());
  })();

  // -------- Position the overlay over a cell (SINGLE definition) --------
  // Places the overlay centered on cellEl, then clamps it inside the
  // viewport (keeping margins and leaving room for the caption and for
  // the absolutely-positioned action buttons that sit to the right).
  function positionOverlayOver(cellEl) {
    // Height reserved at the bottom for the caption
    const BOTTOM_RESERVED = 60;

    const rect = cellEl.getBoundingClientRect();
    let cx = rect.left + rect.width / 2;
    let cy = rect.top + rect.height / 2;

    overlay.style.left = cx + "px";
    overlay.style.top = cy + "px";

    requestAnimationFrame(() => {
      const oRect = overlay.getBoundingClientRect();
      const margin = 16;

      // The buttons are absolutely positioned to the right of the overlay,
      // so they're NOT part of oRect. We measure them separately and
      // subtract how much they stick out to the right (and, if applicable,
      // to the bottom) when clamping.
      const buttonsEl = overlay.querySelector(".overlay-buttons");
      const bRect = buttonsEl ? buttonsEl.getBoundingClientRect() : null;
      const rightExtra = bRect ? Math.max(0, bRect.right - oRect.right) : 0;
      const bottomExtra = bRect ? Math.max(0, bRect.bottom - oRect.bottom) : 0;

      const halfW = oRect.width / 2;
      const halfH = oRect.height / 2;

      const minX = halfW + margin;
      // 👇 include the space taken by the buttons on the right
      const maxX = window.innerWidth - halfW - margin - rightExtra;
      const minY = halfH + margin;
      // 👇 include, if any, the space taken by the buttons below
      const maxY = window.innerHeight - BOTTOM_RESERVED - halfH - bottomExtra;

      // Clamp cx/cy; if the overlay is wider than the viewport, fall back
      // to a centered position.
      cx =
        minX > maxX
          ? window.innerWidth / 2
          : Math.min(Math.max(cx, minX), maxX);
      cy = minY > maxY ? minY : Math.min(Math.max(cy, minY), maxY);

      overlay.style.left = cx + "px";
      overlay.style.top = cy + "px";
    });
  }

  // -------- Open the overlay for a given item --------
  // Builds the media node, wires up the "+" button, positions the overlay
  // and runs the right animation (full open vs. transition between items).
  function openOverlay(item, cellEl) {
    if (item.type === "creditos") return;
    currentItem = item;
    tooltip.classList.add("hidden");

    // Cancel any pending animations on all overlay-related elements.
    [overlay, backdrop, overlayMedia, overlayCaption].forEach((el) => {
      el.getAnimations().forEach((a) => a.cancel());
    });

    // Check whether the overlay was already open BEFORE we change classes.
    const wasHidden = overlay.classList.contains("hidden");

    // Clear previous media
    overlayMedia.innerHTML = "";

    // Build the media node based on item.type
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

    // Make sure the caption lives on <body>, outside #overlay (which has
    // a transform that would otherwise affect its positioning).
    if (overlayCaption.parentElement !== document.body) {
      document.body.appendChild(overlayCaption);
    }
    overlayCaption.textContent = item.caption2 || item.caption || "";

    // "+" extras button — only visible when the item has plusUrl.
    if (item.plusUrl) {
      btnPlus.classList.remove("hidden");
      btnPlus.onclick = () => {
        const sep = item.plusUrl.includes("?") ? "&" : "?";
        window.location.href = `${item.plusUrl}${sep}from=r${item.row}c${item.col}`;
      };
    } else {
      btnPlus.classList.add("hidden");
      btnPlus.onclick = null;
    }

    // Reveal the overlay
    overlay.classList.remove("hidden");
    backdrop.classList.remove("hidden");
    overlayCaption.classList.remove("hidden");

    // Position it immediately (text items are centered, media items
    // are placed over the originating cell).
    if (item.type === "texto") {
      centerOverlay();
    } else {
      positionOverlayOver(cellEl);
    }

    // Animate the entrance ONLY if it was previously closed
    // Entrance animation
    if (wasHidden) {
      // Fresh open: animate overlay, backdrop and caption together
      animateIn(overlay);
      animateIn(overlayCaption);
      fadeBackdrop(backdrop, 0, 1);
    } else {
      // Transition between items: fade-in the new content (media + caption + buttons)
      const fadeInOptions = {
        duration: 200,
        easing: "ease-out",
        fill: "forwards",
      };
      const fadeInTargets = [overlayMedia, overlayCaption, btnClose, btnNext];
      // Only animate btnPlus if it's visible for the new item
      if (!btnPlus.classList.contains("hidden")) fadeInTargets.push(btnPlus);

      fadeInTargets.forEach((el) =>
        el.animate([{ opacity: 0 }, { opacity: 1 }], fadeInOptions),
      );
    }

    // Reposition once the media has loaded (dimensions may change the
    // overlay's bounding box and therefore the clamping result).
    const mediaEl = overlayMedia.querySelector("img, video");
    if (mediaEl && item.type !== "texto") {
      const reposition = () => positionOverlayOver(cellEl);
      if (mediaEl.tagName === "IMG") {
        mediaEl.addEventListener("load", reposition, { once: true });
      } else {
        mediaEl.addEventListener("loadedmetadata", reposition, { once: true });
      }
    }
  }

  // Center the overlay in the viewport (used for text items).
  function centerOverlay() {
    // Places the overlay at the center of the viewport.
    // The CSS already applies transform: translate(-50%, -50%), so
    // top/left at 50% centers it perfectly.
    overlay.style.top = "50%";
    overlay.style.left = "50%";
  }

  // -------- Close the overlay with a fade-out --------
  async function closeOverlay() {
    // Animate out (including the caption, now that it lives outside #overlay)
    await Promise.all([
      animateOut(overlay),
      fadeBackdrop(backdrop, 1, 0),
      overlayCaption.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        easing: "ease-in",
        fill: "forwards",
      }).finished,
    ]);

    // Only hide after the animation finishes
    overlay.classList.add("hidden");
    backdrop.classList.add("hidden");
    overlayCaption.classList.add("hidden");
    overlayMedia.innerHTML = "";
    currentItem = null;
  }

  // -------- Go to the next item (linear reading) --------
  // Uses currentItem.next (an id). If missing or not found, wraps
  // around to the first item in cosmosData.
  async function goNext() {
    if (!currentItem) return;
    let nextItem = null;
    if (currentItem.next) nextItem = byId.get(currentItem.next);
    if (!nextItem) nextItem = cosmosData[0];
    if (!nextItem) return;

    // Fade-out of the old content (media + caption + buttons)
    const fadeOutOptions = {
      duration: 180,
      easing: "ease-in",
      fill: "forwards",
    };
    const fadeOutTargets = [overlayMedia, overlayCaption, btnClose, btnNext];
    if (!btnPlus.classList.contains("hidden")) fadeOutTargets.push(btnPlus);

    await Promise.all(
      fadeOutTargets.map(
        (el) =>
          el.animate([{ opacity: 1 }, { opacity: 0 }], fadeOutOptions).finished,
      ),
    );

    // Scroll to the next cell, then open its overlay once the scroll
    // has had time to arrive (350ms matches the smooth-scroll duration).
    scrollToCell(nextItem.row, nextItem.col, true);
    setTimeout(() => {
      const cellEl = galaxia.querySelector(
        `[data-row="${nextItem.row}"][data-col="${nextItem.col}"]`,
      );
      if (cellEl) openOverlay(nextItem, cellEl);
    }, 350);
  }

  // -------- Global controls --------
  btnClose.addEventListener("click", closeOverlay);
  backdrop.addEventListener("click", closeOverlay);
  btnNext.addEventListener("click", goNext);

  // Keyboard shortcuts while the overlay is open:
  //   Esc        -> close
  //   ArrowRight -> next item
  document.addEventListener("keydown", (e) => {
    if (overlay.classList.contains("hidden")) return;
    if (e.key === "Escape") closeOverlay();
    if (e.key === "ArrowRight") goNext();
  });

  // Space bar toggles play/pause on an open video (and prevents the
  // default page-scroll behaviour).
  document.addEventListener("keydown", (e) => {
    if (e.code !== "Space") return;
    if (overlay.classList.contains("hidden")) return;

    const vid = overlayMedia.querySelector("video");
    if (!vid) return;

    e.preventDefault(); // prevent the page from scrolling
    if (vid.paused) {
      vid.play();
    } else {
      vid.pause();
    }
  });
})();

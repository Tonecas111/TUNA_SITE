const ASTRO_CONFIG = {
  // Drift movement in px — ANIMATED continuously
  driftAmpMin: 0.7,   // Minimum oscillation amplitude
  driftAmpMax: 3.5,   // Maximum oscillation amplitude
  driftSpeedMin: 0.4, // Minimum oscillation speed
  driftSpeedMax: 1,   // Maximum oscillation speed

  // Opacity (static, varies between icons but doesn't animate)
  opacityMin: 0.6,
  opacityMax: 0.95,

  // Scale (static, varies between icons but doesn't animate)
  scaleMin: 0.85,
  scaleMax: 1.25,

  // -------- Cursor interaction (linger effect) --------
  proximityRadius: 40,   // Radius in px around the cursor that triggers the boost
  proximityScale: 0.2,   // Extra scale added on top of the icon's base scale
  proximityFade: 0.3,    // Seconds it takes for the boost to decay back to 0
  proximityOpacity: 1,   // Target opacity while the cursor is close
};

// Small helper: random float between min and max
const rand = (min, max) => min + Math.random() * (max - min);

// ============================================================
//  MAIN IIFE — builds the grid and runs the animation loop.
//  Wrapped in an IIFE to keep variables out of the global scope.
// ============================================================
(function () {
  const ROWS = 23; // Grid height (number of rows)
  const COLS = 41; // Grid width (number of columns)
  const grid = document.getElementById("cosmos");   // Grid container
  const tooltip = document.getElementById("tooltip"); // Floating tooltip element

  // Map of item type -> PNG icon path
  const ICONS = {
    fotografia: "media/icons/fotografia.png",
    texto: "media/icons/texto.png",
    video: "media/icons/video.png",
    creditos: "media/icons/creditos.png",
  };

  // Quick lookup by "row-col" so we know which cells get an icon
  const map = new Map();
  cosmosData.forEach((d) => map.set(`${d.row}-${d.col}`, d));

  // ------------------------------------------------------------
  // Build the grid cell by cell. Cells without data stay empty
  // (just reserve the space); cells with data receive an icon
  // plus hover/click behaviour.
  // ------------------------------------------------------------
  for (let r = 1; r <= ROWS; r++) {
    for (let c = 1; c <= COLS; c++) {
      const data = map.get(`${r}-${c}`);               // Data for this cell (if any)
      const cell = document.createElement("div");       // Cell wrapper
      cell.className = "cell" + (data ? "" : " empty"); // Empty cells get the ".empty" modifier

      if (data) {
        const icon = document.createElement("img"); // Icon element for this astro
        icon.className = "symbol";
        icon.src = ICONS[data.type];                // Resolve the PNG path from the type
        icon.alt = data.type;
        icon.dataset.type = data.type;

        const C = ASTRO_CONFIG; // Short alias for readability below

        // Movement parameters (animated) — stored as data-attrs so
        // we can rebuild the state array in a single pass later.
        icon.dataset.ax = rand(C.driftAmpMin, C.driftAmpMax).toFixed(2);   // Amplitude X
        icon.dataset.ay = rand(C.driftAmpMin, C.driftAmpMax).toFixed(2);   // Amplitude Y
        icon.dataset.sx = rand(C.driftSpeedMin, C.driftSpeedMax).toFixed(3); // Speed X
        icon.dataset.sy = rand(C.driftSpeedMin, C.driftSpeedMax).toFixed(3); // Speed Y
        icon.dataset.px = (Math.random() * Math.PI * 2).toFixed(3); // Phase X (random offset)
        icon.dataset.py = (Math.random() * Math.PI * 2).toFixed(3); // Phase Y (random offset)

        // Opacity and scale (static — applied once, never animated)
        const staticOpacity = rand(C.opacityMin, C.opacityMax);
        const staticScale = rand(C.scaleMin, C.scaleMax);
        icon.dataset.ob = staticOpacity.toFixed(3); // Base opacity, saved for the cursor boost
        icon.dataset.scb = staticScale.toFixed(3);  // Base scale, saved for the cursor boost
        icon.style.opacity = staticOpacity.toFixed(2);
        // Note: scale is NOT set here because the transform is rewritten every frame in rAF

        cell.appendChild(icon);

        // ---- Hover: show tooltip + mark icon as "hovered" ----
        cell.addEventListener("mouseenter", () => {
          tooltip.textContent = data.caption || "";
          tooltip.classList.add("visible");
          tooltip.classList.toggle(
            "tooltip--creditos",
            data.type === "creditos",
          ); // Special styling for the credits tooltip
          icon.classList.add("hovered");
        });
        cell.addEventListener("mouseleave", () => {
          tooltip.classList.remove("visible");
          tooltip.classList.remove("tooltip--creditos");
          icon.classList.remove("hovered");
        });

        // ---- Click: navigate to the galaxy view (credits are not clickable) ----
        if (data.type !== "creditos") {
          cell.addEventListener("click", () => {
            const params = new URLSearchParams({
              row: data.row,
              col: data.col,
              id: data.id || "",
            });
            window.location.href = "galaxia.html?" + params.toString();
          });
        }
      }

      grid.appendChild(cell);
    }
  }

  // ------------------------------------------------------------
  // Build the animation state array once — reading from the DOM
  // every frame would be far too slow.
  // ------------------------------------------------------------
  const icons = Array.from(document.querySelectorAll(".symbol"));

  const state = icons.map((el) => ({
    el,
    ax: parseFloat(el.dataset.ax), // Amplitude X
    ay: parseFloat(el.dataset.ay), // Amplitude Y
    sx: parseFloat(el.dataset.sx), // Speed X
    sy: parseFloat(el.dataset.sy), // Speed Y
    px: parseFloat(el.dataset.px), // Phase X
    py: parseFloat(el.dataset.py), // Phase Y
    ob: parseFloat(el.dataset.ob),  // Base opacity (static)
    scb: parseFloat(el.dataset.scb), // Base scale (static)
    boost: 0,                        // Current cursor-proximity boost (0..1)
  }));

  // ------------------------------------------------------------
  // Cache the on-screen center of each icon. Recomputed only on
  // resize/scroll because getBoundingClientRect is expensive.
  // ------------------------------------------------------------
  function refreshPositions() {
    for (const s of state) {
      const r = s.el.getBoundingClientRect();
      s.cx = r.left + r.width / 2;
      s.cy = r.top + r.height / 2;
    }
  }
  refreshPositions();
  window.addEventListener("resize", refreshPositions);
  window.addEventListener("scroll", refreshPositions, { passive: true });

  // Make sure every astro starts with boost = 0
  for (const s of state) s.boost = 0;

  // Cursor tracking (used by the proximity boost)
  const mouse = { x: -9999, y: -9999, active: false };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener("mouseleave", () => {
    mouse.active = false; // Cursor left the window — disable the boost
  });

  const start = performance.now();    // Reference time for the sine waves
  let lastTime = performance.now();   // Previous frame timestamp (for delta time)

  // ============================================================
  // Main animation loop (runs every frame via rAF).
  // Updates drift, cursor-proximity boost, scale and opacity.
  // ============================================================
  function animate(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1); // Delta time clamped to avoid huge jumps
    lastTime = now;
    const t = (now - start) / 1000; // Elapsed time in seconds

    const C = ASTRO_CONFIG;
    const r2 = C.proximityRadius * C.proximityRadius; // Squared radius (avoid sqrt per icon)
    const decayPerSec = 1 / C.proximityFade;          // How fast the boost fades to zero

    for (let i = 0; i < state.length; i++) {
      const s = state[i];
      if (s.el.classList.contains("hovered")) continue; // Skip icons being hovered (CSS takes over)

      // ---- Update the cursor-proximity boost ----
      if (mouse.active) {
        const dx = mouse.x - s.cx;
        const dy = mouse.y - s.cy;
        if (dx * dx + dy * dy <= r2) {
          s.boost = 1; // Cursor is inside the proximity radius
        } else {
          s.boost = Math.max(0, s.boost - dt * decayPerSec); // Decay back to 0
        }
      } else {
        s.boost = Math.max(0, s.boost - dt * decayPerSec);
      }

      // ---- Drift movement (the only thing animated continuously) ----
      const x = Math.sin(t * s.sx + s.px) * s.ax;
      const y = Math.cos(t * s.sy + s.py) * s.ay;

      // ---- Scale: static base + cursor boost (with ease-out curve) ----
      const eased = s.boost * (2 - s.boost); // Quadratic ease-out on the boost
      const scale = s.scb + eased * C.proximityScale;

      s.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(2)})`;

      // ---- Opacity: only touched when the boost changes, to avoid redundant style writes ----
      if (s.boost > 0) {
        const opacity = s.ob + eased * (C.proximityOpacity - s.ob);
        s.el.style.opacity = opacity.toFixed(2);
      } else if (s.lastBoost > 0) {
        // Boost just ended: reset to base opacity, one single time
        s.el.style.opacity = s.ob.toFixed(2);
      }
      s.lastBoost = s.boost; // Remember this frame's boost for the next iteration
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate); // Kick off the loop

  // ------------------------------------------------------------
  // Tooltip follows the cursor. Flips side depending on whether
  // the cursor is on the left or right half of the window, so
  // the label never gets clipped by the viewport edge.
  // ------------------------------------------------------------
  document.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + "px";
    tooltip.style.top = e.clientY + "px";

    const mid = window.innerWidth / 2;
    if (e.clientX > mid + 40) {
      tooltip.classList.add("flip");    // Right half: flip tooltip to the left of the cursor
    } else if (e.clientX < mid - 40) {
      tooltip.classList.remove("flip"); // Left half: default position (right of the cursor)
    }
    // 40px dead zone in the middle to prevent flicker when crossing the center
  });
})();

// ============================================================
//  PREFETCH — galaxy assets
//  Runs in the background while the user explores the cosmos.
//  When they enter the galaxy view, the browser serves the
//  files straight from cache instead of hitting the network.
// ============================================================
window.addEventListener("load", () => {
  // Small delay so we don't compete with the cosmos initial load
  setTimeout(prefetchGalaxiaAssets, 1200);
});

function prefetchGalaxiaAssets() {
  if (typeof cosmosData === "undefined") {
    console.warn("prefetch: cosmosData não está definido");
    return;
  }

  cosmosData.forEach((item) => {
    if (!item || !item.media) return; // Skip items with no media attached

    if (item.type === "fotografia") {
      // Full prefetch for images via <link rel="prefetch">
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = item.media;
      link.as = "image";
      link.setAttribute("fetchpriority", "low"); // Low priority — don't steal bandwidth
      document.head.appendChild(link);
    } else if (item.type === "video") {
      // For videos: create a hidden <video preload="metadata">.
      // This makes the browser fetch only the first bytes (enough
      // for the first frame), which is exactly what the galaxy
      // needs to render the thumbnail.
      const v = document.createElement("video");
      v.src = item.media;
      v.preload = "metadata";
      v.muted = true;
      v.style.display = "none";
      document.body.appendChild(v);
    }
  });

  console.log(`prefetch: ${cosmosData.length} assets em fila para a galáxia`);
}

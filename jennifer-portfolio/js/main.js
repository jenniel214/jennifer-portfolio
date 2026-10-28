const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)],
  I = (n) => `<svg class="i"><use href="#${n}"/></svg>`;
// adaptive grid
function grid() {
  const w = innerWidth,
    s = 16 - (16 * (((1920 - w) / 1920) * 100 * 0.6666)) / 100;
  s > 16
    ? (document.documentElement.style.fontSize = s + "px")
    : document.documentElement.style.removeProperty("font-size");
}
grid();
addEventListener("resize", grid);
// scroll
scrollTo(0, 0);
const lenis = new Lenis({ smoothWheel: true });
(function r(t) {
  lenis.raf(t);
  requestAnimationFrame(r);
})(0);
const H = document.documentElement,
  stop = () => {
    lenis.stop();
    H.style.cssText = "position:relative;overflow:hidden;height:100%";
  },
  start = () => {
    lenis.start();
    H.style.cssText = "";
  };
const goto = (id) => {
  const e = document.getElementById(id);
  if (e) lenis.scrollTo(e, { duration: 1.2 });
};
// data
const NAV = [
  ["Home", "home"],
  ["Work", "works"],
  ["Skills", "services"],
  ["About", "about"],
  ["Contact"],
];
const navGo = (l, id) => {
  id ? goto(id) : openM();
};
$("#hn").innerHTML = NAV.map(
  (n) =>
    `<li><button data-n="${n[0]}">${n[0]}${n[0] == "Services" ? ' <span style="font-size:.75rem;opacity:.6">▾</span>' : ""}</button></li>`,
).join("");
$("#nl").innerHTML = NAV.map(
  (n, i) =>
    `<li><button style="--n:${i}" data-n="${n[0]}"><small>0${i + 1}</small><span>${n[0]}</span></button></li>`,
).join("");
$$("[data-n]").forEach(
  (b) =>
    (b.onclick = () => {
      const n = NAV.find((x) => x[0] == b.dataset.n);
      closeN();
      navGo(...n);
    }),
);
$$("[data-go]").forEach((b) => (b.onclick = () => goto(b.dataset.go)));
const P = [
  [
    "AI-Based SQL Generator",
    "AI",
    "Project",
    "Turns plain-English questions into SQL, built on Sentence-BERT, PyTorch Geometric and CodeT5+ with FastAPI.",
    "Python,PyTorch,FastAPI",
  ],
  [
    "Sneha Jyothi",
    "Web",
    "Project",
    "A learning platform designed around clear, accessible navigation.",
    "UI/UX,Frontend",
  ],
  [
    "Qubix Website & UX Review",
    "UX",
    "Internship",
    "A usability review of the Qubix website with redesign recommendations.",
    "UX Research,Review,Design",
  ],
  [
    "Responsive E-commerce",
    "Frontend",
    "Project",
    "A responsive online store with clean layouts across every screen size.",
    "React,Tailwind,Responsive",
  ],
];
$("#cds").innerHTML = P.map(
  (p, i) =>
    `<li class="rv" style="--y:48px;--d:${i * 90}ms"><a class="cd" href="#"><div class="mt"><span>${p[1]} — ${p[2]}</span><span class="bg">${I("ur")}</span></div><div class="wk"><span>${I("lo")}<sup>®</sup></span></div><div class="bt"><h3>${p[0]}</h3><p>${p[3]}</p><div class="tg">${p[4]
      .split(",")
      .map((t) => `<span>${t}</span>`)
      .join("")}</div></div></a></li>`,
).join("");
const S = [
  ["Frontend Development", "React, JavaScript and Tailwind CSS."],
  ["UI/UX Design", "Wireframes, prototypes and usability reviews."],
  ["Data & AI", "Python, SQL, TensorFlow and PyTorch."],
  ["Experience", "CHRIST University IIIC, In2IT Technologies, Qubix."],
];
$("#svl").innerHTML = S.map(
  (s, i) =>
    `<li class="rv" style="--y:24px;--d:${i * 80}ms"><a class="sr" href="#"><span>0${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p><b>${I("ur")}</b></a></li>`,
).join("");
const ST = [
  [3, "", "Internships"],
  [4, "", "Featured projects"],
  [2026, "", "Graduating class"],
  [1, "", "ServiceNow CSA certification"],
];
$("#sg").innerHTML = ST.map(
  (s, i) =>
    `<li class="rv" style="--y:20px;--d:${i * 90}ms"><b data-v="${s[0]}" data-s="${s[1]}">0${s[1]}</b><span>${s[2]}</span></li>`,
).join("");
const C = [
  ["Explore", ["About", "Projects", "Skills", "Contact"]],
  ["Focus", ["UI/UX", "Frontend", "Data", "AI"]],
  ["Elsewhere", ["GitHub", "LinkedIn"]],
];
const U = {
  GitHub: "https://github.com/jenniel214",
  LinkedIn: "https://linkedin.com/in/jennifer-jaison-baab79229",
};
$(".cl").insertAdjacentHTML(
  "beforeend",
  C.map(
    (c) =>
      `<div><h6>${c[0]}</h6><ul>${c[1].map((l) => `<li><a class="al" href="${U[l] || "#" + l.toLowerCase()}">${l}</a></li>`).join("")}</ul></div>`,
  ).join(""),
);
// about word reveal
const stmt = $("#stmt");
let wi = 0;
stmt.innerHTML = [...stmt.childNodes]
  .map((n) => {
    const em = n.nodeType == 1,
      t = n.textContent
        .trim()
        .split(/\s+/)
        .map((w) => `<span class="w" style="--d:${wi++ * 35}ms">${w}</span>`)
        .join(" ");
    return em ? `<em>${t}</em> ` : t + " ";
  })
  .join("");
// clock
const MO = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function clock() {
  const d = new Date(),
    h = d.getHours(),
    t = `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}${h < 12 ? "am" : "pm"}`;
  $("#tm").textContent = t;
  $("#tm2").textContent = t;
  $("#dt").textContent = `${d.getDate()} ${MO[d.getMonth()]}, ${d.getFullYear()}`;
}
clock();
setInterval(clock, 1000);
// reveal
let ready;
const rp = new Promise((r) => (ready = r));
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const go = () => e.target.classList.add("in");
      e.target.closest("#home,header") ? rp.then(go) : go();
    }),
  { threshold: 0.15 },
);
$$(".rv,.lr,#stmt").forEach((e) => io.observe(e));
// loader
stop();
const cn = $("#cn"),
  fl = $("#fl"),
  t0 = performance.now(),
  ease = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
(function f(now) {
  const t = Math.min((now - t0) / 1300, 1),
    p = Math.round(ease(t) * 100);
  cn.textContent = String(p).padStart(3, "0");
  fl.style.width = p + "%";
  if (t < 1) requestAnimationFrame(f);
  else {
    $("#ld").classList.add("out");
    setTimeout(() => {
      $("#ld").remove();
      start();
      ready();
    }, 750);
  }
})(t0);
// carousel
const CI = [
  ["UI/UX design", "Interfaces with intent."],
  ["Frontend", "Built in React."],
  ["AI & data", "Models that ship."],
];
let ci = 0;
$("#slot").innerHTML = CI.map(
  (c, i) => `<div class="${i ? "" : "on"}"><small>${c[0]}</small><p>${c[1]}</p></div>`,
).join("");
$("#dots").innerHTML = CI.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("");
function step(s) {
  const sl = $$("#slot div"),
    d = $$("#dots i");
  sl[ci].className = "off";
  sl[ci].style.transform = `translateY(${s > 0 ? -14 : 14}px)`;
  d[ci].className = "";
  ci = (ci + s + 3) % 3;
  sl[ci].style.transform = `translateY(${s > 0 ? 14 : -14}px)`;
  sl[ci].className = "";
  void sl[ci].offsetWidth;
  sl[ci].style.transform = "";
  sl[ci].className = "on";
  d[ci].className = "on";
}
$("#hcard").onclick = () => step(1);
$("#nx").onclick = (e) => {
  e.stopPropagation();
  step(1);
};
$("#pv").onclick = (e) => {
  e.stopPropagation();
  step(-1);
};
// stats count
{
  const g = $("#sg"),
    bs = $$("#sg b"),
    red = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (red) {
    bs.forEach((b) => (b.textContent = b.dataset.v + b.dataset.s));
    g.classList.add("go");
  } else {
    const run = () => {
      g.classList.add("go");
      bs.forEach((b, i) => {
        const v = +b.dataset.v,
          s = b.dataset.s,
          D = 1800,
          t0 = performance.now() + i * 120;
        (function f(n) {
          const t = Math.min(Math.max((n - t0) / D, 0), 1),
            e = 1 - Math.pow(1 - t, 4);
          b.textContent = Math.round(e * v) + s;
          if (t < 1) requestAnimationFrame(f);
        })(performance.now());
      });
    };
    new IntersectionObserver(
      (es, o) => {
        if (es[0].isIntersecting) {
          o.disconnect();
          run();
        }
      },
      { threshold: 0.25 },
    ).observe(g);
  }
}
// nav + modal
let nOpen = false,
  mOpen = false;
function openN() {
  nOpen = true;
  $("#nv").classList.add("on");
  stop();
}
function closeN() {
  if (!nOpen) return;
  nOpen = false;
  $("#nv").classList.remove("on");
  if (!mOpen) start();
}
function openM() {
  mOpen = true;
  $("#md").classList.add("on");
  stop();
}
function closeM() {
  mOpen = false;
  $("#md").classList.remove("on");
  start();
  setTimeout(() => {
    $("#md").classList.remove("sent");
    $("#fm").reset();
    $("#sb").firstChild.textContent = "Send request";
  }, 300);
}
$("#mo").onclick = openN;
$("#nc").onclick = closeN;
$("#ns").onclick = () => {
  closeN();
  openM();
};
$$("[data-modal]").forEach((b) => (b.onclick = openM));
$("#mx").onclick = closeM;
$("#ck").onclick = closeM;
$("#md").onclick = closeM;
$(".pnl").onclick = (e) => e.stopPropagation();
addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    mOpen ? closeM() : closeN();
  }
});
$("#md").classList.remove("sent");
$("#fm").onsubmit = (e) => {
  e.preventDefault();
  $("#sb").firstChild.textContent = "Sending…";
  setTimeout(() => $("#md").classList.add("sent"), 700);
};
// liquid reveal
if (false) {
  const box = $("#lq"),
    cv = $("#cv"),
    x = cv.getContext("2d"),
    cover = document.createElement("canvas"),
    br = document.createElement("canvas"),
    bx = br.getContext("2d");
  const BR = 85,
    DEC = 0.03;
  let dpr,
    W,
    H2,
    R,
    pts = [],
    last = null,
    idle = 0,
    run = false,
    rc;
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    rc = box.getBoundingClientRect();
    W = cv.width = Math.round(rc.width * dpr);
    H2 = cv.height = Math.round(rc.height * dpr);
    R = BR * dpr;
    br.width = br.height = Math.ceil(R * 2);
    cover.width = W;
    cover.height = H2;
    const c = cover.getContext("2d"),
      g = c.createLinearGradient(0, 0, W, H2);
    g.addColorStop(0, "#b79cff");
    g.addColorStop(0.5, "#e4d6ff");
    g.addColorStop(1, "#8f63d8");
    c.fillStyle = g;
    c.fillRect(0, 0, W, H2);
    [
      [0.2, 0.3, 0.35, "#ffffff"],
      [0.8, 0.7, 0.4, "#a97cf0"],
      [0.55, 0.2, 0.25, "#e9deff"],
    ].forEach(([a, b, r, col]) => {
      const rg = c.createRadialGradient(W * a, H2 * b, 0, W * a, H2 * b, Math.max(W, H2) * r);
      rg.addColorStop(0, col + "cc");
      rg.addColorStop(1, col + "00");
      c.fillStyle = rg;
      c.fillRect(0, 0, W, H2);
    });
  }
  size();
  new ResizeObserver(size).observe(box);
  function stamp(px, py) {
    const d = br.width,
      c = d / 2;
    bx.globalCompositeOperation = "source-over";
    bx.clearRect(0, 0, d, d);
    const g = bx.createRadialGradient(c, c, 0, c, c, c);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.55, "rgba(255,255,255,.82)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    bx.fillStyle = g;
    bx.fillRect(0, 0, d, d);
    bx.globalCompositeOperation = "source-in";
    bx.drawImage(cover, px - c, py - c, d, d, 0, 0, d, d);
    x.globalCompositeOperation = "source-over";
    x.globalAlpha = 0.6;
    x.drawImage(br, px - c, py - c);
    x.globalAlpha = 1;
  }
  function tick() {
    const dr = pts.length > 0;
    if (dr) idle = 0;
    else if (++idle > 120) {
      run = false;
      return;
    }
    const fade = dr ? DEC : Math.min(DEC + idle * 0.004, 0.5);
    x.globalCompositeOperation = "destination-out";
    x.fillStyle = `rgba(0,0,0,${fade})`;
    x.fillRect(0, 0, W, H2);
    if (dr) {
      pts.forEach((p) => stamp(p[0], p[1]));
      pts = [];
    }
    if (idle >= 120) x.clearRect(0, 0, W, H2);
    requestAnimationFrame(tick);
  }
  addEventListener("pointermove", (e) => {
    rc = box.getBoundingClientRect();
    const px = (e.clientX - rc.left) * dpr,
      py = (e.clientY - rc.top) * dpr;
    if (px < -R || py < -R || px > W + R || py > H2 + R) {
      last = null;
      return;
    }
    if (last) {
      const dx = px - last[0],
        dy = py - last[1],
        d = Math.hypot(dx, dy),
        n = Math.min(Math.ceil(d / Math.max(R * 0.3, 1)), 60);
      for (let i = 1; i <= n; i++) pts.push([last[0] + (dx * i) / n, last[1] + (dy * i) / n]);
    } else pts.push([px, py]);
    last = [px, py];
    if (!run) {
      run = true;
      idle = 0;
      requestAnimationFrame(tick);
    }
  });
}

// scroll-driven motion
document.body.insertAdjacentHTML("beforeend", '<div id="sp"></div><div id="cg"></div>');
{
  const sp = $("#sp"),
    cg = $("#cg"),
    hg = $(".hg"),
    wm = $("#wm"),
    gi = $(".gl>.i"),
    cards = $$("#cds>li");
  addEventListener(
    "pointermove",
    (e) => {
      cg.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    },
    { passive: true },
  );
  $$(".pb,.mb,.so a").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.25}px ${(e.clientY - r.top - r.height / 2) * 0.35}px`;
    });
    b.addEventListener("pointerleave", () => (b.style.translate = ""));
  });
  cards.forEach((c, i) => {
    c.style.setProperty("--i", i);
    c.style.transformOrigin = "top center";
  });
  lenis.on("scroll", ({ scroll, velocity }) => {
    sp.style.transform = `scaleX(${scroll / Math.max(1, H.scrollHeight - innerHeight)})`;
    const p = Math.min(scroll / innerHeight, 1);
    hg.style.opacity = 1 - p * 0.9;
    hg.style.translate = `0 ${p * -60}px`;
    hg.style.scale = 1 - p * 0.05;
    wm.style.translate = `0 ${scroll * 0.2}px`;
    if (gi) gi.style.translate = `0 ${(scroll - innerHeight) * 0.08}px`;
    cards.forEach((c, i) => {
      const n = cards[i + 1];
      if (!n) return;
      const q = Math.max(
        0,
        Math.min(1, 1 - (n.getBoundingClientRect().top - innerHeight * 0.1) / (innerHeight * 0.6)),
      );
      c.style.scale = 1 - 0.06 * q;
      c.style.filter = `brightness(${1 - 0.35 * q})`;
    });
    const rate = 1 + Math.min(Math.abs(velocity) * 0.6, 6);
    document.getAnimations().forEach((a) => {
      if (a.animationName === "mq") a.playbackRate = rate;
    });
  });
}

// motion pack: scroll-velocity marquees, stacking cards, parallax, progress, magnetic buttons
{
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches,
    fine = matchMedia("(pointer:fine)").matches;
  const mqs = [],
    bar = $("#sp2"),
    lis = $$("#cds li"),
    pc = $("#pc"),
    wm = $("#wm"),
    hl = $(".hl"),
    hr = $(".hr"),
    gb = $(".gl>.i");
  lis.forEach((li, i) => li.style.setProperty("--i", i));
  (function loop() {
    const v = Math.min(Math.abs(lenis.velocity || 0), 40),
      sc = scrollY;
    mqs.forEach((m) => {
      const half = m.el.scrollWidth / 2;
      m.x += m.dir * (reduce ? 0 : 0.6 + v * 0.35);
      if (m.x <= -half) m.x += half;
      if (m.x > 0) m.x -= half;
      m.el.style.transform = `translate3d(${m.x}px,0,0)`;
    });
    bar.style.transform = `scaleX(${Math.min(1, sc / Math.max(1, document.documentElement.scrollHeight - innerHeight))})`;
    if (!reduce && sc < innerHeight * 1.5) {
      wm.style.translate = `0 ${sc * 0.18}px`;
      hl.style.translate = `0 ${sc * -0.06}px`;
      hr.style.translate = `0 ${sc * 0.04}px`;
    }
    if (!reduce && gb) {
      const r = gb.getBoundingClientRect();
      gb.style.translate = `0 ${(r.top - innerHeight / 2) * -0.08}px`;
    }
    lis.forEach((li, i) => {
      const n = lis[i + 1];
      if (!n) return;
      const p = Math.max(
          0,
          Math.min(
            1,
            1 -
              (n.getBoundingClientRect().top - li.getBoundingClientRect().top - 16) /
                li.offsetHeight,
          ),
        ),
        c = li.firstElementChild;
      c.style.scale = 1 - p * 0.07;
      c.style.filter = `brightness(${1 - p * 0.45})`;
    });
    const k = Math.max(
      1,
      lis.filter((li) => li.getBoundingClientRect().top <= innerHeight * 0.45).length,
    );
    pc.textContent = `0${k} / 0${lis.length}`;
    requestAnimationFrame(loop);
  })();
  if (fine && !reduce)
    $$(".pb,.mb").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.25}px ${(e.clientY - r.top - r.height / 2) * 0.35}px`;
      });
      b.addEventListener("pointerleave", () => (b.style.translate = ""));
    });
}

{
  const T = (t) =>
    `<text x="12" y="16.5" text-anchor="middle" font-size="11" font-weight="800" font-family="Onest,sans-serif" fill="#fff">${t}</text>`;
  const IC = {
    "React.js":
      '<g fill="none" stroke="#61dafb" stroke-width="1.1" transform="translate(12 12)"><ellipse rx="10" ry="4"/><ellipse rx="10" ry="4" transform="rotate(60)"/><ellipse rx="10" ry="4" transform="rotate(120)"/></g><circle cx="12" cy="12" r="1.8" fill="#61dafb"/>',
    JavaScript:
      '<rect x="2" y="2" width="20" height="20" rx="2" fill="#f7df1e"/><text x="12" y="18" text-anchor="middle" font-size="10" font-weight="800" font-family="Onest,sans-serif" fill="#111">JS</text>',
    HTML: '<path d="M3 2h18l-1.6 17L12 22l-7.4-3z" fill="#e44d26"/>' + T("5"),
    CSS: '<path d="M3 2h18l-1.6 17L12 22l-7.4-3z" fill="#1572b6"/>' + T("3"),
    "Tailwind CSS":
      '<path fill="#38bdf8" d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z"/>',
    Python:
      '<rect x="3" y="2.5" width="12" height="12" rx="4.5" fill="#3776ab"/><rect x="9" y="9.5" width="12" height="12" rx="4.5" fill="#ffd43b"/><circle cx="7.5" cy="6" r="1" fill="#fff"/><circle cx="16.5" cy="18" r="1" fill="#3776ab"/>',
    SQL: '<g fill="none" stroke="#c4a8ff" stroke-width="1.6"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></g>',
    Flask:
      '<path d="M9.5 3h5M10.5 3v6l-5 9a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3l-5-9V3M8 15h8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>',
    MongoDB:
      '<path d="M12 2c3 3.5 5 6.5 5 10a5 5 0 0 1-3.4 4.7L12 22l-1.6-5.3A5 5 0 0 1 7 12c0-3.5 2-6.5 5-10z" fill="#47a248"/>',
    "Node.js":
      '<path d="M12 2l9 5v10l-9 5-9-5V7z" fill="#5fa04e"/><path d="M12 7v10M8.5 9v6" stroke="#0b0910" stroke-width="1.4"/>',
    TensorFlow: '<rect x="2" y="2" width="20" height="20" rx="4" fill="#ff6f00"/>' + T("TF"),
    "scikit-learn":
      '<circle cx="9" cy="12" r="7" fill="#f89939"/><circle cx="15" cy="12" r="7" fill="#29abe2" fill-opacity=".85"/>',
    PyTorch:
      '<circle cx="11.5" cy="14" r="6.5" fill="none" stroke="#ee4c2c" stroke-width="2.6"/><circle cx="16.5" cy="5" r="1.9" fill="#ee4c2c"/>',
    Figma:
      '<path d="M8 2h4v6H8a3 3 0 0 1 0-6z" fill="#f24e1e"/><path d="M12 2h4a3 3 0 0 1 0 6h-4z" fill="#ff7262"/><path d="M8 8h4v6H8a3 3 0 0 1 0-6z" fill="#a259ff"/><circle cx="15" cy="11" r="3" fill="#1abcfe"/><path d="M8 14h4v3a3 3 0 1 1-4-2.8z" fill="#0acf83"/>',
    "Power BI":
      '<rect x="4" y="11" width="4.5" height="10" rx="1" fill="#f2c811"/><rect x="10" y="6" width="4.5" height="15" rx="1" fill="#e8a802"/><rect x="16" y="2" width="4.5" height="19" rx="1" fill="#f2c811"/>',
    Blender:
      '<circle cx="12" cy="13" r="7" fill="none" stroke="#ea7600" stroke-width="2.6"/><circle cx="12" cy="13" r="2.6" fill="#5b9bd5"/><path d="M3 9l7-3" stroke="#ea7600" stroke-width="2.6" stroke-linecap="round"/>',
    Unity:
      '<path d="M12 2l9 5v10l-9 5-9-5V7z" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 12L3 7M12 12l9-5M12 12v10" stroke="#fff" stroke-width="1.4"/>',
    WordPress:
      '<circle cx="12" cy="12" r="9.5" fill="none" stroke="#5aa7d1" stroke-width="1.8"/><text x="12" y="16.5" text-anchor="middle" font-size="12" font-weight="700" font-family="Georgia,serif" fill="#5aa7d1">W</text>',
  };
  const card = (n, i, h) => {
    const sg = i % 2 ? -1 : 1;
    return `<div class="cd3" style="--o:${[0, 1, 0.4, 1.2, 0.2][i % 5]}rem;--b:${sg * (0.5 + ((i * 3) % 4) * 0.2)}rem;--bd:${4 + ((i * 5) % 4)}s;--bl:-${((i * 1.7) % 6).toFixed(1)}s"${h ? ' aria-hidden="true"' : ""}><div class="in3" style="--r:${sg * (2.5 + ((i * 7) % 3))}deg"><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg></span><span>${n}</span></div></div>`;
  };
  const fill = (id, L) => {
    $(id).innerHTML =
      L.map((n, i) => card(n, i, 0)).join("") + L.map((n, i) => card(n, i, 1)).join("");
  };
  fill("#t1", [
    "React.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Python",
    "SQL",
    "Flask",
    "MongoDB",
  ]);
  fill("#t2", [
    "Node.js",
    "TensorFlow",
    "scikit-learn",
    "PyTorch",
    "Figma",
    "Power BI",
    "Blender",
    "Unity",
    "WordPress",
  ]);
}

{
  const w = $$("#rot b");
  let k = 0;
  const nx = () => {
    const o = w[k];
    o.classList.remove("on");
    o.classList.add("out");
    setTimeout(() => o.classList.remove("out"), 550);
    k = (k + 1) % w.length;
    w[k].classList.add("on");
  };
  w[0].classList.add("on");
  rp.then(() => setTimeout(() => setInterval(nx, 2000), 1500));
}

{
  const hm = $("#home"),
    sp = $("#sparks"),
    C = ["#c4a8ff", "#E76AB5", "#ffffff", "#B794FF"];
  let lx = -99,
    ly = -99;
  if (false)
    hm.addEventListener("pointermove", (e) => {
      const r = hm.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top;
      if (Math.hypot(x - lx, y - ly) < 26) return;
      lx = x;
      ly = y;
      for (let i = 0; i < 2; i++) {
        if (sp.childElementCount > 36) break;
        const d = document.createElement("span");
        d.className = "sp";
        const sz = (0.55 + Math.random() * 0.8).toFixed(2);
        d.style.cssText = `--x:${x + (Math.random() - 0.5) * 28}px;--y:${y + (Math.random() - 0.5) * 28}px;--s:${sz}rem;--c:${C[(Math.random() * C.length) | 0]};--t:${(0.9 + Math.random() * 0.6).toFixed(2)}s;--dx:${(Math.random() - 0.5) * 50}px;--dy:${20 + Math.random() * 40}px`;
        d.innerHTML = '<svg viewBox="0 0 48 48"><use href="#lo"/></svg>';
        d.onanimationend = () => d.remove();
        sp.appendChild(d);
      }
    });
}

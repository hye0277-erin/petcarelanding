/* GSAP이 로드되지 않았으면(오프라인/CDN 차단) 모든 콘텐츠를 그대로 보여주고 종료 */
if (typeof gsap === "undefined") {
  console.warn("GSAP 미로드 — 애니메이션 없이 콘텐츠를 표시합니다.");
} else {
gsap.registerPlugin(ScrollTrigger);

const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40));

/* ---- HERO intro ---- */
gsap.timeline({ defaults: { ease: "power3.out" } })
  .from(".hero__copy .reveal", { y: 36, opacity: 0, duration: 0.9, stagger: 0.12 })
  .from(".hero__photo", { y: 50, opacity: 0, scale: 0.96, duration: 1 }, "-=0.7")
  .from(".fcard", { y: 24, opacity: 0, scale: 0.85, duration: 0.6, stagger: 0.14, ease: "back.out(1.7)" }, "-=0.5");

/* 둥둥 떠다니는 카드 (각자 다른 속도) */
gsap.to(".fc1", { y: -12, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".fc2", { y: 14, duration: 3.0, repeat: -1, yoyo: true, ease: "sine.inOut" });
gsap.to(".fc3", { y: -10, duration: 2.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
gsap.to(".fc4", { y: 12, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });

/* ---- soft scroll reveals ---- */
gsap.utils.toArray(".reveal").forEach((el) => {
  if (el.closest(".hero")) return;
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 88%" },
    y: 38, opacity: 0, duration: 0.9, ease: "power2.out",
  });
});

/* empathy 말풍선 — 회전은 CSS에 맡기고 opacity/y만 건드림 */
gsap.fromTo(".q-rev",
  { y: -130, opacity: 0, scale: 0.88 },
  { y: 0, opacity: 1, scale: 1, duration: 0.78, stagger: 0.12, ease: "bounce.out",
    scrollTrigger: { trigger: ".bubbles", start: "top 82%" } }
);

/* feature phones slide in */
gsap.utils.toArray(".r-phone").forEach((el) => {
  const rev = el.closest(".feat--rev");
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    x: rev ? -50 : 50, opacity: 0, duration: 1, ease: "power3.out",
  });
});

/* chips */
gsap.from(".chips li", {
  scrollTrigger: { trigger: ".chips", start: "top 90%" },
  y: 16, opacity: 0, duration: 0.45, stagger: 0.06, ease: "power2.out",
});

/* target cards — fromTo로 끝값을 고정해 투명하게 멈추지 않도록 */
gsap.fromTo(".t-card",
  { y: 40, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
    scrollTrigger: { trigger: ".target__grid", start: "top 90%" } }
);

/* 사진 배너 1: 배경 위치 패럴랙스 (배너2는 CSS background-attachment:fixed로 처리) */
gsap.utils.toArray(".photoband:not(.photoband--fixed)").forEach((band) => {
  gsap.fromTo(band, { backgroundPositionY: "20%" }, {
    backgroundPositionY: "70%", ease: "none",
    scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true },
  });
});

/* closing bg parallax */
gsap.fromTo(".closing__bg",
  { scale: 1.18, yPercent: -6 },
  { yPercent: 6, ease: "none",
    scrollTrigger: { trigger: ".closing", start: "top bottom", end: "bottom top", scrub: true } }
);

/* 레이아웃 변동(이미지 로드 등) 후 트리거 재계산 — 섹션이 안 나타나는 문제 방지 */
window.addEventListener("load", () => ScrollTrigger.refresh());

} /* end GSAP guard */

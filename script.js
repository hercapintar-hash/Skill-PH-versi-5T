/* =========================
   GLOBAL VAR
========================= */
let deadline;

/* =========================
   COUNTDOWN RESET HARIAN
========================= */
function getTodayDeadline() {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23, 59, 59
  ).getTime();
}

deadline = getTodayDeadline();

setInterval(() => {
  const now = new Date().getTime();
  let distance = deadline - now;

  if (distance <= 0) {
    deadline = getTodayDeadline();
    distance = deadline - now;
  }

  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}, 1000);

/* =========================
   STICKY CTA
========================= */
const stickyCTA = document.getElementById("stickyCTA");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    stickyCTA.classList.add("show");
  } else {
    stickyCTA.classList.remove("show");
  }
});

/* =========================
   CTA MODE DARURAT (<10 MENIT)
========================= */
const ctas = document.querySelectorAll(".cta, .sticky-cta a");

setInterval(() => {
  const now = new Date().getTime();
  const distance = deadline - now;

  if (distance < 600000) {
    ctas.forEach(btn => {
      btn.style.background = "#ff0000";
      btn.innerText = "AMBIL SEKARANG";
    });
  }
}, 1000);

/* =========================
   TRUST POPUP (1x PER USER)
========================= */
if (!localStorage.getItem("trustShown")) {
  setTimeout(() => {
    document.getElementById("trustPopup").style.display = "block";
    localStorage.setItem("trustShown", "yes");
  }, 8000);
}
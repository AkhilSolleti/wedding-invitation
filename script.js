/* ==========================================================
   TRADITIONAL HINDU WEDDING INVITATION SCRIPT

   IMPORTANT:
   Change COUNTDOWN_DATE below.
   Format: YYYY-MM-DDTHH:MM:SS

   Example:
   const COUNTDOWN_DATE = "2027-02-14T10:30:00";
   ========================================================== */

const COUNTDOWN_DATE = "2026-11-15T10:00:00";

/* ---------- Opening ---------- */

const preloader = document.getElementById("preloader");
const enterButton = document.getElementById("enterInvitation");
const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");

document.body.classList.add("locked");

enterButton.addEventListener("click", async () => {
  preloader.classList.add("hidden");
  document.body.classList.remove("locked");

  createPetals(18);
  await startMusic();
});

async function startMusic() {
  try {
    music.volume = 0;
    await music.play();

    document.body.classList.add("music-playing");

    let volume = 0;
    const fade = setInterval(() => {
      volume += 0.025;
      music.volume = Math.min(volume, 0.25);

      if (volume >= 0.55) clearInterval(fade);
    }, 80);
  } catch (error) {
    // Browser may require a user gesture. The opening button is already a gesture,
    // but some browsers still block audio.
    console.log("Music could not start automatically.");
  }
}

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      document.body.classList.add("music-playing");
    } catch {
      console.log("Music playback was blocked.");
    }
  } else {
    music.pause();
    document.body.classList.remove("music-playing");
  }
});

/* ---------- Countdown ---------- */

function updateCountdown() {
  const target = new Date(COUNTDOWN_DATE).getTime();
  const now = Date.now();
  const distance = target - now;

  const ids = ["days", "hours", "minutes", "seconds"];

  if (distance <= 0) {
    ids.forEach(id => document.getElementById(id).textContent = "00");
    document.getElementById("countdownMessage").textContent =
      "The auspicious day has arrived. Let the celebrations begin! 🪔";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ---------- Scroll reveal ---------- */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ---------- Parallax ---------- */

const parallaxImages = document.querySelectorAll(".parallax-image");
const heroBackground = document.querySelector(".hero-bg");

function updateParallax() {
  const scrollY = window.scrollY;

  if (heroBackground) {
    heroBackground.style.transform =
      `scale(1.08) translateY(${scrollY * 0.16}px)`;
  }

  parallaxImages.forEach(img => {
    const rect = img.getBoundingClientRect();
    const offset = (window.innerHeight / 2 - rect.top) * 0.035;
    img.style.transform = `translateY(${offset}px) scale(1.04)`;
  });
}

window.addEventListener("scroll", updateParallax, { passive: true });
updateParallax();

/* ---------- Falling petals ---------- */

function createPetals(count = 12) {
  const layer = document.getElementById("petalLayer");

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";

    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${5 + Math.random() * 7}s`;
    petal.style.animationDelay = `${Math.random() * 4}s`;
    petal.style.opacity = `${0.35 + Math.random() * 0.4}`;
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;

    layer.appendChild(petal);

    setTimeout(() => petal.remove(), 13000);
  }
}

setInterval(() => createPetals(3), 2600);

/* ---------- Calendar ---------- */

document.getElementById("calendarButton").addEventListener("click", () => {
  const start = new Date(COUNTDOWN_DATE);

  // Placeholder event duration: 3 hours.
  // Change this if needed.
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);

  const format = date =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

  const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
BEGIN:VEVENT
UID:wedding-invitation@example.com
DTSTAMP:${format(new Date())}
DTSTART:${format(start)}
DTEND:${format(end)}
SUMMARY:[GROOM_NAME] & [BRIDE_NAME] Wedding
LOCATION:[MAIN_VENUE_NAME], [MAIN_VENUE_ADDRESS]
DESCRIPTION:[RSVP_MESSAGE]
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "wedding-invitation.ics";
  link.click();

  URL.revokeObjectURL(url);
});

/* ---------- Copy venue address ---------- */

const copyAddressButton = document.getElementById("copyAddress");

copyAddressButton.addEventListener("click", async () => {
  const address = document.getElementById("venueAddress").value;

  try {
    await navigator.clipboard.writeText(address);
    copyAddressButton.textContent = "✓ Address Copied";
    setTimeout(() => {
      copyAddressButton.textContent = "Copy Address";
    }, 1800);
  } catch {
    alert("Please copy the address manually: " + address);
  }
});

/* ---------- Animated mandala ---------- */

const canvas = document.getElementById("mandalaCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let rotation = 0;

function drawMandala() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) * 0.32;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  ctx.strokeStyle = "rgba(229,198,109,.55)";
  ctx.lineWidth = 1;

  for (let ring = 0; ring < 4; ring++) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * (0.45 + ring * 0.17), 0, Math.PI * 2);
    ctx.stroke();
  }

  for (let i = 0; i < 32; i++) {
    ctx.rotate(Math.PI * 2 / 32);

    ctx.beginPath();
    ctx.ellipse(0, radius * 0.55, 10 + ringSize(i), 45, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, radius * .05);
    ctx.lineTo(0, radius);
    ctx.stroke();
  }

  ctx.restore();

  rotation += 0.0008;
  requestAnimationFrame(drawMandala);
}

function ringSize(i) {
  return 5 + (i % 4) * 2;
}

drawMandala();

/* ---------- Language hook ---------- */

document.getElementById("languageToggle").addEventListener("click", () => {
  const teluguSection = document.getElementById("telugu");
  teluguSection.scrollIntoView({ behavior: "smooth" });
});

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const dates = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

// Create rings dynamically
function createRing(ringId, items, radius) {
  const ring = document.getElementById(ringId);
  const count = items.length;
  items.forEach((item, index) => {
    const label = document.createElement("div");
    label.className = "label";
    label.innerText = item;
    const angle = (360 / count) * index;
    const rad = (angle - 90) * Math.PI / 180;
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);
    label.style.left = `calc(50% + ${x}px)`;
    label.style.top = `calc(50% + ${y}px)`;
    label.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    ring.appendChild(label);
  });
}

createRing("date-ring", dates, 200);
createRing("month-ring", months, 150);
createRing("day-ring", days, 100);

// Animate hands and highlight active values
function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  document.querySelector(".hour-hand").style.transform = `rotate(${(hour % 12) * 30 + minute / 2}deg)`;
  document.querySelector(".minute-hand").style.transform = `rotate(${minute * 6}deg)`;
  document.querySelector(".second-hand").style.transform = `rotate(${second * 6}deg)`;

  // Highlight active date, month, day
  highlightActive("date-ring", now.getDate() - 1);
  highlightActive("month-ring", now.getMonth());
  highlightActive("day-ring", now.getDay());

  // Update digital clock
  document.getElementById("digital-clock").innerText = now.toLocaleTimeString();
}

function highlightActive(ringId, activeIndex) {
  const labels = document.getElementById(ringId).querySelectorAll(".label");
  labels.forEach((label, index) => {
    label.classList.toggle("active", index === activeIndex);
  });
}

setInterval(updateClock, 1000);
updateClock();

// Theme changer
const themeBtn = document.getElementById("theme-btn");
const palette = document.getElementById("color-palette");
const colorOptions = document.querySelectorAll(".color-option");

themeBtn.addEventListener("click", () => {
  palette.style.display = palette.style.display === "flex" ? "none" : "flex";
});

colorOptions.forEach(option => {
  option.addEventListener("click", () => {
    const color = option.getAttribute("data-color");

    // Apply color to rings
    document.querySelectorAll(".ring").forEach(ring => {
      ring.style.border = `2px solid ${color}`;
      ring.style.boxShadow = `0 0 15px ${color}`;
    });

    // Center clock glow
    document.querySelector(".center-clock").style.boxShadow = `0 0 25px ${color}, 0 0 50px ${color}`;

    // Hands
    document.querySelector(".hour-hand").style.background = color;
    document.querySelector(".minute-hand").style.background = color;

    // Digital clock
    const digitalClock = document.getElementById("digital-clock");
    digitalClock.style.color = color;
    digitalClock.style.textShadow = `0 0 15px ${color}, 0 0 25px ${color}`;

    // Theme button color
    themeBtn.style.color = color;
    themeBtn.style.boxShadow = `0 0 15px ${color}`;
  });
});

const startBtn = document.getElementById("startBtn");
const nitroBtn = document.getElementById("nitroBtn");
const stopBtn = document.getElementById("stopBtn");

const car = document.getElementById("car");
const nitroFlame = document.getElementById("nitroFlame");
const track = document.querySelector(".track");

const speedEl = document.getElementById("speed");
const checkpointEl = document.getElementById("checkpoint");

const popupOverlay = document.getElementById("popupOverlay");
const loveLetterText = document.getElementById("loveLetterText");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const yayText = document.getElementById("yayText");
const finalMsg = document.getElementById("finalMsg");

let carX = 15;
let carY = 40;
let speed = 0;
let raceInterval = null;
let checkpointsHit = 0;
let finished = false;

const loveLetter =
`Hie mie love, i know that its been a rough couple of months for us but i hope u know ill choose u everytime through everything. thank you for bearing me and my acts lately and being so forgiving. u are the best person and husband anyone can ever have their in life and i am so glad and proud that i get to be ur wife. i love and adore every single about u, ur eyes and the way they light up, ur hair and how they smell and look, ur cute nose, ur pretty asf lips and how they feel and they taste, ur smooth skin and cheeks and literally everything about ur body and how ure so fine and hot, ur gorgeous voice and how u call out to me and talk to me and look at me and kiss me and hug me i love uuuuuuuuuu so fucking much and i miss u and i wish i could cuddle u 24/7 and just be w u and go w u everywhere and man ure so fucking intelligent and smart and so cutie pattotie i just wanna squish u. im just so grateful to have u and how u do so much for me without saying anything and how hardworking u are im so proud of u everyday.
so mie annu kuchu puchu, will u make a stupid decision by staying w my idiot ass forever and ever? 🥺🥺`;

function updateHUD() {
  speedEl.textContent = Math.floor(speed * 18);
  checkpointEl.textContent = checkpointsHit;
}

function moveCar() {
  carX += speed;

  if (carX > track.offsetWidth - 140) {
    finishRace();
    return;
  }

  // slight up-down movement like real driving
  carY = 40 + Math.sin(carX / 40) * 15;
  car.style.left = carX + "px";
  car.style.bottom = carY + "px";

  // nitro flame follows car
  nitroFlame.style.left = (carX - 10) + "px";
  nitroFlame.style.bottom = (carY + 15) + "px";

  checkCheckpoints();
  updateHUD();
}

function startRace() {
  if (raceInterval) return;

  speed = 2;
  finished = false;
  checkpointsHit = 0;
  updateHUD();

  raceInterval = setInterval(moveCar, 30);
}

function stopRace() {
  clearInterval(raceInterval);
  raceInterval = null;
  speed = 0;
  nitroFlame.style.opacity = 0;
  updateHUD();
}

function nitroBoost() {
  if (!raceInterval || finished) return;

  speed += 2.5;
  nitroFlame.style.opacity = 1;

  setTimeout(() => {
    speed = Math.max(2, speed - 2.2);
    nitroFlame.style.opacity = 0;
  }, 800);
}

function checkCheckpoints() {
  const percent = carX / track.offsetWidth;

  if (percent > 0.18 && checkpointsHit === 0) triggerCheckpoint();
  if (percent > 0.35 && checkpointsHit === 1) triggerCheckpoint();
  if (percent > 0.52 && checkpointsHit === 2) triggerCheckpoint();
  if (percent > 0.68 && checkpointsHit === 3) triggerCheckpoint();
  if (percent > 0.82 && checkpointsHit === 4) triggerCheckpoint();
}

function triggerCheckpoint() {
  checkpointsHit++;
  flowerRain();
  fireworksBurst();
}

function flowerRain() {
  const flowers = ["🌸", "🌹", "💐", "🌷", "🌺", "🌻", "💘"];

  for (let i = 0; i < 20; i++) {
    const f = document.createElement("div");
    f.classList.add("flower");
    f.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    f.style.left = Math.random() * 90 + "%";
    f.style.animationDuration = (1.8 + Math.random() * 1.2) + "s";
    track.appendChild(f);

    setTimeout(() => f.remove(), 2500);
  }
}

function fireworksBurst() {
  for (let i = 0; i < 5; i++) {
    const fw = document.createElement("div");
    fw.classList.add("firework");
    fw.style.left = (60 + Math.random() * 35) + "%";
    fw.style.top = (10 + Math.random() * 60) + "%";
    fw.style.background = ["gold", "hotpink", "cyan", "lime"][Math.floor(Math.random() * 4)];
    track.appendChild(fw);

    setTimeout(() => fw.remove(), 1000);
  }
}

function finishRace() {
  if (finished) return;
  finished = true;

  clearInterval(raceInterval);
  raceInterval = null;

  // slow motion overlay
  const overlay = document.createElement("div");
  overlay.classList.add("slowmoOverlay");
  document.body.appendChild(overlay);

  // final fireworks
  for (let i = 0; i < 10; i++) {
    setTimeout(() => fireworksBurst(), i * 150);
  }

  setTimeout(() => {
    overlay.remove();
    showLovePopup();
  }, 2200);
}

function showLovePopup() {
  popupOverlay.classList.remove("hidden");
  typeWriterEffect(loveLetter, loveLetterText, 12);
}

function typeWriterEffect(text, element, speed = 16) {
  element.textContent = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

/* YES BUTTON */
yesBtn.addEventListener("click", () => {
  yayText.classList.remove("hidden");
  finalMsg.classList.remove("hidden");
});

/* NO BUTTON RUNS AWAY */
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 120 - 60;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

noBtn.addEventListener("click", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 120 - 60;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

/* BUTTON EVENTS */
startBtn.addEventListener("click", startRace);
stopBtn.addEventListener("click", stopRace);
nitroBtn.addEventListener("click", nitroBoost);
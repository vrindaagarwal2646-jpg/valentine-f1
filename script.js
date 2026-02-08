const startBtn = document.getElementById("startBtn");
const introScreen = document.getElementById("introScreen");
const gameScreen = document.getElementById("gameScreen");
const car = document.getElementById("car");

const boostBtn = document.getElementById("boostBtn");
const stopBtn = document.getElementById("stopBtn");

const checkpointCount = document.getElementById("checkpointCount");
const speedMeter = document.getElementById("speedMeter");

const lovePopup = document.getElementById("lovePopup");
const loveText = document.getElementById("loveText");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const finalMessage = document.getElementById("finalMessage");

const flowerRain = document.getElementById("flowerRain");
const track = document.querySelector(".track");

let carPos = 0;
let speed = 0;
let raceInterval = null;
let checkpointsHit = new Set();

const loveLetter =
`Hie mie love, i know that its been a rough couple of months for us but i hope u know ill choose u everytime through everything. thank you for bearing me and my acts lately and being so forgiving. u are the best person and husband anyone can ever have their in life and i am so glad and proud that i get to be ur wife.

i love and adore every single about u, ur eyes and the way they light up, ur hair and how they smell and look, ur cute nose, ur pretty asf lips and how they feel and they taste, ur smooth skin and cheeks and literally everything about ur body and how ure so fine and hot.

ur gorgeous voice and how u call out to me and talk to me and look at me and kiss me and hug me i love uuuuuuuuuu so fucking much and i miss u and i wish i could cuddle u 24/7 and just be w u and go w u everywhere.

and man ure so fucking intelligent and smart and so cutie pattotie i just wanna squish u. im just so grateful to have u and how u do so much for me without saying anything and how hardworking u are im so proud of u everyday.

so mie annu kuchu puchu, will u make a stupid decision by staying w my idiot ass forever and ever? 🥺🥺`;

function startRace() {
  introScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  speed = 6;
  raceInterval = setInterval(moveCar, 40);
}

function moveCar() {
  carPos += speed;

  // Slow down naturally near finish for cinematic effect
  if (carPos > 80) {
    speed = Math.max(1, speed - 0.05);
  }

  if (carPos > 92) {
    carPos = 92;
    finishRace();
  }

  car.style.left = carPos + "%";
  speedMeter.innerText = Math.floor(speed * 35);

  // Track moves faster based on speed
  let animSpeed = Math.max(0.2, 1.2 - speed * 0.08);
  track.style.setProperty("--roadSpeed", animSpeed + "s");

  checkCheckpoints();
}

function checkCheckpoints() {
  const checkpoints = document.querySelectorAll(".checkpoint");

  checkpoints.forEach(cp => {
    const cpPos = parseFloat(cp.style.left);

    if (carPos >= cpPos - 1 && !checkpointsHit.has(cp.dataset.check)) {
      checkpointsHit.add(cp.dataset.check);
      checkpointCount.innerText = checkpointsHit.size;

      flowerExplosion();
      smallFireworks();
    }
  });
}

function flowerExplosion() {
  const flowers = ["🌸", "🌹", "💐", "🌷", "🌺", "💘"];

  for (let i = 0; i < 28; i++) {
    const flower = document.createElement("span");
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = (Math.random() * 2 + 2) + "s";
    flower.style.fontSize = (Math.random() * 20 + 18) + "px";

    flowerRain.appendChild(flower);

    setTimeout(() => flower.remove(), 4000);
  }
}

function createFirework(x, y) {
  const firework = document.createElement("div");
  firework.classList.add("firework");

  firework.style.left = x + "px";
  firework.style.top = y + "px";

  firework.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
  firework.style.boxShadow = `0px 0px 20px ${firework.style.background}`;

  document.body.appendChild(firework);

  setTimeout(() => firework.remove(), 1200);
}

function smallFireworks() {
  for (let i = 0; i < 4; i++) {
    createFirework(
      Math.random() * window.innerWidth,
      Math.random() * (window.innerHeight / 2)
    );
  }
}

function grandFireworks() {
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      createFirework(
        Math.random() * window.innerWidth,
        Math.random() * (window.innerHeight / 1.8)
      );
    }, i * 120);
  }
}

function heartNitro() {
  speed += 4;
  flowerExplosion();

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createFirework(
        Math.random() * window.innerWidth,
        Math.random() * (window.innerHeight / 2)
      );
    }, i * 120);
  }

  setTimeout(() => {
    speed -= 3;
  }, 1500);
}

function stopRace() {
  speed = 0;
}

function finishRace() {
  clearInterval(raceInterval);

  // slow motion
  speed = 1;
  car.style.transition = "left 2s ease-out";

  // cinematic zoom
  document.body.classList.add("cinematic");

  // overlay
  const overlay = document.createElement("div");
  overlay.classList.add("slowmoOverlay");
  document.body.appendChild(overlay);

  // effects
  flowerExplosion();
  grandFireworks();

  setTimeout(() => {
    speed = 0;
    overlay.remove();
    showLovePopup();
  }, 2200);
}

function typeWriterEffect(text, element, speed = 16) {
  element.innerHTML = "";
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

function showLovePopup() {
  lovePopup.classList.remove("hidden");
  typeWriterEffect(loveLetter, loveText, 16);
}

/* NO BUTTON RUNS AWAY */
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 60 + 20;
  const y = Math.random() * 60 + 20;

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "%";
  noBtn.style.top = y + "%";
});

yesBtn.addEventListener("click", () => {
  finalMessage.classList.remove("hidden");
  flowerExplosion();
  flowerExplosion();
  grandFireworks();
});

startBtn.addEventListener("click", startRace);
boostBtn.addEventListener("click", heartNitro);
stopBtn.addEventListener("click", stopRace);
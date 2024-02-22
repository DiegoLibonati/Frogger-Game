import { Bullet } from "./Bullet";
import { Car } from "./Car";
import {
  boardDisplay,
  buttonResetLose,
  buttonResetWin,
  displayBridge,
  turret,
  turret2,
  winDisplay,
} from "./constants/elements";

const boardDisplayWidth: number = boardDisplay.offsetWidth;

const spawnsRandomNegative: number[] = [];
const spawnsRandomPositive: number[] = [];
let isDisplay: number[] = [];

randomSpawn();

const carsCreate: Car[] = [
  new Car(-`${spawnsRandomNegative[0]}`, 65),
  new Car(-`${spawnsRandomNegative[1]}`, 65),
  new Car(-`${spawnsRandomNegative[2]}`, 65),
  new Car(-`${spawnsRandomNegative[3]}`, 65),
  new Car(spawnsRandomPositive[0], 65),
  new Car(spawnsRandomPositive[1], 65),
  new Car(spawnsRandomPositive[2], 65),
  new Car(spawnsRandomPositive[3], 65),
  new Car(spawnsRandomPositive[4], 65),
  new Car(spawnsRandomPositive[5], 65),
  new Car(spawnsRandomPositive[6], 65),
  new Car(spawnsRandomPositive[7], 65),
  new Car(spawnsRandomPositive[0], 118),
  new Car(spawnsRandomPositive[1], 118),
  new Car(spawnsRandomPositive[2], 118),
  new Car(spawnsRandomPositive[3], 118),
  new Car(spawnsRandomPositive[4], 118),
  new Car(spawnsRandomPositive[5], 118),
  new Car(spawnsRandomPositive[6], 118),
  new Car(spawnsRandomPositive[7], 118),
];

const bulletsCreate: Bullet[] = [
  new Bullet(turret.offsetWidth, 225),
  new Bullet(boardDisplayWidth - turret2.offsetWidth, 226),
];

let userStart: number[] = [250, 0];
let currentPositionUser: number[] = userStart;
let gameOver: boolean | string = false;

createEnemys();
createUser();
userDraw();
detectCollision();

const wastedAudio = new Audio("./src/assets/wasted.ogg");

// Add events listeners
document.addEventListener("keydown", (e) => moveUser(e), false);
buttonResetWin.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.reload();
});
buttonResetLose.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.reload();
});

// functions

// F Enemy CARS && BULLETS
function createEnemys(): void {
  for (let i = 0; i < carsCreate.length; i++) {
    const enemy = document.createElement("div");
    enemy.setAttribute("class", "enemy");
    enemy.setAttribute("id", String(i));
    boardDisplay.append(enemy);
    enemy.style.left = `${carsCreate[i].x}px`;
    enemy.style.bottom = `${carsCreate[i].y}px`;
    randomSprite(enemy);
  }

  for (let i = 0; i < bulletsCreate.length; i++) {
    const enemy = document.createElement("div");
    enemy.setAttribute("class", "bullets");
    enemy.setAttribute("id", String(i + 20));
    boardDisplay.append(enemy);
    enemy.style.left = `${bulletsCreate[i].x}px`;
    enemy.style.bottom = `${bulletsCreate[i].y}px`;
  }
}

function moveEnemy(): void {
  drawEnemy();
  detectCollision();
}

function drawEnemy(): void {
  for (let i = 0; i < carsCreate.length; i++) {
    const newCar = document.getElementById(`${i}`) as HTMLDivElement;

    newCar.style.bottom = `${carsCreate[i].y}px`;

    if (carsCreate[i].x > boardDisplayWidth && carsCreate[i].y === 65) {
      carsCreate[i].x = -50;
      newCar.style.left = `${(carsCreate[i].x += 10)}px`;
    } else if (carsCreate[i].x < 0 && carsCreate[i].y === 118) {
      carsCreate[i].x = boardDisplayWidth + 50;
      newCar.style.left = `${(carsCreate[i].x -= 10)}px`;
    }

    if (carsCreate[i].y === 118) {
      newCar.style.transform = "rotate(180deg)";
      newCar.style.left = `${(carsCreate[i].x -= 10)}px`;
    } else if (carsCreate[i].y === 65) {
      newCar.style.left = `${(carsCreate[i].x += 10)}px`;
    }
  }

  for (let i = 0; i < bulletsCreate.length; i++) {
    const newBullet = document.getElementById(`${i + 20}`) as HTMLDivElement;

    if (bulletsCreate[i].y === 225) {
      if (
        bulletsCreate[i].x >
        boardDisplayWidth - turret2.offsetWidth - turret2.offsetWidth
      ) {
        bulletsCreate[i].x = 65;
      } else {
        newBullet.style.left = `${(bulletsCreate[i].x += 10)}px`;
      }
    } else if (bulletsCreate[i].y === 226) {
      if (bulletsCreate[i].x < 0 + turret.offsetWidth) {
        bulletsCreate[i].x = boardDisplayWidth - turret2.offsetWidth;
      }
      newBullet.style.left = `${(bulletsCreate[i].x -= 10)}px`;
      newBullet.style.transform = "rotate(180deg)";
    }
  }
}

// F User
function createUser(): void {
  const user = document.createElement("div");
  user.classList.add("user");
  boardDisplay.append(user);
}
function userDraw(): void {
  const user = document.querySelector(".user") as HTMLDivElement;
  user.style.left = `${currentPositionUser[0]}px`;
  user.style.bottom = `${currentPositionUser[1]}px`;
}
function moveUser(e: KeyboardEvent): void {
  const user = document.querySelector(".user") as HTMLDivElement;
  switch (e.key) {
    case "ArrowLeft":
      user.style.left = `${(currentPositionUser[0] -= 10)}px`;
      user.style.transform = "rotateY(180deg)";
      detectCollision();
      userDraw();
      break;

    case "ArrowRight":
      user.style.left = `${(currentPositionUser[0] += 10)}px`;
      user.style.transform = "rotateY(0deg)";
      detectCollision();
      userDraw();
      break;

    case "ArrowUp":
      user.style.bottom = `${(currentPositionUser[1] += 10)}px`;
      detectCollision();
      userDraw();
      break;

    case "ArrowDown":
      user.style.bottom = `${(currentPositionUser[1] -= 10)}px`;
      detectCollision();
      userDraw();
      break;
  }
}

// F General
function detectCollision(): void {
  const displayWater = document.querySelector(".waterImg") as HTMLImageElement;
  const user = document.querySelector(".user") as HTMLDivElement;
  const displayWin = document.querySelector(".win") as HTMLDivElement;
  const enemys = document.querySelectorAll(".enemy") as NodeList;
  const bullets = document.querySelectorAll(".bullets") as NodeList;

  const userPosition = user.getBoundingClientRect();
  const turretOnePosition = turret.getBoundingClientRect();
  const turretTwoPosition = turret2.getBoundingClientRect();
  const displayWaterPosition = displayWater.getBoundingClientRect();
  const displayBridgePosition = displayBridge.getBoundingClientRect();
  const displayWinPosition = displayWin.getBoundingClientRect();

  // Collisions Cars
  enemys.forEach(function (e) {
    const enemy = e as HTMLDivElement;
    const enemyPosition = enemy.getBoundingClientRect();

    if (
      userPosition.x > enemyPosition.x + enemyPosition.width ||
      userPosition.x + userPosition.width < enemyPosition.x ||
      userPosition.y > enemyPosition.y + enemyPosition.height ||
      userPosition.y + userPosition.height < enemyPosition.y
    ) {
      console.log("No collision with Cars");
    } else {
      gameOver = true;
      checkGameOver();
      console.log("Auto");
    }
  });

  // Colissions Bullets

  bullets.forEach(function (b) {
    const bullet = b as HTMLDivElement;
    const bulletPosition = bullet.getBoundingClientRect();

    if (
      userPosition.x > bulletPosition.x + bulletPosition.width ||
      userPosition.x + userPosition.width < bulletPosition.x ||
      userPosition.y > bulletPosition.y + bulletPosition.height ||
      userPosition.y + userPosition.height < bulletPosition.y
    ) {
      console.log("No collision with Bullet");
    } else {
      gameOver = true;
      checkGameOver();
      console.log("Bullet");
    }
  });

  // Colission Turret One
  if (
    userPosition.x > turretOnePosition.x + turretOnePosition.width ||
    userPosition.x + userPosition.width < turretOnePosition.x ||
    userPosition.y > turretOnePosition.y + turretOnePosition.height ||
    userPosition.y + userPosition.height < turretOnePosition.y
  ) {
    console.log("No collision with Turret One");
  } else {
    console.log("Turret");
    gameOver = true;
    checkGameOver();
  }

  // Colission Turret Two
  if (
    userPosition.x > turretTwoPosition.x + turretTwoPosition.width ||
    userPosition.x + userPosition.width < turretTwoPosition.x ||
    userPosition.y > turretTwoPosition.y + turretTwoPosition.height ||
    userPosition.y + userPosition.height < turretTwoPosition.y
  ) {
    console.log("No collision with Turret Two");
  } else {
    console.log("Turret");
    gameOver = true;
    checkGameOver();
  }

  if (
    userPosition.x > displayWaterPosition.x + displayWaterPosition.width ||
    userPosition.x + userPosition.width < displayWaterPosition.x ||
    userPosition.y > displayWaterPosition.y + displayWaterPosition.height ||
    userPosition.y + userPosition.height < displayWaterPosition.y ||
    !(
      userPosition.x > displayBridgePosition.x + displayBridgePosition.width ||
      userPosition.x + userPosition.width < displayBridgePosition.x ||
      userPosition.y > displayBridgePosition.y + displayBridgePosition.height ||
      userPosition.y + userPosition.height < displayBridgePosition.y
    )
  ) {
    gameOver = false;
  } else {
    gameOver = true;
    checkGameOver();
    console.log("Agua");
  }

  if (
    userPosition.x > displayWinPosition.x - displayWinPosition.width &&
    userPosition.x < displayWinPosition.x + displayWinPosition.width &&
    userPosition.y > displayWinPosition.y - displayWinPosition.height &&
    userPosition.y < displayWinPosition.y + displayWinPosition.height
  ) {
    gameOver = "win";
    checkGameOver();
  }

  if (currentPositionUser[0] < 0) {
    currentPositionUser[0] = boardDisplayWidth - userPosition.width;
  } else if (currentPositionUser[0] > boardDisplayWidth) {
    currentPositionUser[0] = 0;
  } else if (currentPositionUser[1] < 0) {
    currentPositionUser[1] = 5;
  }
}

function randomSpawn(): void {
  // spawns random autos
  for (let i = 0; i < 8; i++) {
    const randomSpawnNegative = Math.floor(Math.random() * 1000);
    const randomSpawnPositive = Math.floor(Math.random() * boardDisplayWidth);
    spawnsRandomNegative.push(randomSpawnNegative);
    spawnsRandomPositive.push(randomSpawnPositive);
  }
}

function randomSprite(enemy: HTMLDivElement): void {
  // spawns sprites random
  const sprites = [1, 2];

  const randomSprite = Math.floor(Math.random() * sprites.length);

  if (randomSprite === 0) {
    enemy.style.backgroundImage = "url(./src/assets/ar.png)";
  } else if (randomSprite === 1) {
    enemy.style.backgroundImage = "url(./src/assets/truck.png)";
  }
}

function displayGameOver(): void {
  const gameOverElement = document.querySelector(".gameover") as HTMLElement;
  const gameOverImage = document.querySelector(
    ".gameoverImage"
  ) as HTMLImageElement;

  gameOverElement.style.display = "flex";
  gameOverImage.style.backgroundImage = "url(./src/assets/gameover.png)";
}

function checkGameOver(): void {
  if (gameOver == true) {
    clearInterval(intervalMoveEnemy);
    clearInterval(intervalDisplayBridge);
    document.removeEventListener("keydown", (e) => moveUser(e), false);
    setTimeout(displayGameOver, 2150);
    wastedAudio.play();
  }

  if (gameOver == "win") {
    clearInterval(intervalMoveEnemy);
    clearInterval(intervalDisplayBridge);
    document.removeEventListener("keydown", (e) => moveUser(e), false);
    boardDisplay.remove();
    winDisplay.style.display = "flex";
    console.log("GANASTE");
  }

  gameOver = false;
}

function bridgeDisplay(displayBridge: HTMLDivElement): number | void {
  if (isDisplay.includes(1)) {
    isDisplay = [];
    displayBridge.style.display = "none";
  } else {
    displayBridge.style.display = "block";
    isDisplay.push(1);
    const randomValueBridge = Math.floor(Math.random() * 2000);
    return randomValueBridge;
  }
}

// Intervals
let intervalMoveEnemy = setInterval(moveEnemy, 50);
let intervalDisplayBridge = setInterval(function () {
  bridgeDisplay(displayBridge);
}, bridgeDisplay(displayBridge)!);

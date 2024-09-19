# Frogger-Game

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page to play Frogger. Frogger is a traditional game of the frog trying to get to the other side of the map, in this case I made one among us. The first test will be to pass through a traffic full of ferraris and trucks, then you will have to dodge the bullets of two turrets and finally pass through a bridge that disappears and reappears. If you reach the red line, you win.

IMPORTANT: NOT SUPPORT FOR MOBILE

## Technologies used

1. Typescript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/Frogger-Game`](https://www.diegolibonati.com.ar/#/project/Frogger-Game)

## Video

https://user-images.githubusercontent.com/99032604/199615506-85761aec-f72f-4a9b-8e43-4f51e4055b5d.mp4

## Documentation

We generate two classes, one class will be `Car` which will refer to the cars that are created with two attributes both X and Y for their position and the class `Bullet` which will be those that are fired by the towers that also have the same attributes.

```
export class Car {
  constructor(public x: number, public y: number) {}
}


export class Bullet {
  constructor(public x: number, public y: number) {}
}

```

We create an array called `carsCreate` where we will instantiate all the cars, these cars will be the enemies:

```
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
```

The same for bullets:

```
const bulletsCreate: Bullet[] = [
  new Bullet(turret.offsetWidth, 225),
  new Bullet(boardDisplayWidth - turret2.offsetWidth, 226),
];
```

These functions belong to the enemies, we find here, where the enemy `createEnemys()` is created, how the enemy `moveEnemy()` is moved and when it is drawn with `drawEnemy()`:

```
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
```

These functions belong to the user, we find here, where the user `createUser()` is created, how the user `moveUser()` is moved and when it is drawn with `userDraw()`:

```
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
```

The `detectCollision()` function is in charge of detecting if there is any collision with the user between the elements of the map:

```
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
```

The `randomSpawn()` function is in charge of generating a random spawn of the cars on the road on the map:

```
function randomSpawn(): void {
  // spawns random autos
  for (let i = 0; i < 8; i++) {
    const randomSpawnNegative = Math.floor(Math.random() * 1000);
    const randomSpawnPositive = Math.floor(Math.random() * boardDisplayWidth);
    spawnsRandomNegative.push(randomSpawnNegative);
    spawnsRandomPositive.push(randomSpawnPositive);
  }
}
```

The `randomSprite()` function is in charge of randomly generating the car skins/sprites:

```
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
```

The `displayGameOver()` function displays the `Wasted` screen when the user loses:

```
function displayGameOver(): void {
  const gameOverElement = document.querySelector(".gameover") as HTMLElement;
  const gameOverImage = document.querySelector(
    ".gameoverImage"
  ) as HTMLImageElement;

  gameOverElement.style.display = "flex";
  gameOverImage.style.backgroundImage = "url(./src/assets/gameover.png)";
}
```

The `checkGameOver()` function is in charge of checking if the user lost or won, depending on the case it will do different things:

```
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
```

The `bridgeDisplay()` function is in charge of displaying the final bridge:

```
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
```

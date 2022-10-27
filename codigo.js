const boardDisplay = document.querySelector(".section_container");
const winDisplay = document.querySelector(".final_win");
const buttonResetWin = document.querySelector(".final_win button");
const buttonResetLose = document.querySelector(".gameover button");
const turret = document.querySelector(".turret");
const turret2 = document.querySelector(".turret2");
const displayBridge = document.querySelector(".puente");
const boardDisplayWidth = boardDisplay.offsetWidth;
const boardDisplayHeight = boardDisplay.offsetHeight;
const enemyWidth = 61;
const enemyHeight = 23;

console.log(boardDisplayWidth)

class Cars{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Bullets{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

const spawnsRandomNegative = [];
const spawnsRandomPositive = [];
let isDisplay = [];

randomSpawn();

const carsCreate = [
    new Cars(-`${spawnsRandomNegative[0]}`, 50),
    new Cars(-`${spawnsRandomNegative[1]}`, 50),
    new Cars(-`${spawnsRandomNegative[2]}`, 50),
    new Cars(-`${spawnsRandomNegative[3]}`, 50),
    new Cars(spawnsRandomPositive[0], 50),
    new Cars(spawnsRandomPositive[1], 50),
    new Cars(spawnsRandomPositive[2], 50),
    new Cars(spawnsRandomPositive[3], 50),
    new Cars(spawnsRandomPositive[4], 50),
    new Cars(spawnsRandomPositive[5], 50),
    new Cars(spawnsRandomPositive[6], 50),
    new Cars(spawnsRandomPositive[7], 50),
    new Cars(spawnsRandomPositive[0], 100),
    new Cars(spawnsRandomPositive[1], 100),
    new Cars(spawnsRandomPositive[2], 100),
    new Cars(spawnsRandomPositive[3], 100),
    new Cars(spawnsRandomPositive[4], 100),
    new Cars(spawnsRandomPositive[5], 100),
    new Cars(spawnsRandomPositive[6], 100),
    new Cars(spawnsRandomPositive[7], 100),
];

const bulletsCreate = [
    new Bullets(`${0 + turret.offsetWidth}`, 215),
    new Bullets(`${boardDisplayWidth - turret2.offsetWidth}`, 214),
];

let userStart = [250,0];
let currentPositionUser = userStart;

let enemyStart;
let currentPositionEnemy;

let gameOver = false;

createEnemys();
createUser();
userDraw();
detectCollision();

const enemy = document.querySelector(".enemy"); 
const user = document.querySelector(".user"); 

let wastedAudio = new Audio("wasted.ogg");

// Add events listeners
document.addEventListener("keydown", moveUser);
buttonResetWin.addEventListener("click", (e)=>{
    e.preventDefault();
    window.location.reload()
})
buttonResetLose.addEventListener("click", (e)=>{
    e.preventDefault();
    window.location.reload()
})

// functions 

// F Enemy CARS && BULLETS
function createEnemys(){
    for (i = 0; i < carsCreate.length; i++){
        const enemy = document.createElement("div");
        enemy.setAttribute("class", "enemy");
        enemy.setAttribute("id", i);
        boardDisplay.append(enemy);
        enemy.style.left = `${carsCreate[i].x}px`;
        enemy.style.bottom = `${carsCreate[i].y}px`;
        spawnPositionCars();
        randomSprite(enemy);
    }    

    for (i = 0; i < bulletsCreate.length; i++){
        const enemy = document.createElement("div");
        enemy.setAttribute("class", "bullets");
        enemy.setAttribute("id", i + 20);
        boardDisplay.append(enemy);
        enemy.style.left = `${bulletsCreate[i].x}px`;
        enemy.style.bottom = `${bulletsCreate[i].y}px`;
    }    
}

function moveEnemy(){
    drawEnemy();
    detectCollision();
}

function drawEnemy(){
    const turret = document.querySelector(".turret");
    const turret2 = document.querySelector(".turret2");
    
    for (i = 0; i < carsCreate.length; i++){
        let newCar = document.getElementById(`${i}`);
        
        newCar.style.left = currentPositionEnemy[0];
        newCar.style.bottom = currentPositionEnemy[1];

        if (carsCreate[i].x > boardDisplayWidth && carsCreate[i].y === 50){
            carsCreate[i].x = -50
            currentPositionEnemy[0] = `${carsCreate[i].x += 10}px`
        } else if (carsCreate[i].x < 0 && carsCreate[i].y === 100){
            carsCreate[i].x = boardDisplayWidth + 50
            currentPositionEnemy[0] = `${carsCreate[i].x -= 10}px`
        } else {
            if (carsCreate[i].y === 100){
                newCar.style.transform = "rotate(180deg)"
                newCar.style.left = `${carsCreate[i].x -= 10}px`;
            } else if (carsCreate[i].y === 50){
                newCar.style.left = `${carsCreate[i].x += 10}px`
            }
        }
        }

        
        for (i = 0; i < bulletsCreate.length; i++){
            let newBullet = document.getElementById(`${i + 20}`);
            
            if (bulletsCreate[i].y === 215){
                if (bulletsCreate[i].x > boardDisplayWidth - turret2.offsetWidth - turret2.offsetWidth){
                    bulletsCreate[i].x = 65;
                } else {
                    newBullet.style.left = `${bulletsCreate[i].x += 10}px`
                }

            } else if (bulletsCreate[i].y === 214){
                if (bulletsCreate[i].x < 0 + turret.offsetWidth){
                    bulletsCreate[i].x = boardDisplayWidth - turret2.offsetWidth;
                }
                newBullet.style.left = `${bulletsCreate[i].x-= 10}px`
                newBullet.style.transform = "rotate(180deg)"
            }
        }


}


// F User
function createUser(){
    const user = document.createElement("div");
    user.classList.add("user");
    boardDisplay.append(user);    
}
function userDraw(){
    const user = document.querySelector(".user"); 
    user.style.left = `${currentPositionUser[0]}px`;
    user.style.bottom = `${currentPositionUser[1]}px`;
}
function moveUser(e){
    const user = document.querySelector(".user"); 
    switch(e.key){

        case "ArrowLeft":
        user.style.left = `${currentPositionUser[0] -= 10}px`;
        user.style.transform = "rotateY(180deg)"
        detectCollision();
        userDraw();
        break;

        case "ArrowRight":
        user.style.left = `${currentPositionUser[0] += 10}px`;
        user.style.transform = "rotateY(0deg)"
        detectCollision();
        userDraw();
        break;

        case "ArrowUp":
        user.style.bottom = `${currentPositionUser[1] += 10}px`
        detectCollision();
        userDraw();
        break;

        case "ArrowDown":
        user.style.bottom = `${currentPositionUser[1] -= 10}px`
        detectCollision();
        userDraw();
        break;
    }
}

// F General
function detectCollision(){

    const turretOne = document.querySelector(".turret");
    const turretTwo = document.querySelector(".turret2");
    const displayWater = document.querySelector(".waterImg");
    const user = document.querySelector(".user");
    const displayBridge = document.querySelector(".puente"); 
    const displayWin = document.querySelector(".win");
    const enemys = document.querySelectorAll(".enemy");
    const bullets = document.querySelectorAll(".bullets");
    userPosition = user.getBoundingClientRect();
    turretOnePosition = turretOne.getBoundingClientRect();
    turretTwoPosition = turretTwo.getBoundingClientRect();
    displayWaterPosition = displayWater.getBoundingClientRect();
    displayBridgePosition = displayBridge.getBoundingClientRect();
    displayWinPosition = displayWin.getBoundingClientRect();


// Collisions Cars
    enemys.forEach(function(enemy){
        enemyPosition = enemy.getBoundingClientRect();

        if (userPosition.x > enemyPosition.x + enemyPosition.width ||
            userPosition.x + userPosition.width < enemyPosition.x ||
            userPosition.y > enemyPosition.y + enemyPosition.height ||
            userPosition.y + userPosition.height < enemyPosition.y
            ){
                console.log("No collision with Cars")
        } else {
            gameOver = true;
            checkGameOver();
            console.log("Auto")
        }

    });

// Colissions Bullets

    bullets.forEach(function(bullet){
        bulletPosition = bullet.getBoundingClientRect();

        if (userPosition.x > bulletPosition.x + bulletPosition.width ||
            userPosition.x + userPosition.width < bulletPosition.x ||
            userPosition.y > bulletPosition.y + bulletPosition.height ||
            userPosition.y + userPosition.height < bulletPosition.y
            ){
                console.log("No collision with Bullet")
        } else {
            gameOver = true;
            checkGameOver();
            console.log("Bullet")
        }
    });


// Colission Turret One
    if (userPosition.x > turretOnePosition.x + turretOnePosition.width ||
        userPosition.x + userPosition.width < turretOnePosition.x ||
        userPosition.y > turretOnePosition.y + turretOnePosition.height ||
        userPosition.y + userPosition.height < turretOnePosition.y
        ){
            console.log("No collision with Turret One")
    } else{
        console.log("Turret")
        gameOver = true;
        checkGameOver();
    }

// Colission Turret Two
if (userPosition.x > turretTwoPosition.x + turretTwoPosition.width ||
    userPosition.x + userPosition.width < turretTwoPosition.x ||
    userPosition.y > turretTwoPosition.y + turretTwoPosition.height ||
    userPosition.y + userPosition.height < turretTwoPosition.y
    ){
        console.log("No collision with Turret Two")
} else{
    console.log("Turret")
    gameOver = true;
    checkGameOver();
}


    if ((userPosition.x > displayWaterPosition.x + displayWaterPosition.width ||
        userPosition.x + userPosition.width < displayWaterPosition.x ||
        userPosition.y > displayWaterPosition.y + displayWaterPosition.height ||
        userPosition.y + userPosition.height < displayWaterPosition.y) || !(userPosition.x > displayBridgePosition.x + displayBridgePosition.width ||
            userPosition.x + userPosition.width < displayBridgePosition.x ||
            userPosition.y > displayBridgePosition.y + displayBridgePosition.height ||
            userPosition.y + userPosition.height < displayBridgePosition.y)
        ){
            gameOver = false;
    } else {
        gameOver = true;
        checkGameOver();
        console.log("Agua")
    }

    if ((userPosition.x > displayWinPosition.x - displayWinPosition.width && userPosition.x < displayWinPosition.x + displayWinPosition.width && userPosition.y > displayWinPosition.y - displayWinPosition.height && userPosition.y < displayWinPosition.y + displayWinPosition.height)){
       gameOver = "win";
       checkGameOver(); 
    }

    if (currentPositionUser[0] < 0){
        currentPositionUser[0] = boardDisplayWidth - userPosition.width;
    } else if (currentPositionUser[0] > boardDisplayWidth){
        currentPositionUser[0] = 0;
    } else if (currentPositionUser[1] < 0){
        currentPositionUser[1] = 5;
    }


}



function randomSpawn(){

    // spawns random autos
    for (i = 0; i < 8; i++){
        let randomSpawnNegative = Math.floor(Math.random() * 1000);
        let randomSpawnPositive = Math.floor(Math.random() * boardDisplayWidth);
        spawnsRandomNegative.push(randomSpawnNegative);
        spawnsRandomPositive.push(randomSpawnPositive);
    }

}

function randomSprite(enemy){
        // spawns sprites random
        const sprites = [1, 2];

        let randomSprite = Math.floor(Math.random() * sprites.length);

        if (randomSprite === 0){
            enemy.style.backgroundImage = "url(ar.png)"
        } else if (randomSprite === 1){
            enemy.style.backgroundImage = "url(truck.png)"
        } 
}

function displayGameOver(){
    document.querySelector(".gameover").style.display = "flex";
    document.querySelector(".gameoverImage").style.backgroundImage = "url(gameover.png)";
}

function spawnPositionCars(){
    enemyStart = [carsCreate[i].x, carsCreate[i].y];
    currentPositionEnemy = enemyStart;
}

function checkGameOver(){
    if (gameOver == true){
        clearInterval(intervalMoveEnemy);
        clearInterval(intervalDisplayBridge);
        document.removeEventListener("keydown", moveUser);
        setTimeout(displayGameOver, 2150)
        wastedAudio.play();
    }

    if (gameOver == "win"){
        clearInterval(intervalMoveEnemy);
        clearInterval(intervalDisplayBridge);
        document.removeEventListener("keydown", moveUser);
        boardDisplay.remove(boardDisplay);
        winDisplay.style.display = "flex";
        console.log("GANASTE")
    }

    gameOver = false;
}

function bridgeDisplay(displayBridge){

    if (isDisplay.includes(1)){
        isDisplay = [];
        displayBridge.style.display = "none";
    } else {
        displayBridge.style.display = "block";
        isDisplay.push(1);
        let randomValueBridge = Math.floor(Math.random() * 2000);
        return randomValueBridge
    }


}


// Intervals
let intervalMoveEnemy = setInterval(moveEnemy, 50);
let intervalDisplayBridge = setInterval(function() {bridgeDisplay(displayBridge);}, bridgeDisplay(displayBridge));





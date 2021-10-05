const screens = document.querySelectorAll(".screen");
const choose_insects_btns = document.querySelectorAll(".choose-insect-btn");
const start_btn = document.getElementById("start-btn");
const game_container = document.getElementById("game-container");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const message = document.getElementById("message");
const insect = document.querySelectorAll(".insect");

let seconds = 0;
let score = 0;
let selected_insect = {};

start_btn.addEventListener("click", () => {
    screens[0].classList.add("up");
});

choose_insects_btns.forEach(btn => {
    btn.addEventListener("click", () => {
        const img = btn.querySelector("img");
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt");

        selected_insect = { src, alt };
        screens[1].classList.add("up");
        setTimeout(createInsect, 1000);
        startGame();
    });
});
function startGame() {
    setInterval(increaseTime, 1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    timeElement.innerHTML = `Time: ${m}:${s}`
    seconds++;

}

function createInsect() {
    const insect = document.createElement("div");
    insect.classList.add("insect");
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `
    <img src="${selected_insect.src}" 
    alt="${selected_insect.alt}" 
    style="transform: rotate(${Math.random() * 360}deg)">
    `

    insect.addEventListener("click", catchInsect);

    game_container.appendChild(insect);
}

function getRandomLocation(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 100);
    const y = Math.random() * (height - 100);

    return { x, y };
}

function catchInsect(){
    increaseScore();
    this.classList.add("caught");
    setTimeout(() => this.classList.remove(), 2000);
    addInsects();
}

function addInsects(){
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

function increaseScore(){
    score++;
    if(score > 19){
        message.classList.add("visible");

    }
    scoreElement.innerHTML = `Score: ${score}`;
}
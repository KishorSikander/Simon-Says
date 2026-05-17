let gameseq = [];
let userseq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {

    if (started == false) {

        console.log("Game Started");

        started = true;

        levelup();
    }
});

function gameFlash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {

    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {

    userseq = [];

    level++;

    h2.innerHTML = `
    Level ${level} <br>
    Highest Score : ${highestScore}
    `;

    let randomnum = Math.floor(Math.random() * 4);

    let randomcolor = btns[randomnum];

    let randombtn = document.querySelector(`.${randomcolor}`);

    gameseq.push(randomcolor);

    console.log(gameseq);

    gameFlash(randombtn);
}

function checkans(idx) {

    if (userseq[idx] === gameseq[idx]) {

        if (userseq.length === gameseq.length) {

            setTimeout(levelup, 1000);
        }

    } else {

        // Update highest score
        if (level > highestScore) {

            highestScore = level;
        }

        h2.innerHTML = `
        Game Over! Your score was <b>${level}</b> <br>
        Highest Score : <b>${highestScore}</b> <br>
        Press Any Key to Restart
        `;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {

            document.querySelector("body").style.backgroundColor = "white";

        }, 150);

        reset();
    }
}

function btnPress() {

    let btn = this;

    userFlash(btn);

    let usercolor = btn.getAttribute("id");

    userseq.push(usercolor);

    console.log(userseq);

    checkans(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {

    btn.addEventListener("click", btnPress);
}

function reset() {

    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
// //ONLOAD FUNCTION
function load(){
  //canvas variables
let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

// game variables
let startingScore = 0;
let continueAnimating = false;
let score;
let alive = true;

// hero variables
let heroWidth = 20;
let heroHeight = 15;
let heroSpeed = 40;
let hero = {
    x: 0,
    y: canvas.height - heroHeight,
    width: heroWidth,
    height: heroHeight,
    heroSpeed: heroSpeed
}

// icicle variables
let icicleWidth = 15;
let icicleHeight = 15;
let totalIcicles = 50;
let icicles = [];
for (let i = 0; i < totalIcicles; i++) {
    addIcicle();
}

function addIcicle() {
    let icicle = {
        width: icicleWidth,
        height: icicleHeight
    }
    resetIcicle(icicle);
    icicles.push(icicle);
}

// move the icicle to a random position near the top-of-canvas
// assign the icicle a random speed
function resetIcicle(icicle) {
    icicle.x = Math.random() * (canvas.width - icicleWidth);
    icicle.y = 15 + Math.random() * 30;
    icicle.speed = 5 + Math.random() * 0.5;
}


//left and right keypush event handlers
window.onkeydown = function (event) {
    if (event.keyCode == 39) {
        hero.x += hero.heroSpeed;
    } else if (event.keyCode == 37) {
        hero.x -= hero.heroSpeed;
        if (hero.x <= 0) {
            hero.x = 0;
        }
    }
}


function animate() {

    // request another animation frame

    if (continueAnimating) {
        requestAnimationFrame(animate);
    }

    // for each icicle
    // (1) check for collisions
    // (2) advance the icicle
    // (3) if the icicle falls below the canvas, reset that icicle

    for (let i = 0; i < icicles.length; i++) {

        let icicle = icicles[i];

        function incScore(){
          score+=10;
        }

        while(alive === true){
          setInterval()
        }

        // test for icicle-hero collision
        if (isColliding(icicle, hero)) {
          alive = false;
          alert('DEAD! Game over man! Game over.');
          window.location.reload(true);

        }

        // advance the icicles
        icicle.y += icicle.speed;

        // if the icicle is below the canvas,
        if (icicle.y > canvas.height) {
            resetIcicle(icicle);
        }


    }

    // redraw everything
    drawEverything();

}

function isColliding(a, b) {
    return !(
    b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
}

function drawEverything() {

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draw the background
    context.fillStyle = "ivory";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // draw the hero
    context.fillStyle = "skyblue";
    context.fillRect(hero.x, hero.y, hero.width, hero.height);
    context.strokeStyle = "lightgray";
    context.strokeRect(hero.x, hero.y, hero.width, hero.height);
    // //DRAW OUR HERO'S HEAD
    // let headX = 590;
    // let headY = 565;
    // let headW = 20;
    // let headH = 20;
    //
    // function drawHead(headX, headY, headW, headH){
    //   context.fillRect(headX, headY, headW, headH);
    //   context.clearRect(headX+4, headY+5, 4, 4);
    //   context.clearRect(headX+12, headY+5, 4, 4);
    //   context.clearRect(headX+7, headY+14, 6, 2);
    // };
    //
    // drawHead(headX, headY, headW, headH);
    //
    //
    // //DRAW OUR HERO'S BODY
    // let bodyX1 = 600;
    // let bodyX2 = 595;
    // let bodyX3 = 605;
    //
    // function drawBody(bodyX1, bodyX2, bodyX3) {
    //   context.beginPath();
    //   context.moveTo(bodyX1, 585);
    //   context.lineTo(bodyX1, 590);
    //   context.lineTo(bodyX2, 590);
    //   context.lineTo(bodyX3, 590);
    //   context.lineTo(bodyX1, 590);
    //   context.lineTo(bodyX1, 595);
    //   context.lineTo(bodyX2, 600);
    //   context.lineTo(bodyX1, 595);
    //   context.lineTo(bodyX3, 600);
    //   context.stroke();
    // };
    //
    // drawBody(bodyX1, bodyX2, bodyX3);

    // draw all icicles
    for (let i = 0; i < icicles.length; i++) {
        let icicle = icicles[i];
        // optionally, drawImage(iciclesImg,icicle.x,icicle.y)
        context.fillStyle = "gray";
        context.fillRect(icicle.x, icicle.y, icicle.width, icicle.height);
    }

    // draw the score
    context.font = "14px Times New Roman";
    context.fillStyle = "black";
    context.fillText("Score: " + score, 10, 15);
}



// button to start the game
$("#start").click(function () {
    score = startingScore;
    hero.x = canvas.width / 2;
    for (let i = 0; i < icicles.length; i++) {
        resetIcicle(icicles[i]);
    }
    if (!continueAnimating) {
        continueAnimating = true;
        animate();
    };
});



  // let canvas = document.getElementById('game');
  // let context = canvas.getContext('2d');
  // let keepAnimating = false;
  // let icicles = [];
  // let totalIcicles = 1200;
  // for (let i = 0; i < totalIcicles; i+=30) {
  //   drawIcicles(i, i+10, i+20, i+10, i+20, i+30)
  // };
  //
  // //HOW TO DRAW ICICLES
  // function drawIcicles(x1, x2, x3, x4, x5, x6){
  //   context.beginPath();
  //   context.moveTo(x1, 0);
  //   context.lineTo(x2, 30);
  //   context.lineTo(x3, 0);
  //   context.lineTo(x4, 0);
  //   context.lineTo(x5, 30);
  //   context.lineTo(x6, 0);
  //   context.fill();
  // };
  //
  //
  //
  // //MOVE OUR HERO
  // window.onkeydown = function(ev) {
  //   let keyPressed = ev.keyCode;
  //   if(keyPressed === 39 && headX <= 1170){
  //     headX += 20;
  //     bodyX1 += 20;
  //     bodyX2 += 20;
  //     bodyX3 += 20; //right arrow add 20 from current
  //   }else if(keyPressed === 37 && headX > 0){
  //     headX -= 20; //left arrow subtract 20 from current
  //     bodyX1 -= 20;
  //     bodyX2 -= 20;
  //     bodyX3 -= 20;
  //   }
  //
  //
  //   //CLEAR EVERYTHING ON CANVAS EXCEPT ICICLES
  //   context.clearRect(0, 500, 1200, 600);
  //
  //   //DRAW HERO AT NEW POSITION
  //   drawHead(headX, headY, headW, headH);
  //   drawBody(bodyX1, bodyX2, bodyX3);
  // };




};

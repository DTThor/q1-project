// //ONLOAD FUNCTION
function load(){


//canvas variables
let canvas = document.getElementById("game");
let context = canvas.getContext("2d");
let incScore = true;

// game variables
let startingScore = 0;
let continueAnimating = false;
let score = 0;
let highscore = localStorage.getItem("highscore");

// hero variables
let heroWidth = 10;
let heroHeight = 25;
let heroSpeed = 30;
let hero = {
    x: 0,
    y: canvas.height - heroHeight,
    width: heroWidth,
    height: heroHeight,
    heroSpeed: heroSpeed
}

// icicle variables
let icicleWidth = 5;
let icicleHeight = 15;
let totalIcicles = 70;
let icicles = [];
for (let i = 0; i < totalIcicles; i++) {
    addIcicle();
}

function homePage(){
  let imgHome = new Image();
  imgHome.onload = function(){
    context.drawImage(imgHome, 0, 0);
  };
  imgHome.src ="http://blog.mycoughdrop.com/content/images/2017/07/avalanche.jpg";
}
homePage();

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
  icicle.y = Math.random() * 100;
  icicle.speed = 5 + Math.random() * 0.5;
}


//move hero left and right
function moveHero() {
  window.onkeydown = function (event) {
    if (event.keyCode === 39) {
      hero.x += hero.heroSpeed;
    } else if (event.keyCode === 37) {
      hero.x -= hero.heroSpeed;
      if (hero.x <= 0) {
        hero.x = 0;
      }
    }
  }
}
moveHero();


function animate() {
  // request another animation frame
  if (continueAnimating) {
    requestAnimationFrame(animate);
  }
//increment score if still alive
  if(incScore){
    score++;
  }

  for (let i = 0; i < icicles.length; i++) {
    let icicle = icicles[i];
    // test for icicle-hero collision
    if (isColliding(icicle, hero)) {
      //alive = false;
      return deathPage();
    }
    // advance the icicles
    icicle.y += icicle.speed;
    // if the icicle is below the canvas, reset that icicle
    if (icicle.y > canvas.height) {
      resetIcicle(icicle);
    }
  }
  // redraw everything
  drawEverything();
}

function deathPage(){
  let imgGameOver = new Image();
  imgGameOver.onload = function(){
    context.drawImage(imgGameOver, 0, 0);
    if (score > highscore) {
      localStorage.setItem("highscore", score);
      context.fillText('NEW HIGHSCORE!!!', canvas.width / 2 - 170, canvas.height / 2 - 50);
    };
    context.fillText('YOU GOT KILLED BY AN ICICLE!', canvas.width / 2 - 250, canvas.height / 2 - 100);
    context.fillText('SCORE: ' + score, canvas.width / 2 - 100, canvas.height / 2);
    context.fillText('HIGHSCORE: ' + localStorage.getItem("highscore"), canvas.width / 2 - 150, canvas.height / 2 + 50);
    context.fillText('Press ENTER to try again', canvas.width / 2 - 250, canvas.height / 2 + 150);
    context.fillStyle = 'white';
    context.font = '32px monospace';
  };
  imgGameOver.src ="http://cdn.wallpapersafari.com/12/10/eD53j0.jpg";
  window.onkeydown = function (event) {
    if(event.keycode === 13){
      begin();
    };
    moveHero();
  };
  incScore = false;
};


function isColliding(a, b) {
  return !(b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
}

function drawEverything() {
  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the background
  context.fillStyle = "lightgray";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // draw the hero
  // let imgHero = new Image();
  // imgHero.onload = function(){
  //   console.log('booyah');
  //   context.drawImage(imgHero, hero.x, hero.y, hero.width, hero.height);
  // }
  // imgHero.src="http://68.media.tumblr.com/1277da84031c9ab632f3d9f1e9d6beab/tumblr_mn9ct2VVWP1r413h3o1_400.jpg";
  context.fillStyle = "black";
  context.fillRect(hero.x, hero.y, hero.width, hero.height);
  context.clearRect(hero.x+2, hero.y+2, 2, 2);
  context.clearRect(hero.x+6, hero.y+2, 2, 2);
  context.clearRect(hero.x+2, hero.y+6, 6, 1);
  context.strokeStyle = "lightgray";
  context.strokeRect(hero.x, hero.y, hero.width, hero.height);

  // draw all icicles
  for (let i = 0; i < icicles.length; i++) {
    let icicle = icicles[i];
    // MAYBE ADD IMAGE OF ICICLE LATER, drawImage(iciclesImg,icicle.x,icicle.y)
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.strokeRect(icicle.x, icicle.y, icicle.width, icicle.height);
    context.fillRect(icicle.x, icicle.y, icicle.width, icicle.height);
  }

    // draw the score
  context.font = "24px monospace";
  context.fillStyle = "black";
  context.fillText("Score: " + score, 10, 35);
};



// button to start the game
$("#start").click(function begin() {
    score = startingScore;
    hero.x = canvas.width / 2;
    for (let i = 0; i < icicles.length; i++) {
        resetIcicle(icicles[i]);
    }
    if (!continueAnimating) {
        continueAnimating = true;
        animate();
    };
    incScore = true;
});


};

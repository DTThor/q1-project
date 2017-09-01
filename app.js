function draw(){
  let canvas = document.getElementById('game');
  let context = canvas.getContext('2d');

//DRAW ALL THE ICICLES ACROSS THE TOP
  for (let i = 0; i < 1200; i+=30) {
    drawIcicles(i, i+10, i+20, i+10, i+20, i+30);
     }

//HOW TO DRAW ICICLES
  function drawIcicles(x1, x2, x3, x4, x5, x6){
    context.beginPath();
    context.moveTo(x1, 0);
    context.lineTo(x2, 30);
    context.lineTo(x3, 0);
    context.lineTo(x4, 0);
    context.lineTo(x5, 30);
    context.lineTo(x6, 0);
    context.fill();
  }


//DRAW OUR HERO'S HEAD
  let headX = 590;
  let headY = 565;
  let headW = 20;
  let headH = 20;

  function drawHead(headX, headY, headW, headH){
    context.fillRect(headX, headY, headW, headH);
    context.clearRect(headX+4, headY+5, 4, 4);
    context.clearRect(headX+12, headY+5, 4, 4);
    context.clearRect(headX+7, headY+14, 6, 2);
  }

  drawHead(headX, headY, headW, headH);


//DRAW OUR HERO'S BODY
  let bodyX1 = 600;
  let bodyX2 = 595;
  let bodyX3 = 605;

  function drawBody(bodyX1, bodyX2, bodyX3) {
    context.beginPath();
    context.moveTo(bodyX1, 585);
    context.lineTo(bodyX1, 590);
    context.lineTo(bodyX2, 590);
    context.lineTo(bodyX3, 590);
    context.lineTo(bodyX1, 590);
    context.lineTo(bodyX1, 595);
    context.lineTo(bodyX2, 600);
    context.lineTo(bodyX1, 595);
    context.lineTo(bodyX3, 600);
    context.stroke();
  }

  drawBody(bodyX1, bodyX2, bodyX3);

//MOVE OUR HERO
  window.onkeydown = function(ev) {
    let keyPressed = ev.keyCode;
    if(keyPressed === 39 && headX <= 1170){
        headX += 20;
        bodyX1 += 20;
        bodyX2 += 20;
        bodyX3 += 20; //right arrow add 20 from current
    }
    else if(keyPressed === 37 && headX > 0){
        headX -= 20; //left arrow subtract 20 from current
        bodyX1 -= 20;
        bodyX2 -= 20;
        bodyX3 -= 20;
    }


  	/*clearing anything drawn on canvas
     *comment this below do draw path */
    context.clearRect(0, 30, 1200, 600);

  	//DRAW HERO AT NEW POSITION
    drawHead(headX, headY, headW, headH);
    drawBody(bodyX1, bodyX2, bodyX3);
};




};

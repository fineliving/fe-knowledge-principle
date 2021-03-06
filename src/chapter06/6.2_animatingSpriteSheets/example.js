var canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   animateButton = document.getElementById('animateButton'),
   spritesheet = new Image(),
   runnerCells = [{
         left: 0,
         top: 0,
         width: 47,
         height: 64
      },
      {
         left: 55,
         top: 0,
         width: 44,
         height: 64
      },
      {
         left: 107,
         top: 0,
         width: 39,
         height: 64
      },
      {
         left: 150,
         top: 0,
         width: 46,
         height: 64
      },
      {
         left: 208,
         top: 0,
         width: 49,
         height: 64
      },
      {
         left: 265,
         top: 0,
         width: 46,
         height: 64
      },
      {
         left: 320,
         top: 0,
         width: 42,
         height: 64
      },
      {
         left: 380,
         top: 0,
         width: 35,
         height: 64
      },
      {
         left: 425,
         top: 0,
         width: 35,
         height: 64
      },
   ],
   sprite = new Sprite('runner', new SpriteSheetPainter(runnerCells)),
   interval,
   lastAdvance = 0,
   paused = false,
   PAGEFLIP_INTERVAL = 100;

// Functions.....................................................

function drawBackground() {
   var STEP_Y = 12,
      i = context.canvas.height;

   while (i > STEP_Y * 4) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
      i -= STEP_Y;
   }
}

function pauseAnimation() {
   animateButton.value = 'Animate';
   paused = true;
}

function startAnimation() {
   animateButton.value = 'Pause';
   paused = false;
   lastAdvance = +new Date();
   window.requestNextAnimationFrame(animate);
}

// Event handlers................................................

animateButton.onclick = function (e) {
   if (animateButton.value === 'Animate') startAnimation();
   else pauseAnimation();
};

// Animation.....................................................

function animate(time) {
   if (!paused) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      context.drawImage(spritesheet, 0, 0);

      sprite.paint(context);

      if (time - lastAdvance > PAGEFLIP_INTERVAL) {
         sprite.painter.advance();
         lastAdvance = time;
      }
      window.requestNextAnimationFrame(animate);
   }
}

// Initialization................................................

spritesheet.src = '../../shared/images/running-sprite-sheet.png';
spritesheet.onload = function (e) {
   context.drawImage(spritesheet, 0, 0);
};

sprite.left = 200;
sprite.top = 100;

context.strokeStyle = 'lightgray';
context.lineWidth = 0.5;

drawBackground();
import Game from "./engine/game.js";

let game = new Game(4);
//game.setupNewGame();
//console.log(game.gameState.board);
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let reset = document.getElementById('reset');
let scoreLabel = document.getElementById('score');
let width = canvas.width / 4 - 6;
update();

reset.onclick = function(){
  game.setupNewGame();
  update();
  }; 

function drawCell(val, x, y) {
  switch (val) {
    case 0: ctx.fillStyle = '#A9A9A9'; break;
    case 2: ctx.fillStyle = '#D2691E'; break;
    case 4: ctx.fillStyle = '#FF7F50'; break;
    case 8: ctx.fillStyle = '#ffbf00'; break;
    case 16: ctx.fillStyle = '#bfff00'; break;
    case 32: ctx.fillStyle = '#40ff00'; break;
    case 64: ctx.fillStyle = '#00bfff'; break;
    case 128: ctx.fillStyle = '#FF7F50'; break;
    case 256: ctx.fillStyle = '#0040ff'; break;
    case 512: ctx.fillStyle = '#ff0080'; break;
    case 1024: ctx.fillStyle = '#D2691E'; break;
    case 2048: ctx.fillStyle = '#FF7F50'; break;
    case 4096: ctx.fillStyle = '#ffbf00'; break;
    default: ctx.fillStyle = '#ff0080';
  }
  ctx.fillRect(x + 5, y + 5, 110, 110);
  if(val){
    ctx.font = width/2 + 'px Helvetica';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
  }
}
function update() {
  ctx.clearRect(0, 0, 500, 500);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      drawCell(game.gameState.board[i * 4 + j], 120 * j, 120 * i);
      // ctx.fillStyle = "#664033";
      ctx.font = "40px monospace";
      ctx.textAlign = "center";
      ctx.fillText(game.gameState.board[i * 4 + j], 60 + 120 * j, 70 + 120 * i);
    }
  }
  if (game.gameState.won) {
    setTimeout(function() {
      ctx.clearRect(0, 0, 500, 500);
      ctx.fillStyle = "rgba(255, 165, 0,1)";
      ctx.fillRect(0, 0, 500, 500);
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("You Won! ", 250, 250);
    }, 800);
  } else if (game.gameState.over) {
    setTimeout(function() {
      ctx.clearRect(0, 0, 500, 500);
      ctx.fillStyle = "##bf6437";
      ctx.fillRect(0, 0, 500, 500);
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("You Lost! ", 250, 250);
    }, 800);
  }
  scoreLabel.innerHTML = 'Score : ' + game.gameState.score;
}

document.onkeydown = function (event) {
        if (event.keyCode === 38 || event.keyCode === 87) {
            game.move("up"); 
        } else if (event.keyCode === 39 || event.keyCode === 68) {
            game.move("right");
        } else if (event.keyCode === 40 || event.keyCode === 83) {
            game.move("down"); 
        } else if (event.keyCode === 37 || event.keyCode === 65) {
            game.move("left"); 
        }
        update();
};

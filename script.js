const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 100,
  y: 300,
  width: 10,
  height: 50,
  color: "white",
  vx: 0,
  speed: 3,
  gravity: 1,
  onGround: false,
};

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayer() {
  player.y += player.gravity;
  player.x += player.vx;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.onGround = true;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();
  drawPlayer();

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") player.vx = player.speed;
  if (e.key === "ArrowLeft") player.vx = -player.speed;
  if (e.key === " " && player.onGround) {
    player.gravity = -12;
    player.onGround = false;
  }
});

document.addEventListener("keyup", () => {
  player.vx = 0;
  player.gravity = 1;
});

gameLoop();

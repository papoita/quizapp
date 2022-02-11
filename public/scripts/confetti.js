/** @type {HTMLCanvasElement} */
//
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

class Particle
{
  constructor(y)
  {
    this.x = (Math.random() * canvas.width);
    this.y = y;
    this.size = (Math.floor(Math.random() * 10)) + 10;
    this.hue = (Math.floor(Math.random() * 360));
    this.gone = false;
    this.degrees = Math.random() < 0.5 ? 0.1 : -0.1;
    this.angle = 0;
    this.rate = (Math.floor(Math.random() * 2)) + 0.5;
  }
  draw()
  {
    ctx.fillStyle = `hsl(${this.hue},50%,50%)`;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillRect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
    ctx.restore();
  }
  update()
  {
    if (this.y > canvas.height)
    {
      particleArray.push(new Particle(-50));
      this.gone = true;
    }
    this.y += this.rate;
    this.angle += this.degrees;
    this.draw();
  }
}

let particleArray = [];

for (var i = 0; i < 400; i++)
{
  particleArray.push(new Particle(
    Math.random() * canvas.height
  ));
}

function animate()
{
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particleArray.length; i++)
  {
    particleArray[i].update();
  }
  particleArray = particleArray.filter(particle => !particle.gone);
}
animate();

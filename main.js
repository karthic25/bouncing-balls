const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min,max) {
	return Math.round(Math.random()*(max-min) + min);
}

function Ball(pos, vel, acc, color, size) {
	this.pos = pos;
	this.vel = vel;
	this.acc = acc;
	this.color = color;
	this.size = size;
}

Ball.prototype.create = function() {
  ctx.beginPath();
  ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
}

let ct = 0;

Ball.prototype.move = function(vec) {
	del_vel_x = Math.cos(vec.radians) * vec.radius;
	del_vel_y = Math.sin(vec.radians) * vec.radius;
	del_vel = {x: del_vel_x, y: del_vel_y};
	
	let ratio_vel = 1.1;
  if ((this.pos.x + this.size) >= width) {
  	this.pos.x = width - this.size;
  	this.vel.x = -(this.vel.x/ratio_vel);
    this.vel.y = this.vel.y/ratio_vel;
  }

  if ((this.pos.x - this.size) <= 0) {
  	this.pos.x = this.size;
  	this.vel.x = -(this.vel.x/ratio_vel);
    this.vel.y = this.vel.y/ratio_vel;
  }

  if ((this.pos.y + this.size) >= height) {
  	this.pos.y = height - this.size;
  	this.vel.y = -(this.vel.y)/ratio_vel;
    this.vel.x = this.vel.x/ratio_vel;
  }

  if ((this.pos.y - this.size) <= 0) {
  	this.pos.y = this.size;
	  this.vel.y = -(this.vel.y/ratio_vel);
    this.vel.x = this.vel.x/ratio_vel;
  }

  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;
  this.vel.x += del_vel.x;
  this.vel.y += del_vel.y;
}

let balls = [];
let colors = ['#90a4ae', '#546e7a', '#ff6e40', '#ff7043', '#8d6e63', '#4e342e', '#ffb74d', '#ef6c00', '#ffd54f', '#ffa000', '#f9a825', '#eeff41', '#afb42b', '#d4e157', '#8bc34a', '#4caf50', '#1b5e20', '#00bfa5', '#00e5ff', '#80d8ff', '#4db6ac', '#80deea', '#039be5', '#b3e5fc', '#2196f3', '#5c6bc0', '#ce93d8', '#f48fb1', '#ff80ab', '#ff5252', '#ef5350'];
let i=0;
while (balls.length < 50) {
  let size = 4;
  let ball = new Ball(
    {x: random(size,width - size), y: random(size,height - size)},
    {x: random(-5,5), y: random(-5,5)},
    0,
    colors[random(10, 20)],
    size
  );
  balls.push(ball);
}

let angle = (2*Math.PI*document.getElementById("gravity_angle").value*40)/360;

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

	angle = (2*Math.PI*document.getElementById("gravity_angle").value)/360;
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].create();
    balls[i].move({'radius': balls[i].acc, 'radians': angle});
  }

  requestAnimationFrame(loop);
}

loop();

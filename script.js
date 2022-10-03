const body = document.querySelector('body'); //body
const main = document.querySelector('main'); //Main
let ball = document.querySelectorAll('body div'); //array of divs
let sound = document.getElementById('first');
let audio = document.getElementById('denied');
let button = document.getElementById('play-button');

// Holds the position of the balls
let x_loc = [body.offsetWidth / 2 - 51];
let y_loc = [body.offsetHeight / 2 - 51];

ball[0].style.left = `${[x_loc[0]]}px`;
ball[0].style.top = `${y_loc[0]}px`;

//Holds the speed of the ballls
let x = [1];
let y = [1];

ball[0].addEventListener('mouseover', function (element) {
  generate_ball();
});

function generate_ball() {
  const new_div = document.createElement('div');
  body.appendChild(new_div);
  ball = document.querySelectorAll('body div');

  let last = ball.length - 1;

  ball[last].style.top = `${y_loc[0]}px`;
  ball[last].style.left = `${x_loc[0]}px`;

  x_loc[last] = x_loc[0];
  y_loc[last] = y_loc[0];

  // Random speed and direction for the first ball
  x[0] = rand(3) + 0.5;
  y[0] = rand(3) + 0.5;

  if (Math.floor(Math.random() * 2)) y[0] *= -1;
  if (Math.floor(Math.random() * 2)) x[0] *= -1;

  ball[0].style.transform = `rotate(${rand(360)}deg)`;

  // Random speed and direction for the last ball
  x[last] = rand(3) + 0.5;
  y[last] = rand(3) + 0.5;

  if (Math.floor(Math.random() * 2)) x[last] *= -1;
  if (Math.floor(Math.random() * 2)) y[last] *= -1;

  ball[last].style.transform = `rotate(${rand(360)}deg)`;
}

setInterval(() => {
  for (let i = 0; i < ball.length; i++) run(i);
  if (ball.length != 1) main.innerHTML = ball.length - 1;
  if (main.innerHTML % 10 == 0) document.getElementById('score').play();
}, 10);

function run(i) {
  if (y_loc[i] + y[i] <= 0) {
    y[i] = rand(3) + 0.5;
  }
  if (y_loc[i] + y[i] >= body.offsetHeight - 51) {
    y[i] = -rand(3) - 0.5;
    // y_loc[i]=body.offsetHeight-51;
  }
  if (x_loc[i] + x[i] >= body.offsetWidth - 51) {
    x[i] = -rand(3) - 0.5;
    // x_loc[i]=body.offsetWidth-51;
  }
  if (x_loc[i] + x[i] <= 0) {
    x[i] = +rand(3) + 0.5;
  }
  y_loc[i] += y[i];
  x_loc[i] += x[i];
  ball[i].style.top = `${y_loc[i]}px`;
  ball[i].style.left = `${x_loc[i]}px`;
}

function rand(ele) {
  return Math.ceil(Math.random() * 2 * ele) / 2;
}

sound.addEventListener('mouseenter', () => {
  document.getElementById('enter').play();
});

button.addEventListener('click', function () {
  document.getElementById('enter').play();
  document.getElementById('music').play();
  document.getElementById('score').volume = 5.0;
});

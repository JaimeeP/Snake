'use strict';
let event = 'up'
let direction = 'up';
const start = 'z8s8';
let headposnew = start;
let x = start.slice(3);
let y = start.slice (1,2);
let hy
let hx
let snakehead
let snakebodyX = 232
let snakebody
let snakebodylast = 236
let snakebodylaststep1
let foodpos 
let newcount = 0
let Score = 3
let numx 
let numy
let sneklength = 29
let Up = 1, Left = 0, Right = 0, Down = 0;
let movetime = 0
let gamespeed = 200;
let gamespeedfieldpersecond = 1000 / gamespeed;
let gamestarted = 0;
let second = 1000;
let dorito 

var timedID
var xs

document.addEventListener('DOMContentLoaded', function() {document.getElementById('gamespeedcurrent').innerHTML = gamespeedfieldpersecond + ' Felder pro Sekunde'; 
document.getElementById("Score").innerHTML = "Score: " + sneklength; })

document.addEventListener('keydown', startgamewithenter);
function startgamewithenter (event) {
  if (
     event.key === 'Enter' 
  || event.key === 'ArrowLeft' 
  || event.key === 'ArrowUp' 
  || event.key === 'ArrowRight' 
  || event.key === 'ArrowDown'
     )
  {startgame()}
}
  
function startgame() {
  if (gamestarted === 0) {move(); gamestarted++}
}



function gameSpeed(dorito) {
  clearInterval(timedID)
  if (dorito === 'high') {gamespeedfieldpersecond++}
  if (dorito === 'low')  {gamespeedfieldpersecond--}
  if (sneklength == '30' && xs === undefined) {gamespeedfieldpersecond = gamespeedfieldpersecond * 1.2; xs = 1}
  if (sneklength == '60' && xs === 1) {gamespeedfieldpersecond = gamespeedfieldpersecond * 1.2;  xs++}
  if (sneklength == '90' && xs === 2) {gamespeedfieldpersecond = gamespeedfieldpersecond * 1.10;  xs++}
  gamespeed = second / gamespeedfieldpersecond;
  if (gamespeedfieldpersecond <= 0) {document.getElementById('gamespeedcurrent').innerHTML = "ZOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOM"} else {
  document.getElementById('gamespeedcurrent').innerHTML = gamespeedfieldpersecond + " Felder pro Sekunde";}
  timedID = setInterval(timed, gamespeed);
}

function foodregenerate() {
  if(headposnew == foodpos) { document.getElementById(foodpos).classList.remove('snakefood'); foodfunky(); sneklength ++; 
     document.getElementById("Score").innerHTML = "Score: " + sneklength; 
  if(document.getElementById(foodpos).classList.contains('snakebody') === true)
    {document.getElementById(foodpos).classList.remove('snakefood'); foodfunky(); }
}}



document.addEventListener('keydown', yeettakekey);
function yeettakekey(event) {
if (event.key === 'ArrowLeft') {Left = 1; Up = 0; Right = 0; Down = 0; }
if (event.key === 'ArrowUp') {Left = 0; Up = 1; Right = 0; Down = 0; }
if (event.key === 'ArrowRight') {Left = 0; Up = 0; Right = 1; Down = 0; }
if (event.key === 'ArrowDown') {Left = 0; Up = 0; Right = 0; Down = 1; }
if (movetime >= gamespeed) {yeetmove(); movetime = 0;}
}

function yeetmove() {
if (Left === 1 && direction !== 'right') {direction = 'left'}
if (Up === 1 && direction !== 'down') {direction = 'up'}
if (Right === 1 && direction !== 'left') {direction = 'right'}
if (Down === 1 && direction !== 'up') {direction = 'down'}
}

function move() {
timedID = setInterval(timed, gamespeed);
foodfunky();
foodregenerate(setInterval(foodregenerate, 1));
}

function timed() {
movetime = movetime + gamespeed;
newheadpos();
bump(); 
gameSpeed();
}

function newheadpos() {
movecount();
  document.getElementById(headposnew).classList.remove('snakehead');
if (direction === 'left') {x--}  
if (direction === 'up') {y--}
if (direction === 'right') {x++}
if (direction === 'down') {y++}
hy = 'z' + y;
hx = 's' + x;
headposnew = 'z' + y + 's' + x;
verkackt();
document.getElementById(headposnew).classList.add('snakehead');
}

function rngx() { numx = Math.floor(Math.random() * 50+1);}
function rngy() { numy = Math.floor(Math.random() * 50+1);}
function foodfunky() {
rngy();
rngx();
foodpos = 'z' + numy + 's' + numx;
document.getElementById(foodpos).classList.add('snakefood');
}

function movecount() {
  snakebodyX --;
  snakebody = 'snakebody' + snakebodyX;
  snakebodylaststep1 = snakebodyX + sneklength;
  snakebodylast = 'snakebody' + snakebodylaststep1;
  if (newcount >= sneklength) {document.getElementsByClassName(snakebodylast)[0].classList.remove(snakebodylast, 'snakebody')}
document.getElementById(headposnew).classList.add(snakebody)
document.getElementById(headposnew).classList.add('snakebody')
if (newcount < sneklength) {newcount++;}
}

function bump() {
if (document.getElementById(headposnew).classList.contains('snakebody') === true) {alert('Verloren');location.reload();}

}
function verkackt() {
if (hy == 'z0' || hy === 'z51' || hx == 's0' || hx === 's51') {alert('Verloren');location.reload();} 
if (sneklength >= 120) {alert('You are winner')}
} 
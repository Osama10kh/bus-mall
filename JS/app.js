'use strict';

//array for img
let imgArray = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

let clicksNumber = 0;
let leftImgClicks = 0;
let rightImgClicks = 0;
let medImgClicks = 0;


// random function
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//constructor object for img product
function BusMall(nameOfProduct) {

  this.nameOfProduct = nameOfProduct;
  this.pathImg = `./img/${nameOfProduct}.split`;
  this.shownImg = 0;
  this.timesOfClicks = 0;

  BusMall.all.push(this);
  console.log(this.pathImg);
}

BusMall.all = [];

// make ojbects for imgproduct from BusMall

for (let i = 0; i < imgArray.length; i++) {
  new BusMall(imgArray[i]);
}

//get element by id
const imgSection = document.getElementById('imgID');
const leftImg = document.getElementById('leftImg');
const medImg = document.getElementById('medImg');
const rightImg = document.getElementById('rightImg');
const ulElement = document.getElementById('ul');
const buttonElement = document.getElementById('button');


//render images
function render() {
  let leftNumber = random(0, imgArray.length - 1);
  let rightNumber;
  let medNumber;

  do {
    rightNumber = random(0, imgArray.length);
  } while (rightNumber === leftNumber);

  do {
    medNumber = random(0, imgArray.length);
  } while (medNumber === rightNumber);

  leftImg.src = BusMall.all[leftNumber].img;
  rightImg.src = BusMall.all[rightNumber].img;
  medImg.src = BusMall.all[medNumber].img;

  leftImgClicks = leftNumber;
  rightImgClicks = rightNumber;
  medImgClicks = medNumber;

  BusMall.all[leftNumber].shownImg++;
  BusMall.all[rightNumber].shownImg++;
  BusMall.all[medNumber].shownImg++;
}

//render result
function renderResult() {
  for (let x = 0; x < imgArray.length; x++) {
    let liElement = document.createElement('li');
    ulElement.appendChild(liElement);
    liElement.textContent = `${imgArray[x]}:${clicksNumber}`;
  }
}

// events
function busMallEvent(event) {
  if ((event.target.id === 'leftImg' || event.target.id === 'rightImg' || event.target.id === 'medImg') && clicksNumber < 25) {

    if (event.target.id === 'leftImg') {
      BusMall.all[leftImgClicks].timesOfClicks++;
    }

    if (event.target.id === 'rightImage') {
      BusMall.all[rightImgClicks].timesOfClicks++;
    }

    if (event.target.id === 'medImg') {
      BusMall.all[medImgClicks].timesOfClicks++;
    }

    clicksNumber++;
    render();

  } else {
    console.log(BusMall.all);
  }
}

imgSection.addEventListener('click', busMallEvent);
render();

buttonElement.addEventListener('click');
renderResult();

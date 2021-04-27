'use strict';

//array for img
let imgArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'];

let clicksArr = [];
let shownArr = [];

let clicksNumber = 0;
let leftImgClicks = 0;
let rightImgClicks = 0;
let medImgClicks = 0;
let voteClicks = 25;


// random function
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//constructor object for img product
function BusMall(nameOfProduct) {

  this.nameOfProduct = nameOfProduct.split('.')[0];
  this.img = `./img/${nameOfProduct}`;
  this.shownImg = 0;
  this.timesOfClicks = 0;

  BusMall.all.push(this);
  console.log(this.img.length);
}

BusMall.all = [];

// make ojbects for imgproduct from BusMall

for (let i = 0; i < imgArray.length; i++) {
  new BusMall(imgArray[i]);
}

//get element by id
const imgID = document.getElementById('imgID');
const leftImg = document.getElementById('leftImg');
const medImg = document.getElementById('midImg');
const rightImg = document.getElementById('rightImg');
const button = document.getElementById('button');
const ul = document.getElementById('ul');


//render images
function renderimg() {
  let leftNumber = random(0, imgArray.length - 1);
  let medNumber;
  let rightNumber;

  do {
    medNumber = random(0, imgArray.length - 1);
    rightNumber = random(0, imgArray.length - 1);
  } while (rightNumber === leftNumber || medNumber === rightNumber || medNumber === leftNumber);

  leftImg.src = BusMall.all[leftNumber].img;
  rightImg.src = BusMall.all[rightNumber].img;
  medImg.src = BusMall.all[medNumber].img;

  leftImgClicks = leftNumber;
  rightImgClicks = rightNumber;
  medImgClicks = medNumber;

  BusMall.all[leftNumber].shownImg++;
  BusMall.all[rightNumber].shownImg++;
  BusMall.all[medNumber].shownImg++;

  for (let i = 0; i < imgArray.length; i++) {
    shownArr[i] = BusMall.all.shownImg;

  }


}


// events
function busMallEvent(event) {
  if ((event.target.id === 'leftImg' || event.target.id === 'rightImg' || event.target.id === 'medImg') && clicksNumber < voteClicks) {

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
    renderimg();

    for (let i = 0; i < imgArray.length; i++) {
      clicksArr[i] = BusMall.all.timesOfClicks;

    }



  } else {
    renderChart();
  }
}

imgID.addEventListener('click', busMallEvent);
renderimg();



function renderChart() {


  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: imgArray,
      datasets: [{
        label: 'Votes',
        data: clicksArr,
        backgroundColor:
          'rgba(255, 99, 132, 0.2)',
        borderColor:
          'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }, {
        label: 'shown',
        data: shownArr,
        backgroundColor:
          'rgba(300, 200, 100, 0.2)',
        borderColor:
          'rgba(300, 200, 100, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

localStorage.setItem('items', JSON.stringify(BusMall.all));

function renderData() {
  ul.innerHTML = '';
  for (let i = 0; i < BusMall.all.length; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);

    li.textContent = BusMall.all[i];
  }
}

function getData() {
  let data = JSON.parse(localStorage.getItem('ul'));
  if (data) {
    for (let i = 0; i < data.length; i++) {
      new BusMall(data[i].nameOfProduct, data[i].clicksArr, data[i].shownArr);
    }
    renderData();
  }
}

getData();

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
const imgSection = document.getElementById('imgID');
const leftImg = document.getElementById('leftImg');
const medImg = document.getElementById('midImg');
const rightImg = document.getElementById('rightImg');
//const buttonElement = document.getElementById('button');


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

  } else {
    renderChart();
  }
}

imgSection.addEventListener('click', busMallEvent);
renderimg();


function renderChart() {

  let clicks = [];
  let names = [];
  let shown = [];
  for( let i = 0; i < BusMall.all.length; i++ ) {
    clicks.push( BusMall.all[i].clicks );
    names.push( BusMall.all[i].name );
    shown.push( BusMall.all[i].shown );

  }

  let ctx = document.getElementById( 'theChart' ).getContext( '2d' );
  let theChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Votes',
        data: clicks,
        backgroundColor:
          'rgba(255, 99, 132, 0.2)',
        borderColor:
          'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }, {
        label: 'shown',
        data: shown,
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
  } );

}


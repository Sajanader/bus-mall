var names = [{name:'bag', ext:'jpg'}, {name:'banana', ext:'jpg'}, {name:'bathroom', ext:'jpg'}, {name:'boots', ext:'jpg'},
{name:'breakfast', ext:'jpg'} , {name:'bubblegum', ext:'jpg'},{name:'chair', ext:'jpg'},{name: 'cthulhu', ext:'jpg'}, {name:'dog-duck', ext:'jpg'}, 
 {name:'dragon', ext:'jpg'}, {name:'pen', ext:'jpg'}, {name:'pet-sweep', ext:'jpg'}, {name:'scissors', ext:'jpg'}, {name:'shark', ext:'jpg'},
{name:'sweep', ext:'png'} , {name:'tauntaun', ext:'jpg'} , {name:'unicorn', ext:'jpg'}, {name:"usb", ext:'gif'},
{name:'water-can', ext:'jpg'}, {name:'wine-glass', ext:'jpg'}];

let leftImageEl = document.getElementById('left-image');
let rightImageEl = document.getElementById('right-image');
let centerImageEl = document.getElementById('center-image');
let rounds= 0;
function Product(name,ext) {
    this.name = name;
    this.path = `images/${name}.${ext}`;
    this.show = 0;
    this.clicks=0;
    Product.all.push(this);
}
Product.all = [];
for (let i = 0; i < names.length; i++) {
    new Product(names[i].name,names[i].ext);
    console.log(Product.all[i]);
}
function render() {
    let leftIndex = randomNumber(0, Product.all.length - 1);
    let centerIndex = randomNumber(0, Product.all.length - 1);
    let rightIndex = randomNumber(0, Product.all.length - 1);

    while( leftIndex=== centerIndex || leftIndex ===rightIndex ||rightIndex === centerIndex){
         leftIndex = randomNumber(0, Product.all.length - 1);
         centerIndex = randomNumber(0, Product.all.length - 1);
         rightIndex = randomNumber(0, Product.all.length - 1);
    }
    
    leftImageEl.src = Product.all[leftIndex].path;
    rightImageEl.src = Product.all[centerIndex].path;
    centerImageEl.src = Product.all[rightIndex].path;
    leftImageEl.title = Product.all[leftIndex].name;
    centerImageEl.title = Product.all[centerIndex].name;
    rightImageEl.title = Product.all[rightIndex].name;

    Product.all[leftIndex].show++;
    Product.all[centerIndex].show++;
    Product.all[rightIndex].show++;
    rounds++;
  
}
 
    let images = document.getElementById('images');
    images.addEventListener('click', clickHandler);
    function clickHandler(event) {
    if (event.target.id !== "images"){
        if (rounds <=25){
         render();
     }
     else{
         images.removeEventListener('click', clickHandler);
         (function renderList(){
              finalResult();
         })();
         chart();
 }
       for (let i = 0; i < Product.all.length; i++) {
        if (Product.all[i].name === event.target.title)
           Product.all[i].clicks++;
       }
    }

  }

  function finalResult() {
    var articleEl= document.getElementById('result');
    var unorderdlistEL = document.createElement('ul');
     articleEl.appendChild(unorderdlistEL);
    for (var i = 0; i <Product.all.length; i++) {
    var listLE = document.createElement('li');
    listLE.appendChild(unorderdlistEL);
    listLE.textContent =  `${Product.all[i].name} had ${Product.all[i].clicks} votes and was shown ${Product.all[i].show} times`;
    console.log(`${Product.all[i].name} had ${Product.all[i].clicks} votes and was shown ${Product.all[i].show} times`);
    
    }
return;} 

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function chart(){
var ctx = document.getElementById('myChart');
var names = [];
var clicks = [];
var show= [];
for (var i = 0; i < Product.all.length; i++) {
  names.push(Product.all[i].name);
    clicks.push(Product.all[i].clicks);
    show.push(Product.all[i].show);
}
var results= new Chart(ctx, {
    type: 'bar',
    data: {
        labels: names,
        datasets: [{
    label: '# of Views',
    data: show,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});}
render();
// create an object has two variable properties 

var names =
    [{ name: 'bag', ext: 'jpg' },
    { name: 'banana', ext: 'jpg' },
    { name: 'bathroom', ext: 'jpg' },
    { name: 'boots', ext: 'jpg' },
    { name: 'breakfast', ext: 'jpg' },
    { name: 'bubblegum', ext: 'jpg' },
    { name: 'chair', ext: 'jpg' },
    { name: 'cthulhu', ext: 'jpg' },
    { name: 'dog-duck', ext: 'jpg' },
    { name: 'dragon', ext: 'jpg' },
    { name: 'pen', ext: 'jpg' },
    { name: 'pet-sweep', ext: 'jpg' },
    { name: 'scissors', ext: 'jpg' },
    { name: 'shark', ext: 'jpg' },
    { name: 'sweep', ext: 'png' },
    { name: 'tauntaun', ext: 'jpg' },
    { name: 'unicorn', ext: 'jpg' },
    { name: "usb", ext: 'gif' },
    { name: 'water-can', ext: 'jpg' },
    { name: 'wine-glass', ext: 'jpg' }];

let leftImageEl = document.getElementById('left-image');
let centerImageEl = document.getElementById('center-image');
let rightImageEl = document.getElementById('right-image');
let sectionEl = document.getElementById("images");
showPreviousProduct = [];
let rounds = 0;
function Product(name, ext) {
    this.name = name;
    this.path = `images/${name}.${ext}`;
    this.show = 0;
    this.clicks = 0;
    Product.all.push(this);
}
Product.all = [];
for (let i = 0; i < names.length; i++) {
    new Product(names[i].name, names[i].ext);
}
// set Item in local storage
    function setProducts() {
        var x = JSON.stringify(Product.all);
        localStorage.setItem('order', x);
     
    }
// get item from local storage
function getProducts() {
    var z= localStorage.getItem('order');
    if (z){  Product.all= JSON.parse(z);}           
     }
    //  create function render that display three images.
function render() {
    let leftIndex = randomNumber(0, Product.all.length - 1);
    let centerIndex = randomNumber(0, Product.all.length - 1);
    let rightIndex = randomNumber(0, Product.all.length - 1);
    while (leftIndex === centerIndex || leftIndex === rightIndex || rightIndex === centerIndex || showPreviousProduct.includes(leftIndex) ||
        showPreviousProduct.includes(centerIndex) || showPreviousProduct.includes(rightIndex)) {
        leftIndex = randomNumber(0, Product.all.length - 1);
        centerIndex = randomNumber(0, Product.all.length - 1);
        rightIndex = randomNumber(0, Product.all.length - 1);
    }
     // showPreviousProduct.push(leftIndex, centerIndex, rightIndex);
    console.log(showPreviousProduct);
    leftImageEl.src = Product.all[leftIndex].path;
    centerImageEl.src = Product.all[centerIndex].path;
    rightImageEl.src = Product.all[rightIndex].path;
    leftImageEl.title = Product.all[leftIndex].name;
    centerImageEl.title = Product.all[centerIndex].name;
    rightImageEl.title = Product.all[rightIndex].name;

    Product.all[leftIndex].show++;
    Product.all[centerIndex].show++;
    Product.all[rightIndex].show++;

}
// add event listener when click and choose one images.
sectionEl.addEventListener('click', clickHandler);
function clickHandler(event) {
    // the clicks must be clicked on images just not in the section outside images.
    if (event.target.id !== "images") {
        rounds++
        // number of rounds are 25 times.
        if (rounds < 25) {
            for (let i = 0; i < Product.all.length; i++) {
                if (event.target.title === Product.all[i].name) {
                    Product.all[i].clicks++;
                         
                }
            }
            render();
        }
        else {
            sectionEl.removeEventListener('click', clickHandler);
            finalResult();
            chart();
            setProducts();
                                 
        }
    }
}
// create a list which has number of votes and number of images' view.
function finalResult() {
    var articleEl = document.getElementById('result');
    sectionEl.appendChild(articleEl);
    var unorderdlistEL = document.createElement('ul');
    articleEl.appendChild(unorderdlistEL);
    for (var i = 0; i < Product.all.length; i++) {
        var listEL = document.createElement('li');
        unorderdlistEL.appendChild(listEL);
        listEL.textContent = `${Product.all[i].name} had ${Product.all[i].clicks} votes and was shown ${Product.all[i].show} times`;
        console.log(`${Product.all[i].name} had ${Product.all[i].clicks} votes and was shown ${Product.all[i].show} times`);

    }
}


//  create function to choose the displayed images randomly.
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
render();
// create chart to show the previous listed results by chart
function chart() {
    var ctx = document.getElementById('myChart');
    var names = [];
    var clicks = [];
    var show = [];
    for (var i = 0; i < Product.all.length; i++) {
        names.push(Product.all[i].name);
        clicks.push(Product.all[i].clicks);
        show.push(Product.all[i].show);
    }
    var results = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: '# of Views',
                data: show,
                backgroundColor: [
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',
                    '#64e45f',

                ],
                borderColor: [

                ],
                borderWidth: 1
            },
            {
                label: '# of Clicks',
                data: clicks,
                backgroundColor: [
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',
                    ' rgb(16, 158, 240)',



                ],
                borderColor: [
                ],
                borderWidth: 1
            },
            ],
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
    });
}
getProducts();
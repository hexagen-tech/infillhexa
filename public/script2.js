document.getElementById('range_input').addEventListener("input", function() {
  $('.product_div').hide();
  $('.product_div')[((document.getElementById('range_input').value)/13)-1].style.display="block";
}, false);
// Reference the color shape that was drawn over the image
const overlay = document.querySelectorAll(".colour1");

const overlay1 = document.querySelectorAll(".colour2");

const overlay2 = document.querySelectorAll(".colour3");

const overlay3 = document.querySelectorAll(".colour4");



function changeColor(picker) {
// Set the fill style
for (i=0;i<overlay.length;i++){
  overlay[i].style.fill=picker.toHEXString();
}  
}

function changeColor1(picker) {
// Set the fill style
for (i=0;i<overlay1.length;i++){
  overlay1[i].style.fill=picker.toHEXString();
} 
}

function changeColor2(picker) {
// Set the fill style
for (i=0;i<overlay2.length;i++){
  overlay2[i].style.fill=picker.toHEXString();
} 
}

function changeColor3(picker) {
// Set the fill style
for (i=0;i<overlay3.length;i++){
  overlay3[i].style.fill=picker.toHEXString();
} 
}

// Reference the SVG
const svg = document.querySelector(".product-svg");

// Reference the image
const img = document.querySelector(".background-image");

// Place the SVG inside a parent div, reference it
const product_div = document.querySelector(".product_div");

// (On resize)
window.onresize = () => simulateCover(product_div, svg, img, 1920, 1280);

// (On load)
simulateCover(product_div, svg, img, 1920, 1280);

// Pass the parent div, and the SVG (child)
// Pass the image
// x and y are the native dimensions of the image (1920, 1280 in our example)
function simulateCover(parent, child, image, x, y) {
let { width, height } = parent.getBoundingClientRect();
let yPercentage = x / y;
let xPercentage = y / x;

// Set styles, these can be moved to CSS if need be
parent.setAttribute("style", "position: relative; overflow: hidden;");

// child.setAttribute(
//   "style",
//   "display: block; position: relative; top: 50%; left: 50%; transform: translate(-50%, -50%)"
// );

// image.setAttribute(
//   "style",
//   "display: block; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
// );

if (width < height * yPercentage) {
  child.style.width = height * yPercentage + "px";
  child.style.height = height + "px";
  
  image.style.width = height * yPercentage + "px";
  image.style.height = height + "px";

} else {
  child.style.width = width + "px";
  child.style.height = width * xPercentage + "px";
  
  image.style.width = width + "px";
  image.style.height = width * xPercentage + "px";
  
  
}
}
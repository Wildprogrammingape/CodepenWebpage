// prompt button
function dochange(){
  alert('button clicked with Javascript function');
}

// change color function
function changecolor(){
  var divElement1 = document.getElementById("div1");
  var divElement2 = document.getElementById("div2");
  divElement1.className = "blueback";
  divElement2.className = "orangeback";
}

// change text function
function changeText(){
  var divElement1 = document.getElementById("div1");
  var divElement2 = document.getElementById("div2");
  divElement1.innerHTML = "div one changed";
  divElement2.innerHTML = "div two changed";
}

// do magenta
function domagenta(){
  var canvas = document.getElementById("canvas1");
  canvas.style.backgroundColor="magenta";
  var context = canvas.getContext("2d");
  
  context.fillStyle = "yellow";
  context.fillRect(10,10,60,60);
  context.fillRect(80,10,60,60);
  
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText("Hello",15,45);
  context.fillText("there",85,45);
}

//do blue
function doblue(){
  var canvas = document.getElementById("canvas2");
  canvas.style.backgroundColor="blue";
  
  var context = canvas.getContext("2d");
  
  context.fillStyle = "white";//white rectangle
  context.fillRect(10,10,60,60);
  context.fillRect(80,10,60,60);
  
  context.fillStyle = "black";//black font
  context.font = "20px Arial";
  context.fillText("Hello",15,45);
  context.fillText("again",85,45);
}

//color picker
function docolor(){
  var canvas = document.getElementById("canvas3");  //for canvas
  var colorinput = document.getElementById("clr"); // for color picker
  var color = colorinput.value;
  canvas.style.backgroundColor = color;
}

//slider input
function dosquare(){
  
  var canvas = document.getElementById("canvas3");
  var context = canvas.getContext("2d");
  var sizeinput = document.getElementById("slider");
  var size = sizeinput.value;
  context.clearRect(0,0,canvas.width,canvas.height);//remove the rectangle when the slider goes on or the function goes over 
  context.fillStyle = "yellow";
  context.fillRect(10,10,size,size);
}

//upload image

//Global variable "image" -- for both upload() and makeGray() to use

var image;

function upload(){
  //get input from text input
  var fileinput = document.getElementById("finput");
  var imgcanvas = document.getElementById("canv");
  
  //create the selected image
  image = new SimpleImage(fileinput);
  // show on the canvas
  image.drawTo(imgcanvas);
}

//make Grayscale

function makeGray(){
  for (var pixel of image.values()){
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  var imgcanvas = document.getElementById("canv");
  image.drawTo(imgcanvas);
}

//Green Screen

var fgImage = null;
var bgImage = null;

var fgcanvas;
var bgcanvas;  // for clearcanvas() use later on
//load Foreground image
function loadForegroundImage(){
  //get input from text input
  var fileinput = document.getElementById("foreinput");
  fgcanvas = document.getElementById("canvf");
  
  //create the selected image
  fgImage = new SimpleImage(fileinput);
  // show on the canvas
  fgImage.drawTo(fgcanvas);
}

//load Background image
function loadBackgroundImage(){
  //get input from text input
  var fileinput = document.getElementById("backinput");
  bgcanvas = document.getElementById("canvb");
  
  //create the selected image
  bgImage = new SimpleImage(fileinput);
  // show on the canvas
  bgImage.drawTo(bgcanvas);
}



//Do GreenScreen Algorithm
function doGreenScreen(){
  // error check before compositing
  if (fgImage == null || !fgImage.complete()){
    alert("foreground not loaded yet");
    return;
  }
  if (bgImage == null || !bgImage.complete()){
    alert("background not loaded yet");
  } 
  // do green screen algorithm
  var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  for (var pixel of fgImage.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()){
      var bgPixel = bgImage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else{
      output.setPixel(x,y,pixel);
    }
  }
  clearCanvas(); // clear canvas before showing new canvas
  output.drawTo(fgcanvas);  // draw to canvas
}



//clear canvas
function doClear(canvas){
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

//clear two canvases
function clearCanvas(){
  doClear(fgcanvas);
  doClear(bgcanvas);
}
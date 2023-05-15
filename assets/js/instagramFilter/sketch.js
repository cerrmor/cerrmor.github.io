//variable for holding the current filter call
var filter;
//these two veriables store the initial mouse location for the radial blur filter
//the variables are updated everytime the mouse is clicked on the origional color
//image
var xmouse = 384;
var ymouse = 206;


// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("../../images/instagramFil/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height+150);
    instructionMenu();
    filter = earlyBirdFilter(imgIn);
    keyCode = 32; 
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(255);
    
    image(instructionMenu(), width/4,height-150);
    
    image(imgIn, 0, 0);

    image(filter, imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed()
{
  if(mouseX <= imgIn.width && mouseX >= 0 && mouseY <= imgIn.height && mouseY >= 0)
  {
    xmouse = mouseX;
    ymouse = mouseY;
    if(keyCode == 32 || keyCode == 66) 
    {
      if(keyCode == 32) filter = earlyBirdFilter(imgIn);
      if(keyCode == 66) filter = radialBlurFilter(imgIn);
    }
  }
  loop();
}

//calls the filter when the key has been released
function keyReleased()
{
  if(keyCode == 32) filter = earlyBirdFilter(imgIn); 
  else if (keyCode == 67) filter = sepiaFilter(imgIn);
  else if (keyCode == 86) filter = darkCorners(imgIn);
  else if (keyCode == 66) filter = radialBlurFilter(imgIn);
  else if (keyCode == 78) filter = borderFilter(imgIn);

  loop();
}
/////////////////////////////////////////////////////////////////
//draws the instructions to the canvas
function instructionMenu()
{
  var instruction = createGraphics(imgIn.width, 150);
  instruction.background(255);
  instruction.fill(125);
  instruction.stroke(0,255,0);
  instruction.rect(0,0,instruction.width,instruction.height,20);
  instruction.fill(255);
  instruction.stroke(0);
  instruction.textSize(15);
  instruction.text("Welcome to the Instagram Filter app",10,20);
  instruction.text("Button Controls:\n Spacebar = Earlybird Filter\n C = Sepia Filter\n V = Dark Courners filter\n B = Radial Blur Filter\n N = Border Filter",10,45);
  instruction.text("Note:\nWhen using the Radial Blur Filter or Earlybird Filter,\nclick the section on the origional color image you want shown \nas the focal point.",300,50);

  return instruction;
}

/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(img.width, img.height);
  resultImg = sepiaFilter(img);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}

/////////////////////////////////////////////////////////////////
function sepiaFilter(img)
{
  var imgOut = createImage(img.width, img.height)
  imgOut.loadPixels();
  img.loadPixels();

  for(var x = 0; x < img.width; x++)
  {
      for(var y = 0; y < img.height; y++)
      {
          var index = ((img.width * y) + x) * 4;

          var r = img.pixels[index + 0];
          var g = img.pixels[index + 1];
          var b = img.pixels[index + 2];
          
          var newRed = (r * .393) + (g *.769) + (b * .189)
          var newGreen = (r * .349) + (g *.686) + (b * .168)
          var newBlue = (r * .272) + (g *.534) + (b * .131)
          
          imgOut.pixels[index + 0] = newRed;
          imgOut.pixels[index + 1] = newGreen;
          imgOut.pixels[index + 2] = newBlue;
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

/////////////////////////////////////////////////////////////////
function darkCorners(img)
{
  var dynLum;
  var imgOut = createImage(img.width, img.height)
    imgOut.loadPixels();
    img.loadPixels();

    for(var x = 0; x < img.width; x++)
    {
        for(var y = 0; y < img.height; y++)
        {
            var index = ((img.width * y) + x) * 4;

            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            var d = dist(img.width/2,img.height/2,x,y);

            if(d < 300)
            {
              r = r * 1;
              g = g * 1;
              b = b * 1;
            } 
            else if(d >= 300 && d < 450)
            {
              d = constrain(d, 300, 450)
              dynLum = map(d,300,450,1,0.4);
              
              r = r * dynLum;
              g = g * dynLum;
              b = b * dynLum;
            }
            else
            {
              d = constrain(d, 450, 515)
              dynLum = map(d,450,515,0.4,0);
              
              r = r * dynLum;
              g = g * dynLum;
              b = b * dynLum;
            }

            imgOut.pixels[index + 0] = r;
            imgOut.pixels[index + 1] = g;
            imgOut.pixels[index + 2] = b;
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

/////////////////////////////////////////////////////////////////
function radialBlurFilter(img)
{
    var imgOut = createImage(img.width, img.height)
    var matrixSize = matrix.length;
    var dynBlur;

    imgOut.loadPixels();
    img.loadPixels();

    for(var x = 0; x < img.width; x++)
    {
        for(var y = 0; y < img.height; y++)
        {
            var index = ((img.width * y) + x) * 4;

            var d = dist(x,y,xmouse,ymouse);

            if(d < 100) dynBlur = 0;
            else if(d >= 100 && d <= 300)
            {
              d = map(d,100,300,0,1);
              dynBlur = constrain(d,0,1);
            }
            else dynBlur = 1;

            var c = convolution(x, y, matrix, matrixSize, img);

            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];

            imgOut.pixels[index + 0] = c[0]*dynBlur + r*(1-dynBlur);
            imgOut.pixels[index + 1] = c[1]*dynBlur + g*(1-dynBlur);
            imgOut.pixels[index + 2] = c[2]*dynBlur + b*(1-dynBlur);
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}

/////////////////////////////////////////////////////////////////
function convolution(x, y, matrix, matrixSize, img)
{
    var totalRed = 0;
    var totalGreen = 0;
    var totalBlue = 0;

    var offset = floor(matrixSize/2);

    for(var i = 0; i < matrixSize; i++)
    {
        for(var j = 0; j < matrixSize; j++)
        {
            var xLoc = x + i - offset
            var yLoc = y + j - offset

            var index = ((img.width * yLoc) + xLoc) * 4;

            index = constrain(index, 0, img.pixels.length - 1);

            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
            
        }
    }
    return [totalRed,totalGreen,totalBlue];
}

/////////////////////////////////////////////////////////////////
function borderFilter(img)
{
  var buffer = createGraphics(img.width, img.height);
  buffer.image(img,0,0);
  buffer.noFill();
  buffer.stroke(255);
  buffer.strokeWeight(20);
  buffer.rect(0+10,0+10,buffer.width-20,buffer.height-20,50);
  buffer.rect(0+10,0+10,buffer.width-20,buffer.height-20);

  return buffer;
}

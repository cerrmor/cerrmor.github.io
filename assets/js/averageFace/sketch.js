var imgs = [];
var avgImg;
var numOfImages = 30;
var averaged = false;
var amt = 1;
var instructions;

var firstImg;
//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for(var i = 0; i < 30; i++)
    {
        imgs[i] = loadImage("../../images/averageFace/"+i+".jpg");
    }
    firstImg = imgs[int(random(0,30))];

}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(firstImg.width*2, firstImg.height);
    
    avgImg = createGraphics(firstImg.width, firstImg.height);
 
    pixelDensity(1);
    
    instructions = createP('Press <em>spacebar</em> for a new random image. Move the mouse within the blue box to transisition between the origional image and the average image.')
    
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(firstImg,0,0);

    pixelData();
        
    avgImage();
  
    //updaetes the pixal data after we have edited it 
    avgImg.updatePixels();

    //draws the origional image to the canvas
    image(avgImg,firstImg.width,0);
    
    //draws the blue rectangle to the canvas
    noFill();
    stroke(0,0,255)
    strokeWeight(3);
    rect(width/2-100,height-25,200,25);
    noLoop();
    
}

function pixelData()
{
    avgImg.loadPixels();
    for(var i = 0; i < numOfImages; i++)
    {
        imgs[i].loadPixels();
    }

}

//generates the average image from the invintory of images
function avgImage()
{
    for (var y = 0; y < firstImg.height; y += 1) 
    {
        for (var x = 0; x < firstImg.width; x += 1) 
        {
            var index = ((firstImg.width*y) + x) * 4;
            
            avgImg.pixels[index +0]=255;
            avgImg.pixels[index +1]=0;
            avgImg.pixels[index +2]=0;
            avgImg.pixels[index +3]=255;
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;
            var sumA = 0;

            for(var i = 0; i < numOfImages;i++)
            {
                sumR += imgs[i].pixels[index];
                sumG += imgs[i].pixels[index + 1];
                sumB += imgs[i].pixels[index + 2];
                sumA += imgs[i].pixels[index + 3];
            }
            sumR = sumR/numOfImages;
            sumG = sumG/numOfImages;
            sumB = sumB/numOfImages;
            sumA = sumA/numOfImages;

            //interpolates the pixal value between the origional image and the averaged image
            avgImg.pixels[index +0] = lerp(firstImg.pixels[index],sumR,amt);
            avgImg.pixels[index +1] = lerp(firstImg.pixels[index + 1],sumG,amt);
            avgImg.pixels[index +2] = lerp(firstImg.pixels[index + 2],sumB,amt);
            avgImg.pixels[index +3] = lerp(firstImg.pixels[index + 3],sumA,amt);
        }
    }
}

//displays a random image from the invintory of images used to generate the average face image
function keyPressed()
{
    if(keyCode == 32)
    {
        firstImg = imgs[int(random(0,30))];
        amt = 1;
        loop();
    }
    return false; 
     
}

//this function is used to track the mouseX position while the mouse is within 
//the blue box on the canvas. This is inorder to cycle between the fully averaged image
//and the origional.
function mouseMoved()
{
    if(mouseX >= width/2 - 100 && mouseX <= width/2 + 100 && mouseY >= height-25 && mouseY <= height)
    {

        amt = map(mouseX,420,604,0.0,1);
   
        averaged = true;
        loop();
    }
    averaged = false;
}

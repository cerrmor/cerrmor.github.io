var boxSize = 50;
var gridWidth = 800;
var gridSize = gridWidth/boxSize;
var boxStep = boxSize;
var distance;
var length;
var confLocs = [];
var confTheta = [];

var freqSlider;
var ampSlider;
var boxSlider;
var freqLabel;
var ampLabel;
var boxLabel;

function setup() 
{
    createCanvas(900, 800, WEBGL);
    angleMode(DEGREES);
    generateConf();

    //creates a slide that contols the frequency of the sine wave
    freqSlider = createSlider(0,4,1,0.5);
    freqSlider.position(10,10);
    freqLabel = createP('<strong>Frequency</strong>');
    freqLabel.position(freqSlider.x * 2 + freqSlider.width,-5);
    
    //creates a slider that controls the size of the amplitude of the sine wave 
    ampSlider = createSlider(0,4,1,0.5);
    ampSlider.position(10,25);
    ampLabel = createP('<strong>Amplitude</strong>');
    ampLabel.position(ampSlider.x * 2 + ampSlider.width,10);
    
    //creates a slider that modifys the width of the boxes creating a more or less 
    //populated grid 
    boxSlider = createSlider(25,100,50)
    boxSlider.position(10,40);
    boxLabel = createP('<strong>Box Sized</strong>');
    boxLabel.position(boxSlider.x * 2 + boxSlider.width,25);

}

function draw() 
{
    if(boxSize != boxSlider.value())
    {
        boxSize = boxSlider.value();
        boxStep = boxSize;
        gridSize = gridWidth/boxSize;
    }
        
    background(100);
  
    pointLight(random(100,200),random(100,200),random(100,255),mouseX- width/2,mouseY- height/2,50);
    pointLight(random(100,200),random(100,200),random(100,255),mouseX- width/2,mouseY- height/2,50);

    confetti();
    
    generateGrid();

    //rotates the camera around the scene
    camera(cos(frameCount*0.3)*gridWidth,-600,sin(frameCount*0.3)*gridWidth,0,0,0,0,1,0);
    
}

//generates the grid of boxes based off the boxstep (width of the box) and the number of
//boxes that can fit within the givin gridwidth 
function generateGrid()
{
    for(var i = -gridSize/2; i < gridSize/2; i++)
    {
        for(var j = -gridSize/2; j < gridSize/2; j++)
        {
            var distance = int(dist(i*boxStep,j*boxStep,0,0))+frameCount;
            
            
            length = map(sin(distance*freqSlider.value())*ampSlider.value(),-1,1,100,300);

            push();
            normalMaterial();
            stroke(0);
            strokeWeight(2);
            translate(i*boxStep,0,j*boxStep);
            box(boxSize,boxSize+length,boxSize);
            pop();

        }
    }
}

//generates the location and angle data for the confetti
function generateConf()
{
    for(var i = 0; i < 200; i++)
    {
        var con = createVector(random(-500,500),random(-800,0),random(-500,500))
        confLocs.push(con);
        confTheta.push(random(0,360)); 
    }
}

//draws the confetti to the scene 
function confetti()
{
    
    for(var i = 0; i < confLocs.length; i++)
    {
        push();
        translate(confLocs[i].x,confLocs[i].y += 1,confLocs[i].z);
        rotateX(confTheta[i] += 10);
        specularMaterial(255,0,0);
        plane(15,15,30,30);
        pop();
        
        if(confLocs[i].y > 0)
        {
            confLocs[i].y = -800;
        }
    }
}
    

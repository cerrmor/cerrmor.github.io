var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;
    
    push();
        translate(width/2, height/2);
        push();
            rotate(radians(speed/3));
            celestialObj(color(255,150,0), 200); // SUN
        pop();  
        
        rotate(radians(speed));
        translate(300,50);
        
        push();
            rotate(radians(speed));
            celestialObj(color(0,0,255), 80); // EARTH     
        pop();
    
        push();
            rotate(radians(-speed*2));
            translate(100,50);
            celestialObj(color(255,255,255), 30); // MOON1 (Small Moon)
        pop();
        push();
            rotate(radians(speed*0.5));
            translate(175,50);
            celestialObj(color(255,255,255), 40); // MOON2 (Big Moon)
            
            push();
                rotate(radians(speed*5));
                translate(10,50);
                celestialObj(color(255,0,255), 20); // ASTEROID
            pop();
        pop();
    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}

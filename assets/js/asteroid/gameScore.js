class GameScore{

    constructor ()
    {
        this.score = 0;
    }

    //draws the display text of score on the screen
    drawScore()
    {
        fill(255);
        textSize(40);
        textAlign(CENTER);
        text("Score: " + this.score, width/14, 100)
    }
    
    //adds + one to the current score
    addToScore()
    {
        this.score += 1;
    }
}
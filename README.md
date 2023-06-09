# Jurassic game

[Click here to see deployed game](https://aturike.github.io/jurassic_game/)

## Description

Basic game for Jurassic Park raptor hunt. It is a 2D game where the main goal is to escape from the island.

## MVP

- Rendered images
- Moveable aim
- Adding random raptors to the canvas
- Raptor damage and death
- Accumulating score
- Easy, medium, hard options
- Game over and retry option

## Backlog

- More levels with different image set
- Adding other dinosaurs and logic
- Jeep stop and other game alternatives
- Character change and extra settings

## Data structure

### app.js

- hidePage(){}
  > page transition logic
- pageDisplay(){}

  > pagetransition callback function

- stargame(){}

  > Event listeners for the game

- animate(){}

  > Gamelogic

- drawScore(){}
  > Drawing score

### canvas.js

- drawBg(){}

  > Drawing the background

- moveBg(){}
  > Moving the background

### scorebar.js

- drawScoreBar(){}
  > Drawing the scorebar

### Assets

### aim.js

- drawAim(){}
  > Drawing the aim
- moveAim(){}
  > Moves the aim

### bullet.js

- class Bullet

  - this.bulletX
  - this.bulletY
  - this.bulletSpeed
  - this.bulletsize
  - this.bulletHide
  - this.bulletSpeedX
  - this.bulletSpeepY

  - drawBullet(){}

    > Drawing a bullet per instance

  - moveBullet(){}

    > Moving a bullet per instance

  - bulletRemove(){}
    > Removes bullet from the canvas

- bulletLogic(){}
  > Logic of hitting a raptor and removing the bullet
- newBullet(){}
  > Creating a new instance of class Bullet

### characters.js

- drawDriver(){}
  > Drawing the driver
- moveDriver(){}
  > Moving the driver
- drawShooter(){}
  > Drawing the shooter
- moveShooter(){}
  > Moving the shooter

### jeep.js

- drawJeep(){}
  > Drawing the jeep
- moveJeep(){}
  > Moving the jeep
- drawJeepIntro(){}
  > Drawing the jeep at the begining of the game

### raptor.js

- class Raptor
  - this.raptorX
  - this.raptorY
  - this.raptorSpeed
  - this.raptorLife
  - this.raptorAlive
  - drawRaptor(){}
    > Draw raptor
  - moveRaptor(){}
    > Moves raptor
  - raptorDamage(){}
    > Checks if raptor alive and calculates remaining life
  - deadReverse(){}
    > Dead raptor movement and draw
- raptorlogic(){}
  > Logic of move and gameover
- newRaptor(){}
  > Creating a new instance of class Raptor

## States and States Transitions

> See logic hide page()

- first page
- start page 1
- start page 2
- game page
- game over page
- winning page

## Links

- [Slides Link](https://www.canva.com/design/DAFf92mGnB4/y3IN1_rGbYksDFPE9kX0jA/edit?utm_content=DAFf92mGnB4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [Github repository Link](https://github.com/aturike/jurassic_game)
- [Deployment Link](https://aturike.github.io/jurrasic_game)

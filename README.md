# Jurrassic game

[Click here to see deployed game](https://aturike.github.io/jurrasic_game)

## Description

Basic game for Jurassic Park raptor hunt. It is a 2D game where the main goal is to escape from the island.

## MVP

- Rendered images
- Moveable aim
- Adding random raptors to the canvas
- Raptor damage and death
- Accumulate score
- Easy, medium, hard options
- Game over and retry option

## Backlog

- Winning logic
- More levels with different image set
- Adding other dino`s and logic
- Jeep stop and other game alternatives
- Character change and extra settings

## Data structure

### app.js

- hidePage(){}
  > pagetransition logic
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

## States y States Transitions

> See logic hide page()

- first page
- start page 1
- start page 2
- game page
- game over page

## Links

- [Slides Link](http://slides.com)
- [Github repository Link](http://github.com)
- [Deployment Link](https://aturike.github.io/jurrasic_game)

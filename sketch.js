let dollars = []

function preload() {
  front = loadImage('images/front.jpeg')
  back = loadImage('images/back.jpg')
  yangcool = loadImage('images/yangcool.png')
  vapor = loadImage('images/vaporwave.png')
  font = loadFont('font/Montserrat-Black.otf')
}

function setup() {
  //DOM
  createCanvas(600, 300, WEBGL)
  
  makeItRainButton = createButton('make it rain')
    .style('font-family', 'courier')
    .style('font-size', 'large')
    .position(300, 180)
    .mouseClicked(() => {
      dollars = []
      makeItRainButton.hide()
      for (let i = 0; i < 1000; i++) {
        dollars.push(
          new Dollar(
            random(
              -width / 4, width / 4),
              random(-10000, -600),
              random(-50, 150)
          )
        )
      }
    })

  //initialize graphics
  fill(0)
  noStroke()
  textFont(font)
  textSize(30)
}

function draw() {
  background(255)

  push()
  translate(-500, -150, -100)
  image(yangcool, 0, 0, 500, 500)
  pop()


  if (!dollars[0]) {
    text("it's the first", 0, -15)
    text("of the month", 0, 15)
  }

  if (dollars[0]) {

    push()
    translate(-410, -230, -100)
    rotateZ(-0.3)
    image(vapor, 0, 0, 330, 330)
    pop()

    for (let i = 0; i < 1000; i++) {
      dollars[i].calculateYOff()
      if (dollars[i].yOff > -200 && dollars[i].yOff < 200) {
        dollars[i].showDollar(0, 0, 0)
      }
    }
  }
}

class Dollar {
  constructor(xOff, yOff, zOff) {
    this.xOff = xOff
    this.yOff = yOff
    this.zOff = zOff

    this.randomX = random(0, 0.05)
    this.randomY = random(0, 0.05)
    this.randomZ = random(0, 0.05)

    this.fallSpeed = random(3, 5)
  }

  calculateYOff() {
    this.yOff = this.yOff + this.fallSpeed
  }

  showDollar() {

    push()
    translate(this.xOff, this.yOff, this.zOff)
    rotateX(frameCount * this.randomX)
    rotateY(frameCount * this.randomY)
    rotateZ(frameCount * this.randomZ)

    push()
    translate(0, 0, 0.1)
    texture(front)
    plane(59.5, 25)
    pop()
    pop()

    push()
    translate(this.xOff, this.yOff, this.zOff)
    rotateX(frameCount * this.randomX)
    rotateY(frameCount * this.randomY)
    rotateZ(frameCount * this.randomZ)

    push()
    translate(0, 0, -0.1)
    texture(back)
    plane(59.5, 25)
    pop()
    pop()

  }
}
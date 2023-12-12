let colorPicker;
let c = null;
let prevPosition = {x:0, y:0};
let lineWidth = 10; 
let lineHeight = 10;
let brushSizeText = null;
let eraseC = null;
let isPencilButtonPressed = false;
let isEraserButtonPressed = false;
let isBrushButtonPressed = false;


function setup() {

  c = color(255,255,255);
  eraseC = color(255);
  let canvas = createCanvas(600, 600);
  canvas.parent('sketch-holder');
  colorPicker = createColorPicker('black');
  colorPicker.parent('colorPicker');
  //colorPicker.position(600,0);
  background(255);
  prevPosition = {x:mouseX, y:mouseY};

  let buttonPlus = createImg('Size+.png');
  buttonPlus.parent('buttonPlus');

  buttonPlus.mousePressed(() => {
    lineWidth++;
  });

  let buttonMinus = createImg('Size-.png');
  buttonMinus.parent('buttonMinus');

  buttonMinus.mousePressed(()=>{
    lineWidth--;
  });

  let buttonClear = createButton('Clear');
  buttonClear.parent('buttonClear');

  buttonClear.mousePressed(() => {
    background(255);
  });

  let buttonPencil = createImg('일러스트3.png');
  buttonPencil.parent('buttonPencil');
  //buttonPencil = createImg('일러스트3.png');
  buttonPencil.mousePressed(() => {
    isPencilButtonPressed = true;
    isEraserButtonPressed = false;
    isBrushButtonPressed = false;
    pencilTool();
  });

  let buttonBrush = createImg('일러스트.png');
  buttonBrush.parent('buttonBrush');
  //buttonBrush = createImg('일러스트.png');
  buttonBrush.mousePressed(() => {
    isBrushButtonPressed = true;
    isEraserButtonPressed = false;
    isPencilButtonPressed = false;
    brushTool();
  });

  let buttonEraser = createImg('일러스트2.png');
  buttonEraser.parent('buttonEraser');
    //buttonEraser = createImg('일러스트2.png');
  buttonEraser.mousePressed(() => {
    isEraserButtonPressed = true;
    isPencilButtonPressed = false;
    isPencilButtonPressed = false;
    eraseTool();
  });

  let buttonSave = createImg('saveButton.png');
  buttonSave.parent('buttonSave');
  buttonSave.mouseReleased(() => {
  saveImage();
});

}



function draw() { 
  c = colorPicker.color();

  if(mouseIsPressed) {
    if (isPencilButtonPressed) {
    pencilTool();
  }
  else if(isEraserButtonPressed) {
    eraseTool();
  }
  else if(isBrushButtonPressed) {
    brushTool();
  }
}
  prevPosition = {x:mouseX, y:mouseY};
}

function pencilTool() {
  if (c != null){
    strokeWeight(lineWidth);
    stroke(c);
  }
  line(prevPosition.x, prevPosition.y, mouseX, mouseY);
}

function eraseTool() {
    strokeWeight(lineWidth);
    stroke(eraseC);

  line(prevPosition.x, prevPosition.y,mouseX, mouseY);
}

function brushTool() {
  let newSegment = new LineSegment(prevPosition, {x:mouseX, y:mouseY}, lineWidth, c);
  newSegment.draw();
}


function saveImage() {
  saveCanvas('myCanvas','jpg');
}

class LineSegment{
  constructor(prev, cur, lWidth, col) {
    this.prev = prev;
    this.cur = cur;
    this.lWidth = lWidth;
    this.col = col;
  }

  draw(){
    if (this.col != null){
      fill(this.col);
    }
    let diffVector = {x: (this.cur.x - this.prev.x), y:(this.cur.y - this.prev.y)};

    //ov = orthogonal vector
    let ov = {x: -diffVector.y, y:diffVector.x};
    let orthogonalVectorLength = sqrt(ov.x * ov.x + ov.y * ov.y);
    ov = {x: ov.x / orthogonalVectorLength, y:ov.y / orthogonalVectorLength};

    let p1 = {x: (this.prev.x + ov.x * this.lWidth), y: (this.prev.y + ov.y * this.lWidth)};
    let p2 = {x: (this.cur.x + ov.x * this.lWidth), y: (this.cur.y + ov.y * this.lWidth)};
    let p3 = {x: (this.cur.x - ov.x * this.lWidth), y: (this.cur.y - ov.y * this.lWidth)};
    let p4 = {x: (this.prev.x - ov.x * this.lWidth), y: (this.prev.y - ov.y * this.lWidth)};

    noStroke();
    beginShape();
    vertex(p4.x, p4.y);
    vertex(p3.x, p3.y);
    vertex(p2.x, p2.y);
    vertex(p1.x, p1.y);
    endShape();
  }
}
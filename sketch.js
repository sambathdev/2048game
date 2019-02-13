let grid;
let score = 0;
function setup() {
  createCanvas(400, 400);

	grid = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	];

  addNumber();
  addNumber();
  console.table(grid);

}

function isGameover(){
  for (let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++){
      if(grid[i][j] === 0){
        return false;
      }
      if (j!==3 && (grid[i][j] === grid[i][j+1]) ) {
        return false;
      }
      if (i!==3 && (grid[i][j] === grid[i+1][j]) ) {
        return false;
      }
    }
  }
  return true;
}

function addNumber() {
  let options = [];
  for (let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++){
      if(grid[i][j] === 0){
        options.push({
          x: i,
          y: j
        });
      }
    }
  } // end for loop i
  if(options.length > 0){
    let spot = random(options);
    let r = random(1);
    grid[spot.x][spot.y] = r > 0.5 ? 2 : 4;
  }
} // end function addNumber
function copyGrid(grid) {
  let extra = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  for(let i = 0; i < 4; i++){
    for(let j = 0; j< 4; j++){
      extra[i][j] = grid[i][j];
    }
  }
  return extra;
}

function compare(a,b) {
  for(let i = 0; i < 4; i++){
    for(let j = 0; j< 4; j++){
      if (a[i][j] !== b[i][j]){
        return true;
      }
    }
  }
  return false;
}
function flip(grid){
  for(let i = 0; i < 4; i++){
    grid[i].reverse();
  }
  return grid;
}

function rotateGrid(grid) {
  let newGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  for(let i = 0; i < 4; i++){
    for(let j = 0; j< 4; j++){
      newGrid[i][j] = grid[j][i];
    }
  }
  return newGrid;
}


function keyPressed(){
  let flipped = false;
  let rotated = false;
  let played = true;
  if(keyCode === DOWN_ARROW){
    //do nothing
  }else if(keyCode === UP_ARROW){
    grid = flip(grid);
    flipped = true;
    played = true;
  } else if (keyCode === RIGHT_ARROW) {
    grid = rotateGrid(grid);
    rotated = true;
    played = true;
  } else if (keyCode === LEFT_ARROW) {
    grid = rotateGrid(grid);
    grid = flip(grid);
    rotated = true;
    flipped = true;
    played = true;
  } else{
    played = false;
  }
  if(played){
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++){
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);
    if(flipped){
      grid = flip(grid);
    }
    if(rotated){
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
    }
    if(changed){
      addNumber();
    }
    if(isGameover()){
      console.log("GAME OVER");
    }
  }
}

function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

function draw() {
  background(220);
  drawGrid();
  select("#score").html(score);
  if(isGameover()){
    select("#over").html("GameOver");
  }
}

function slide(row) {
  let arr = row.filter(val => val);
  let missing = 4 - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;

}


function combine(row) {
  for(let i = 3; i >= 1; --i){
    let a = row[i];
    let b = row[i-1];
    if(a === b){
      row[i] = a + b;
      score += row[i];
      row[i-1] = 0;
    }
  }
  return row;
}

function drawGrid() {

  let w = 100;
  for(let i = 0; i < 4; i++){
    for(let j = 0; j< 4; j++){
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(i*w, j*w, w, w);
      let val = grid[i][j];
      if(grid[i][j] !== 0){
        textAlign(CENTER, CENTER);
        textSize(64);
        fill(0);
        noStroke();
        text(val, (i*w) + (w/2), (j*w) + (w/2) + 10);

      }
    }
  }
}

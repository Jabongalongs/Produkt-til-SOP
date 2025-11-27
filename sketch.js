let playerX, playerY;
let laneLeft, laneRight;
let num1, num2, correctAnswer, wrongAnswer;
let correctLane;
let playerLane = "left";
let message = "";
let score = 0;
let highscore = 0;
let speed;
let difficulty = "";
let operator = "+";
let gameStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  laneLeft = width / 4;
  laneRight = width * 3 / 4;
  playerX = laneLeft;
  playerY = height * 0.8;
  speed = height * 0.004;
}

function draw() {
  background(200, 230, 255);
  drawLanes();

  if (!gameStarted) {
    showMenu();
    return;
  }

  // Spiller
  fill(255, 100, 100);
  ellipse(playerX, playerY, width / 15, width / 15);

  // Spørgsmål
  fill(0);
  textSize(windowWidth / 25);
  text(`Hvad er ${num1} ${operator} ${num2}?`, width / 2, height * 0.1);

  // Svarbokse
  textSize(windowWidth / 20);
  fill(255);
  rect(laneLeft - width / 10, height * 0.3, width / 5, height * 0.1, 20);
  rect(laneRight - width / 10, height * 0.3, width / 5, height * 0.1, 20);
  fill(0);
  text(correctLane === "left" ? correctAnswer : wrongAnswer, laneLeft, height * 0.35);
  text(correctLane === "right" ? correctAnswer : wrongAnswer, laneRight, height * 0.35);

  // Point og highscore
  textSize(windowWidth / 35);
  text(`Point: ${score}   🏆 Rekord: ${highscore}`, width / 2, height * 0.05);
  text(message, width / 2, height * 0.9);

  // Bevægelse
  playerY -= speed;
  if (playerY < height * 0.35) {
    checkAnswer();
  }
}

function keyPressed() {
  if (!gameStarted) {
    // vælg sværhedsgrad
    if (key === "1") startGame("let");
    if (key === "2") startGame("mellem");
    if (key === "3") startGame("svær");
    return;
  }

  if (keyCode === LEFT_ARROW) {
    playerLane = "left";
    playerX = laneLeft;
  } else if (keyCode === RIGHT_ARROW) {
    playerLane = "right";
    playerX = laneRight;
  }
}

function showMenu() {
  fill(0);
  textSize(windowWidth / 20);
  text("🧮 Matematikspil", width / 2, height * 0.2);

  textSize(windowWidth / 30);
  text("Vælg sværhedsgrad:", width / 2, height * 0.4);
  text("1️⃣  Let  (plus)", width / 2, height * 0.5);
  text("2️⃣  Mellem  (plus & minus)", width / 2, height * 0.58);
  text("3️⃣  Svær  (plus, minus, gange & enkel division)", width / 2, height * 0.66);

  textSize(windowWidth / 40);
  text("Brug venstre/højre piletast for at vælge bane!", width / 2, height * 0.85);
}

function startGame(level) {
  difficulty = level;
  score = 0;
  message = "";
  playerY = height * 0.8;
  gameStarted = true;
  newQuestion();
}

function checkAnswer() {
  if (playerLane === correctLane) {
    message = "✅ Rigtigt!";
    score++;
    if (score > highscore) {
      highscore = score;
    }
  } else {
    message = "❌ Forkert! Prøv igen!";
    score = 0;
  }

  playerY = height * 0.8;
  newQuestion();
}

function newQuestion() {
  if (difficulty === "let") operator = "+";
  if (difficulty === "mellem") operator = random(["+", "-"]);
  if (difficulty === "svær") operator = random(["+", "-", "×", "÷"]);

  if (operator === "÷") {
    // lav nem division (som går op)
    num2 = int(random(2, 5)); // små divisorer
    correctAnswer = int(random(2, 10));
    num1 = correctAnswer * num2;
  } else {
    num1 = int(random(1, 10));
    num2 = int(random(1, 10));
    if (operator === "-" && num2 > num1) [num1, num2] = [num2, num1]; // undgå negative
    correctAnswer = calculate(num1, num2, operator);
  }

  wrongAnswer = correctAnswer + int(random(-3, 4));
  if (wrongAnswer === correctAnswer) wrongAnswer++;

  correctLane = random(["left", "right"]);
}

function calculate(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "×": return a * b;
    case "÷": return a / b;
  }
}

function drawLanes() {
  stroke(180);
  strokeWeight(6);
  line(width / 2, 0, width / 2, height);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  laneLeft = width / 4;
  laneRight = (3 * width) / 4;
  playerY = height * 0.8;
}

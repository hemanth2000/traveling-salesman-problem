var cities = [];
var totalCities = 6;

var order = [];

var shortestDistance;
var bestRoute = [];
var s2;
// Lexical order algorithm

function setup() {
  createCanvas(1200, 600);

  for (var i = 0; i < totalCities; i++) {
    cities[i] = createVector(random(width / 2), random(height / 2));
    order[i] = i;
  }

  shortestDistance = calcDist(order);
  bestRoute = order.slice();
  s2 = "";
  for (var i = 0; i < bestRoute.length; i++) {
    s2 += bestRoute[i];
  }
}

//Basic brute force method
function draw() {
  background(0);

  // Draw cities
  fill(255, 0, 0);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 10, 10);
  }

  // Draw Path connecting cities

  stroke(255);
  strokeWeight(1);
  noFill();
  beginShape();

  for (var i = 0; i < order.length; i++) {
    vertex(cities[order[i]].x, cities[order[i]].y);
  }

  endShape();

  var i = floor(random(order.length));
  var j = floor(random(order.length));
  swap(order, i, j);

  var d = calcDist(order);

  if (shortestDistance > d) {
    shortestDistance = d;
    bestRoute = order.slice();
    s2 = "";
    for (var i = 0; i < bestRoute.length; i++) {
      s2 += bestRoute[i];
    }
  }

  // Draw best route

  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  beginShape();

  for (var i = 0; i < bestRoute.length; i++) {
    vertex(cities[bestRoute[i]].x, cities[bestRoute[i]].y);
  }
  translate(width / 2, 0);
  endShape();

  textSize(64);
  var s1 = "";
  for (var i = 0; i < order.length; i++) {
    s1 += order[i];
  }

  fill(255);
  text(s1, -width / 2, height - 10);
  text(s2, 0, height - 10);
  nextOrder();
}

function nextOrder() {
  // Step 1: Find the largest x that satisfies p[x]<p[x+1]
  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }

  if (largestI == -1) {
    noLoop();
    console.log("Finished!");
  }
  //Step 2
  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  // Step 3
  swap(order, largestI, largestJ);

  // Step 4
  var left = largestI + 1;
  var right = order.length - 1;
  while (left < right) {
    swap(order, left++, right--);
  }
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDist(points) {
  var sum = 0;

  for (var i = 0; i < points.length - 1; i++) {
    sum += dist(
      cities[points[i]].x,
      cities[points[i]].y,
      cities[points[i + 1]].x,
      cities[points[i + 1]].y
    );
  }

  return sum;
}

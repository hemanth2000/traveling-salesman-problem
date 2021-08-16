var cities = [];
var totalCities = 10;

var shortestDistance;
var bestRoute = [];

function setup() {
  createCanvas(400, 300);

  for (var i = 0; i < totalCities; i++) {
    cities[i] = createVector(random(width), random(height));
  }

  shortestDistance = calcDist(cities);
  bestRoute = cities.slice();
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

  for (var i = 0; i < cities.length; i++) {
    vertex(cities[i].x, cities[i].y);
  }

  endShape();

  var i = floor(random(cities.length));
  var j = floor(random(cities.length));
  swap(cities, i, j);

  var d = calcDist(cities);

  if (shortestDistance > d) {
    shortestDistance = d;
    bestRoute = cities.slice();
  }

  // Draw best route

  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  beginShape();

  for (var i = 0; i < cities.length; i++) {
    vertex(bestRoute[i].x, bestRoute[i].y);
  }

  endShape();
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDist(points) {
  var sum = 0;

  for (var i = 0; i < points.length - 1; i++) {
    sum += dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }

  return sum;
}

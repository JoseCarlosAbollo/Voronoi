/*************************************************************************************************
This code generates a voronoi diagram with NUM randomly generated points in a SZE*SZE image that
can be downloaed pressing SPACE. The diagram can be made with Euclidean distance or with 
Manhattan distance (changing comments in lines 65 and 67). To see some interaction, the points are
drawn and when the mouse is clicked inside an area of the diagram, the nearest point is 
highlighted.

Possible improvements:
	- It could be a function. In this case, it would be interesting being able to generate the 
	diagram in two ways: 
		1) from SZE and NUM {e.g. voronoi(sze,num)}
		2) from SZE and a given array {e.g. voronoy(sze,points)}

Author: Abollo Palacios, José Carlos.
Date: 04/05/2019
*************************************************************************************************/
var sze = 800;		// Size of the image
var colors = [];	// Array of colors
var num = 70;		// Number of points
var pts = [];		// Array of points
var voronoi;		// Image

function setup(){
	// Generating a color for each point
	let rest = floor(250/num);
	for (let i = 0; i < num; i++) {
		colors[i] = color(floor(Math.random()*(250-rest)+(2*rest)), 
						  floor(Math.random()*(250-rest)+(2*rest)), 
						  floor(Math.random()*(250-rest)+(2*rest)));
	}
	// Generating random points with a minimal separation
	let aux;
	let bool;
	let i = 0;
	while(i < num){
		aux = createVector(random(10, sze-10), random(10, sze-10));
		bool = true;
		if(i > 0){
			for(let j = 0; j < i; j++){
				if(Math.abs(aux.x - pts[j].x) + Math.abs(aux.y - pts[j].y) < 10){bool = false;}
			}
			if(bool){
				pts[i] = aux;
				i++;
				
			}
		}else{
			pts[i] = aux;
			i++;
		}
	}
	// Generating the image (and the canvas to show the points)
	let img = createImage(sze, sze);
	createCanvas(img.width, img.height);
	background(0);
	img.loadPixels();
	for (i = 0; i < img.width; i++) {
		for (let j = 0; j < img.height; j++) {
			let d = sze*sze;
			let diff;
			let n;
			let index = (i + j * img.width * 4);
			for (let k = 0; k < num; k++) {
				// Euclidean
				diff = dist(i, j, pts[k].x, pts[k].y);
				// Manhattan
				//diff = Math.abs(i - pts[k].x) + Math.abs(j - pts[k].y)
				if(d > diff){
					d = diff;
					n = k;
				}
				img.set(i, j, colors[n]);
			}
		}
	}
	img.updatePixels();
	image(img, 0, 0);
	voronoi = img;

	console.log("Press SPACE to save the image.");
}


function draw(){
	// Drawing every point
	ellipseMode(RADIUS);
	fill(0);
	noStroke();
	for(let i = 0; i < num; ++i){
		ellipse(pts[i].x, pts[i].y, 2, 2);
	}
	// Interaction with the mouse
	fill(255);
	ellipseMode(RADIUS);
	noStroke();
	if (mouseIsPressed) {
		let pxl = voronoi.get(mouseX, mouseY);
		for(let i = 0; i < num; i++){
			if(pxl[1] == colors[i].levels[1] && pxl[2] == colors[i].levels[2] && pxl[3] == colors[i].levels[3]){
				ellipse(pts[i].x, pts[i].y, 2, 2);
			}
		}
  	}
}

function keyPressed() {
  if (key == ' ') {
    voronoi.save('voronoi', 'jpg');
  }
  return false;
}
function setup() {
    canvas = createCanvas(1200, 800);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(1200, 800);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

status = "";
objects = [];


function draw() {
    image(video, 0, 0, 1200, 800);
    if (status != "") {
        objectDetector.detect(video, gotresults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length;
            fill("#03fc24");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke("#03fc24");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
    
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}
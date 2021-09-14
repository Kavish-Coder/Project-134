img="";

status="";

objects=[];

function setup() {
    canvas=createCanvas(640, 420);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 420);
    if(status != "person") { 
        for(i=0; i<objects.length; i++) { 
        document.getElementById("person_detected").innerHTML = "Status: Baby Found";
        fill("#ff0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label + "" + percent + "%", objects[i].x + 15,objects[i].y + 15);
        noFill();
        stroke("#ff0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    } else {
        document.getElementById("person_detected").innerHTML = "Baby Not Found"
    }
} 

function modelLoaded() {
    console.log("Model Loaded");
    status=true;
    objectDetector.detect(img, gotResults);
    }
    
    function gotResults(error, results) {
        if(error) {
            console.log(error);
        }
        console.log(results);
        objects=results;
    }
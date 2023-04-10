song="";
img = "";
imgstatus = "";
objects = [];


function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";

}

function preload() {
song=loadSound("meri_maa_k_barabar.mp3");
}
function draw() {
    image(video, 0, 0, 400, 400);
    if (imgstatus != "") {

        objectDetector.detect(video, gotresults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected " + objects.length;
            fill("red");
            textSize(30);
            text(objects[i].label, objects[i].x, objects[i].y);
            noFill();
            stroke("green");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person"){
                song.stop();
                document.getElementById("status").innerHTML = "Status: person detected " ;
    
            }
            else{
                song.play();
                document.getElementById("status").innerHTML = "Status: no person detected " ;  
            }
            

        }
        if(objects.length==0)
        {
            song.play();
            document.getElementById("status").innerHTML = "Status: no person detected " ;  
        }

    }
}
function modelloaded() {
    console.log("modelloaded");
    imgstatus = true;


}
function gotresults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
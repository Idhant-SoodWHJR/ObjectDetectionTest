song = "";
objects = [];
status = "";
function preload(){
    song = "";

}
function setup(){

    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting object";

}
function modelLoaded(){
    console.log("model loaded!");
    status = True;
}
function gotResult(error, results){
    if (error){
        console.log("error");
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video, 0, 0, 380, 380);
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status: object detected";
            fill(r,g,b);
            perecnt = floor(objects[i].confidence*100);
            text = (objects[i] + label + percent + "%",
            objects[i].x+15,objects[i].y +15);
            nofill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "baby found";
                console.log("Stop");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "baby not found";
                console.log("play");
                song.play();
            }
        }
        if (object.length == 0){
            document.getElementById("number_of_objectss").innerHTML = "baby not found"
            console.log("play");
            song.play();
        }
    }
}
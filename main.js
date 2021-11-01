video=""
objects=[];
status="";

function setup()
{
    canvas=createCanvas(450,350);
    canvas.center();
}

function preload()
{
    video=createVideo('video.mp4');
    video.hide();
}

function start()
{
    objectdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status:detecting object";
}

function draw()
{
    image(video,0,0,450,350);
    if(status !="")
    {
        objectdetector.detect(video,gotResults);

        for(i=0; i<objects.lenght; i++)
        {
            document.getElementById("status").innerHTML="status : object dectecting";
            document.getElementById("number_of_objects").innerHTML="number of objects detected id : "+objects.lenght;
            percentage=floor(objects[i].confidence*100);
            fill("red");
            text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }  

}

function gotResults(error,results)
{
if(error)
{
console.log(error);
}
console.log(results);
objects = results;
}

function modelLoaded()
{
video.loop();
video.volume(1);
video.speed(1);
console.log(modelLoaded);
status=true;
}
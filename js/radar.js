/**
 * Created by User on 3/18/2016.
 */

function convertX(x){
    return x += 100;
}

function convertY(y){ // based off of a 200 by 200 canvas
    return y = -y + 100;
}

function mark_asteroids(asteroids, maxBounds){
    if(asteroids != null)
        for (var i = 0; i < asteroids.length; i++)
        {
            var rock_x = asteroids[i].model.position.x * (100.0/maxBounds); // scale them down
            var rock_z = -asteroids[i].model.position.z * (100.0/maxBounds);

            rock_x = convertX(rock_x); // convert to canvas coordinates
            rock_z = convertY(rock_z);

            ctx.font = "10px Arial";

            ctx.strokeText('x',rock_x, rock_z);
        }
}

function twoRadar(x, y, x2, y2, ctx, canvas, counter, radius, asteroids, maxBounds){
    var newx = convertX(x);
    var newy = convertY(y);
    var newx2 = convertX(x2);
    var newy2 = convertY(y2);

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    document.getElementById("radar").style.top = "37%";
    document.getElementById("radar").style.right = "41%";


    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 3;

    ctx.moveTo(newx,newy);
    ctx.lineTo(newx-10,newy+10);
    ctx.lineTo(newx,newy+20);
    ctx.lineTo(newx+10,newy+10);
    ctx.lineTo(newx,newy);
    ctx.stroke();

    ctx.font = "10px Arial";
    ctx.strokeText("1",newx-3,newy+13);

    ctx.beginPath();
    ctx.lineWidth = 3;

    ctx.moveTo(newx2,newy2);
    ctx.lineTo(newx2-10,newy2+10);
    ctx.lineTo(newx2,newy2+20);
    ctx.lineTo(newx2+10,newy2+10);
    ctx.lineTo(newx2,newy2);
    ctx.stroke();

    ctx.font = "10px Arial";
    ctx.strokeText("2",newx2-3,newy2+13);

    // expanding circle
    ctx.beginPath();
    ctx.arc(100,100,counter,0,2*Math.PI);
    ctx.stroke();

    mark_asteroids(asteroids, maxBounds);

}


function radar(x, y, ctx, canvas, counter, radius, asteroids, maxBounds) {
    // real world to canvas coordinate conversion
    // -99, 99 -> 1, 1          99, 99 -> 199, 1
    //              0,0 -> 100, 100
    // -99, -99 -> 0, 199      99, -99 -> 199, 199

    var newx = convertX(x);
    var newy = convertY(y);

    //ctx.fillRect(0,0,200,200);
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 3;

    ctx.moveTo(newx, newy-5);
    ctx.lineTo(newx-10,newy+5);
    ctx.lineTo(newx,newy+15);
    ctx.lineTo(newx+10,newy+5);
    ctx.lineTo(newx,newy-5);
    ctx.stroke(); // the ship start

    ctx.font = "10px Arial";
    ctx.strokeText("1",newx-3,newy+8);

    ctx.font = "15px Arial";
    var str = "x: " + String(parseInt(newx)) + " y: " + String(parseInt(newy));
    ctx.strokeText(str,100, 150);

    // expanding circle
    ctx.beginPath();
    ctx.arc(100,100,counter, 0, 2*Math.PI);
    ctx.stroke();

    mark_asteroids(asteroids, maxBounds);
}
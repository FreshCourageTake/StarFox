/**
 * Created by User on 3/18/2016.
 */

function convertX(x){
    if (x == 0)
        x = 100;
    else {
        x += 100;
    }
    return x;
}

function convertY(y){
    if (y > 0){
        y = Math.abs(y - 100);
    }
    else if (y < 0){
       y = Math.abs(y) + 100;
    }
    else{
        y = 100;
    }
    return y;
}

function twoRadar(x, y, x2, y2, ctx, canvas, counter, radius){
    var newx = convertX(x);
    var newy = convertY(y);
    var newx2 = convertX(x2);
    var newy2 = convertY(y2);

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    document.getElementById("radar").style.top = "37%";
    document.getElementById("radar").style.right = "42%";


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
    ctx.arc(115,115,counter,0,2*Math.PI);
    ctx.stroke();
}


function radar(x, y, ctx, canvas, counter, radius) {
    // real world to canvas coordinate conversion
    // -99, 99 -> 1, 1          99, 99 -> 199, 1
    //              0,0 -> 100, 100
    // -99, -99 -> 0, 199      99, -99 -> 199, 199

    var newx = convertX(x);
    var newy = convertY(y);

    //ctx.fillStyle = "blue
    //ctx.fillRect(0,0,200,200);
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    //var radius = 100;

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
    ctx.stroke(); // the ship start

    ctx.font = "10px Arial";
    ctx.strokeText("1",newx-3,newy+13);

    // expanding circle
    ctx.beginPath();
    ctx.arc(115,115,counter,0,2*Math.PI);
    ctx.stroke();
}
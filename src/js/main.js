var myUI;

myUI = {
 init: () => {
    var canvas = createEle("canvas"),
        ctx = canvas.getContext("2d"),
        dvContain = bySel("#dvContain"),
        points = [], mask = new Image();;

    canvas.height = 300;

    dvContain.appendChild(canvas);

    onmousemove = d =>{
        if(d.buttons == 1){
            points.push({x:d.clientX, y: d.clientY})
            console.log(points);
        }
    }
    
    mask.src = bySel("#template").innerHTML;

    function loop(){
            ctx.clearRect(0,0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(mask, 0,0);
            ctx.beginPath();
            points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
            ctx.globalCompositeOperation = "source-atop";
            ctx.stroke();
            requestAnimationFrame(loop);
        }

    loop();
        
    }
};
window.onload = () => {
    myUI.init();
};
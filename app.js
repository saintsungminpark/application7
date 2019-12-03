const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = "black"; // 기본 그리기 선 스타일
ctx.linewidth = 2.5; // 선 두께
let painting = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX; //offsetX, Y: 캔버스 안에서의 마우스 움직임 좌표
    const y = event.offsetY;
    if(!painting) { // mouseUp
        ctx.beginPath(); // path(선: 마우스 움직임) 만들기
        ctx.moveTo(x, y);
    } else { // mouseDown
        ctx.lineTo(x, y);
        ctx.stroke(); // 그리기
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
let painting = false;
let filling = false;
const INITIAL_COLOR = "black";

canvas.width = 800;
canvas.height = 500;

ctx.strokeStyle = INITIAL_COLOR; // 기본 선 색
ctx.fillStyle = INITIAL_COLOR; // 기본 채우기 색
ctx.lineWidth = 2.5; // 선 두께

function startPainting() {
    painting = true;
}
function stopPainting() {
    painting = false;
}
function onMouseMove(event) {
    const x = event.offsetX; //offsetX, Y: 캔버스 안에서의 마우스 움직임 좌표
    const y = event.offsetY;
    if (!painting) { // mouseUp
        ctx.beginPath(); // path(선: 마우스 움직임) 만들기
        ctx.moveTo(x, y);
    } else { // mouseDown
        ctx.lineTo(x, y);
        ctx.stroke(); // 그리기
    }
}
function handleColorClick(event) { // stroke color 바꾸기
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.textContent = "Paint"
    } else {
        filling = true;
        mode.textContent = "Fill"
    }
}
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height); // 네모채우기(x, y, 가로크기, 세로크기)
    }
}
function handleCM(event) { // 우클릭 방지시키기(우클릭 저장 대신 save 버튼으로 사용하게 하기 위함)
    event.preventDefault()
}
function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintjs";
    link.click();
}
// colors의 class 태그들을 배열로 변환 
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); // 우클릭시
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}
if (save) {
    save.addEventListener("click", handleSaveClick);
}
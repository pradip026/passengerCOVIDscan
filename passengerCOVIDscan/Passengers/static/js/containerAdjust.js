const canvas_container = document.getElementById("canvas_container");
canvas = document.getElementById("canvas");

function calculate_size() {
  canvas.width = canvas_container.offsetWidth;
  canvas.height = canvas.width * 9/16;
}

calculate_size();

function onload_fun(){
  calculate_size();
}

window.onresize = onload_fun;
window.onload = onload_fun;

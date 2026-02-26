document.body.style.backgroundColor = "#101010";
var newDiv = document.createElement("div");
newDiv.textContent = "作者：MC篮球";
newDiv.style.position = "absolute";
newDiv.style.bottom = "0px";
newDiv.style.right = "0px";
newDiv.addEventListener("click", function(){
    window.open('https://space.bilibili.com/3546613752531863?spm_id_from=333.1369.0.0', '_blank');
});
document.body.appendChild(newDiv);
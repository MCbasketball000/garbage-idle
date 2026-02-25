document.body.style.backgroundColor = "#282828"
{
    var newDiv = document.createElement("div");
    newDiv.textContent = "作者：MC篮球";
    newDiv.style.position = "absolute";
    newDiv.style.bottom = "0px";
    newDiv.style.right = "0px";
    newDiv.addEventListener("click", function () {
        window.location.replace("https://space.bilibili.com/3546613752531863?spm_id_from=333.40164.0.0")
    });
    document.body.appendChild(newDiv);
}

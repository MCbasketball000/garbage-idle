function CreateElementBy(type,content,pos,pos1,pos2,opcode){
    var newDiv = document.createElement(type);
    newDiv.textContent = content;
    newDiv.style.position = "absolute";
    //pos：1是左上，2是右上，3是左下，4是右下
    if(pos == 1)
    {
        newDiv.style.top = pos1;
        newDiv.style.left = pos2;
    }
    if(pos == 2)
    {
        newDiv.style.top = pos1;
        newDiv.style.right = pos2;
    }
    if(pos == 3)
    {
        newDiv.style.bottom = pos1;
        newDiv.style.left = pos2;
    }
    if(pos == 4)
    {
        newDiv.style.bottom = pos1;
        newDiv.style.right = pos2;
    }
    newDiv.addEventListener("click", use(opcode));
    document.body.appendChild(newDiv);
}
function use(opcode){
    ;
}
function refreshbutton(){
    
}
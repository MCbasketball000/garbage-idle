//一些乱七八糟的读取
var resourceRegister;
async function initregister()
{
    const response = await fetch("./register/resource.json");
    resourceRegister = await response.json();
    const response2 = await fetch("./lang/zh-cn.json");
    languageRegister = await response2.json();
    var haveData;
    //存档部分（本来想单独写成一个文件的但是不会导入就算了
    function load(){
        haveData = localStorage.getItem("haveData");
    }
    function save(){
        localStorage.setItem("haveData", haveData);
    }
    function init(){
        haveData = true;
        save();
    }
    load();
    if(haveData != true){
        init();
    }
    //-------------------------------------------------//
    return 0;
}



function CreateElementBy(type,content,pos,pos1,pos2,opcode,lengthz,widthz){
    var newDiv = document.createElement(type);
    newDiv.textContent = content;
    newDiv.style.position = "absolute";
    newDiv.id = opcode;
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
    if(type == "button")
    {
        newDiv.style.width = widthz;
        newDiv.style.height = lengthz;
        newDiv.addEventListener("mouseenter", function(){
            this.classList.add('highlight');
        });
        newDiv.addEventListener("mouseleave", function(){
            this.classList.remove('highlight');
        });
        newDiv.addEventListener("click", use(opcode));
    }
    document.body.appendChild(newDiv);
}
function use(opcode){
    ;
}
function refreshbutton(){
    ;
}
function getLockedElement(){
    ;
}
function refreshResourse(){
    var keys = Object.keys(resourceRegister);
    keys.forEach(function(element, index) {
        CreateElementBy("div",keys[index],1,index*10,0,JSON.stringify(resourceRegister[element]))
    });
}    
function main(fuck){
    console.log(fuck);
    console.log(resourceRegister.garbage);
    
    refreshbutton();
    refreshResourse();
    console.log(resourceRegister);
}
async function run(){
    const temp = await initregister();
    main(temp);
}
run();
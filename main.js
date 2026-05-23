function initall(){
    document.body.style.backgroundColor = "#101010";
    CreateElementBy("div",4,0,0,'author','#ffffff',NaN,NaN,'作者：MC篮球');
    CreateElementBy("div",4,0,250,'github','#a8da99',NaN,NaN,'Github');
    CreateElementBy("div",4,0,400,'qq','#ccda99',NaN,NaN,'点击加入qq群：1061107601');
}
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function initregister()
{
    const response = await fetch("./register/resource.json");
    resourceRegister = await response.json();
    const response2 = await fetch("./lang/zh-cn.json");
    languageRegister = await response2.json();
    const response3 = await fetch("./register/upgrade.json");
    upgradeRegister = await response3.json()
    return 0;
}
function RandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function CreateElementBy(type,pos,pos1,pos2,opcode,color,lengthz,widthz,content,postype){
    var newDiv = document.createElement(type);
    if(postype == undefined){
        pos1 = pos1+'px';
        pos2 = pos2+'px';
    }
    else{
        pos1 = pos1+postype;
        pos2 = pos2+postype;
    }
    if(color != undefined){
        newDiv.style.color = color;
    }
    if(content != undefined){
        newDiv.textContent = content;
    }
    else{
        newDiv.textContent = languageRegister[opcode];
    }
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
        if(widthz != undefined){
            widthz = widthz+'px';
            newDiv.style.width = widthz;
        }
        if(lengthz != undefined){
            lengthz = lengthz+'px';
            newDiv.style.height = lengthz;
        }
        newDiv.style.height = lengthz;
        newDiv.addEventListener("mouseenter", function(){
            this.classList.add('highlight');
        });
        newDiv.addEventListener("mouseleave", function(){
            this.classList.remove('highlight');
        });
    }
    newDiv.addEventListener("click", function(){
        use(opcode)
    });
    document.body.appendChild(newDiv);
}
function use(opcode){
    if(opcode == 'press'){
        resource['point'] += 1;
        if(upgradeEffect.click != undefined){
            resource['point'] += upgradeEffect.click;
        }
        if(Math.floor(RandomNum(1,100)) <= upgradeEffect.gemclick){
            resource['gem'] += 1;
        }
    }
    if(opcode == 'author'){
        window.open('https://space.bilibili.com/3546613752531863?spm_id_from=333.1369.0.0', '_blank');
    }
    if(opcode == 'github'){
        window.open('https://github.com/MCbasketball000/mouse-clicker', '_blank');
    }
    if(opcode == 'qq'){
        window.open('https://qm.qq.com/q/TETg6zL52S', '_blank');
    }
    if(opcode == 'reset'){
        if(window.confirm("确定重置？这会重置你的前两个升级和所有点数，而你将获得"+String(Math.floor(resource.point / 100))+"重置点")){
            resource.resetpoint += Math.floor(resource.point / 100)
            resource.point = 0;
            upgrades.click = 0;
            upgrades.autoclick = 0;
        }
    }
    if(upgradeList.includes(opcode)){
        try2upgrade(opcode);
    }
}
function try2upgrade(opcode){
    if(checkUpdateResource(opcode)){
        deleteresource(opcode);
        upgrades[opcode] += 1;
    }
}
function deleteresource(opcode){
    var keys = Object.keys(upgradeRegister[opcode].resource);
    keys.forEach(function(key, index) {
        resource[key] -= Math.floor(upgradeRegister[opcode].resource[key].basic * Math.pow(upgradeRegister[opcode].resource[key].mul,upgrades[opcode]));
    });
}
function checkUpdateResource(opcode){
    var canUpdate = true
    var keys = Object.keys(upgradeRegister[opcode].resource);
    keys.forEach(function(key, index) {
        if(resource[key] < Math.floor(upgradeRegister[opcode].resource[key].basic * Math.pow(upgradeRegister[opcode].resource[key].mul,upgrades[opcode]))){
            canUpdate = false;
        }
    });
    return canUpdate;
}
function refreshbutton(){
    upgradeList = [];
    CreateElementBy("button",1,40,40,'press','#ffffff',200,300,undefined,'%');
    CreateElementBy("button",2,5,5,'reset','#ff0000',40,60,undefined,'px');
    var keys = Object.keys(upgradeRegister);
    keys.forEach(function(key, index) {
        upgradeList.push(key);
        CreateElementBy("button",1,200+index*75,15,key,upgradeRegister[key].color,45,160)
    });
}
function refreshResourse(){
    var keys = Object.keys(resourceRegister);
    keys.forEach(function(key, index) {
        CreateElementBy("div",1,index*35,0,key,resourceRegister[key]['color'])
        CreateElementBy("div",1,index*35,150,key+'resource',resourceRegister[key]['color'],NaN,NaN,0)
    });
}
function updateResource(){
    var keys = Object.keys(resourceRegister);
    keys.forEach(function(key, index) {
        document.getElementById(key+'resource').innerHTML=resource[key];
    });
} 
function checkResource(){
    var keys = Object.keys(resourceRegister);
    keys.forEach(function(key, index) {
        if(resource[key] == undefined){
            resource[key] = 0;
        }
    });
}   
function checkUpgrades(){
    var keys = Object.keys(upgradeRegister);
    keys.forEach(function(key, index) {
        if(upgrades[key] == undefined){
            upgrades[key] = 0;
        }
    });
}
function addresource(){
    var keys = Object.keys(upgradeEffect);
    keys.forEach(function(key, index) {
        if(resource[key] != undefined){
            resource[key] += upgradeEffect[key];
            if(key == 'point'){
                if(Math.floor(RandomNum(1,100)) <= upgradeEffect.gemautoclick){
                    resource['gem'] += 1;
                };
                resource[key] += Math.ceil(upgradeEffect[key] * upgradeEffect.electricuse * resource.electric / 10000);
            }
        }
    });
}
function updatecheck(){
    upgradeEffect = {};
    var keys = Object.keys(upgrades);
    keys.forEach(function(key, index) {
        var keys2 = Object.keys(upgradeRegister[key].effect);
        keys2.forEach(function(key2, index) {
            if(upgradeEffect[key2] == undefined){
                upgradeEffect[key2] = 0;
            }
            upgradeEffect[key2] += upgradeRegister[key].effect[key2] * upgrades[key];
        });
    });
}        
async function main(){
    function load(){
        haveData = localStorage.getItem("haveData");
        resource = JSON.parse(localStorage.getItem("resource"));
        if(haveData == 'true'){
            checkResource()
        }
        upgrades = JSON.parse(localStorage.getItem("upgrades"));
        if(haveData == 'true'){
            checkUpgrades();
        }
    }
    function save(){
        localStorage.setItem("haveData", haveData);
        localStorage.setItem("resource", JSON.stringify(resource));
        localStorage.setItem("upgrades", JSON.stringify(upgrades));
    }
    function init(){
        haveData = true;
        resource = {};
        checkResource();
        upgrades = {};
        checkUpgrades();
        save();
    }
    load();
    if(haveData != 'true'){
        init();
    }
    refreshbutton();
    refreshResourse();
    while(true){
        updatecheck()
        addresource()
        save();
        await wait(1000);
    }
}
async function loop(){
    while(true){
        updateResource();
        await wait(100);
    }
}
async function run(){
    initall();
    await initregister();
    main();
    loop()
}
run();
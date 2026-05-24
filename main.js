const ProjectID = "jsproject-template";
//作者，提示
function initall(){
    document.body.style.backgroundColor = "#101010";
    CreateElementBy("div",4,0,0,'author','#ffffff',NaN,NaN,'作者：MC篮球');
    CreateElementBy("div",4,0,250,'github','#a8da99',NaN,NaN,'Github');
    CreateElementBy("div",4,0,400,'qq','#ccda99',NaN,NaN,'点击加入qq群：1061107601');
}
//功能性函数
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function RandomNum(min, max) {
  return Math.random() * (max - min) + min;
}
//创建元素以及运行
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
        window.open('https://github.com/MCbasketball000/jsproject-template', '_blank');
    }
    if(opcode == 'qq'){
        window.open('https://qm.qq.com/q/TETg6zL52S', '_blank');
    }
}
async function main(){
    //本地存储
    function localStorageUse(k,v){
        localStorage.setItem(GameID + '_' + k,v);
    }
    function localStorageGet(k){
        return localStorage.getItem(GameID + '_' + k);
    }
    //保存读取
    function load(){
        haveData = localStorageGet("haveData");
    }
    function save(){
        localStorageUse("haveData", haveData);
    }
    function init(){
        haveData = true;
        save();
    }
    load();
    if(haveData != 'true'){
        init();
    }
    while(true){
        save();
        await wait(1000);
    }
}
//主循环体
async function loop(){
    while(true){
        await wait(100);
    }
}
//运行
async function run(){
    initall();
    await initregister();
    main();
    loop()
}
run();
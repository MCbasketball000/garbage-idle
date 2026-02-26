var haveData;
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
const Numbers=[];

window.addEventListener('load',function(){
    const now = new Date();
    addBarcode();


})

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeBarcode(num,id){
    JsBarcode(`#${id}`, num, {
      format: "CODE128",
      displayValue: true,
    });
}

function addBarcode(){
    const num=randomNum(100000000000,999999999999);
    Numbers.push(num);
    const field = document.getElementById("field");
    const id = `barcode${num}`;
    const img = document.createElement("img");
    img.id = id;
    img.onload = function() {
        const maxLeft = field.clientWidth - img.naturalWidth;
        const maxTop = field.clientHeight - img.naturalHeight;
        img.style.left = `${randomNum(0, Math.max(0, maxLeft))}px`;
        img.style.top = `${randomNum(0, Math.max(0, maxTop))}px`;
    };
    field.appendChild(img);
    makeBarcode(num,id);
}

function deleteBarcode(num){
    const element = document.getElementById(`barcode${num}`);
    if (element) {
        element.remove();
        Numbers.splice(Numbers.indexOf(num), 1);
        addBarcode();
    }
}


const inputBuffer=[];
window.addEventListener('keydown',function(event){
    if(event.key!=='Enter'){
        inputBuffer.push(event.key);
    } else {
        const userInput = inputBuffer.join('');
        deleteBarcode(userInput);
        inputBuffer.length = 0; // バッファをクリア
    }
});
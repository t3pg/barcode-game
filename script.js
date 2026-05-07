const Numbers=[];

window.addEventListener('load',function(){
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
    const div = document.getElementById("field");
    const id = `barcode${num}`;
    const img = document.createElement("img");
    img.id = id;
    img.style.left = `${randomNum(0, window.innerWidth - 200)}px`;
    img.style.top = `${randomNum(0, window.innerHeight - 100)}px`;
    div.appendChild(img);
    makeBarcode(num,id);
}

function deleteBarcode(num){
    const element = document.getElementById(`barcode${num}`);
    if (element) {
        element.remove();
    }
    Numbers.splice(Numbers.indexOf(num), 1);
    addBarcode();
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
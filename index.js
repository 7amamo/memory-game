
document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("Whats Your Name?");

    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = 'Unknown';
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

let rangeolder = [...Array(blocks.length).keys()]

function shuffle (array) {
    let curent = array.length , temp, random;
    while(curent > 0){

        random = Math.floor((Math.random()*curent));
        curent--;
        temp = array[curent];
        array[curent] = array[random];
        array[random] = array[temp];
    }
}
shuffle(rangeolder);

blocks.forEach((block,index)=>{
    block.style.order = rangeolder[index]
    block.addEventListener("click",function(){
        flipBlock(block);
    })
})




function flipBlock (selectedBlock){
    selectedBlock.classList.add('is-flipped');
    let filter = blocks.filter(function(block){
        return block.classList.contains("is-flipped")
    })
    if (filter.length === 2){
    stopClicking();
    checkMatchedBlocks(filter[0], filter[1]);
    }

}

function stopClicking (){
    blocksContainer.classList.add("no-clicking")

    setTimeout(function(){
        blocksContainer.classList.remove("no-clicking")

    },duration)
}

function checkMatchedBlocks (first,second) {
    let triesElement = document.querySelector('.tries span');
    if (first.dataset.technology === second.dataset.technology){
        first.classList.remove('is-flipped');
        second.classList.remove('is-flipped');

        first.classList.add('has-match');
        second.classList.add('has-match');


    } else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {

            first.classList.remove('is-flipped');
            second.classList.remove('is-flipped');
        }, duration);
    }
}
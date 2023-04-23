var dataset;
var curr = 0;
var prev = [];
var word_status = [];
const nwords = parseInt(GetURLParameter('nwords'));
const word_box = document.getElementById("learnword-box");
d3.tsv("../content/medical.tsv", function(data){
   dataset=d3.shuffle(data);
   update(0);
   });

const wrong = document.getElementById('wrong');
const undo = document.getElementById('undo');
const correct = document.getElementById('correct');

var chinese_large = document.getElementById('chinese-text');
var chinese_small = document.getElementById('chinese-text-small');
var pinyin = document.getElementById('pinyin-text-small');
var meaning = document.getElementById('english-meaning-small');


function Unflip() {
    front.classList.contains("is-flipped") === true ? front.classList.remove("is-flipped") : console.log('Not flipped');
    back.classList.contains("is-flipped") === true ? back.classList.remove("is-flipped") : console.log('Not flipped');
}

correct.addEventListener('click',()=>{
    console.log('correct')
    for (var i = curr+1;i<dataset.length;i++){
        if (i == dataset.length - 1){
            i = 0;
        }
        if (dataset[i].Status == ""){
            dataset[i].Status = "Learnt";
            prev.push(curr);
            word_status.push(1);
            curr = i;
            break;
        }
    }
    update(curr);
    
})

wrong.addEventListener('click',()=>{
    console.log('incorrect')
    for (var i = curr+1;i<dataset.length;i++){
        if (i == dataset.length - 1){
            i = 0;
        }
        if (dataset[i].Status == ""){
            dataset[i].Status = "Incorrect";
            prev.push(curr);
            word_status.push(0);
            curr = i;
            break;
        }
    }
    update(curr);
})

undo.addEventListener('click',()=>{
    console.log('undo')
    if (prev.length > 0){
        dataset[curr].Status = "";
        curr = prev.pop()
        word_status.pop()
        update(curr);
    }
})

function updateFront(i){
    if (dataset[i].Chinese.length == 1) {
        chinese_large.style.fontSize = "220px";
    } else if (dataset[i].Chinese.length == 2) {
        chinese_large.style.fontSize = "150px";
    } else if (dataset[i].Chinese.length == 3) {
        chinese_large.style.fontSize = "100px";
    }

    if(i % 3 == 0){
        word_box.style.backgroundImage = "url('/TianTian/content/flashcardmodebg1.svg')";
        meaning.style.color = '#2D389D';
    } else if (i%3 == 1){
        word_box.style.backgroundImage = "url('/TianTian/content/flashcardmodebg2.svg')";
        meaning.style.color = "#4A2876";
    }
    else{
        word_box.style.backgroundImage = "url('/TianTian/content/flashcardmodebg3.svg')";
        meaning.style.color = "#404773";

    }
    chinese_large.innerHTML=dataset[i].Chinese;
}

function updateBack(i){
    if (dataset[i].Chinese.length == 1) {
        chinese_small.style.fontSize = "220px";
    } else if (dataset[i].Chinese.length == 2) {
        chinese_small.style.fontSize = "150px";
    } else if (dataset[i].Chinese.length == 3) {
        chinese_small.style.fontSize = "100px";
    }
    else if (dataset[i].Chinese.length == 4) {
        chinese_small.style.fontSize = "120px";
    }


    chinese_small.innerHTML=dataset[i].Chinese;
    pinyin.innerHTML=dataset[i].Pinyin;
    meaning.style.fontSize = "45px"
    meaning.innerHTML=dataset[i].English;
}

function update(i){
    if(prev.length == nwords) {
        console.log(word_status)
        removeDiv();
    }
    updateFront(i);
    Unflip();
    setTimeout(function(){
        updateBack(i);
    }, 800);

}

var dataset;
var curr = 0;
var prev = [];
var word_status = [];
var repeat_ = false;
const nwords = parseInt(GetURLParameter('nwords'));
const word_box = document.getElementById("learnword-box");
const count_box = document.getElementById("learnword-counter")
d3.tsv("../content/medical.tsv", function(data){
   dataset=d3.shuffle(data);
   dataset=dataset.filter(function(d){ return d.Status == "" });
   dataset=dataset.slice(0,nwords);
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
    dataset[curr].Status = "Learnt"
    curr = curr+1;
    update(curr);
})

wrong.addEventListener('click',()=>{
    dataset[curr].Status = "Incorrect"
    curr=curr+1;
    update(curr);
})

undo.addEventListener('click',()=>{
    curr=curr-1;
    dataset[curr].Status = "";
    update(curr);
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
    count_box.innerHTML=`${i+1}/${dataset.length}`
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

function count_incorrect(){
    var count_ = 0;
    for (let i=0; i<dataset.length; i++){
        if (dataset[i].Status=="Incorrect"){ count_+=1; }
    }
    return count_;
}

function update(i){
    console.log(dataset)
    if(i == dataset.length) {
        console.log(dataset)
        removeDiv();
    }
    else {
        updateFront(i);
        Unflip();
        setTimeout(function(){
            updateBack(i);
        }, 800);
    }
}
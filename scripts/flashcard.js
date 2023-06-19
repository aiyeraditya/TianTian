var dataset;
const dataRef = getDataRef();
var userData;
var username;
var password;
var learnt_arr = [];
var incorrect_arr = [];
var unseen_arr = [];
getUserData().then(function(result){
    userData = result;
    username = userData.username
    password = userData.password
    assignValues(userData);
});

var curr = 0;
var prev = [];
var word_status = [];
var repeat_ = false;
const nwords = parseInt(GetURLParameter('nwords'));
const word_box = document.getElementById("learnword-box");
const count_box = document.getElementById("learnword-counter");

const wrong = document.getElementById('wrong');
const undo = document.getElementById('undo');
const correct = document.getElementById('correct');

var chinese_large = document.getElementById('chinese-text');
var chinese_small = document.getElementById('chinese-text-small');
var pinyin = document.getElementById('pinyin-text-small');
var meaning = document.getElementById('english-meaning-small');

correct.addEventListener('click',()=>{
    dataset[curr].Status = "Learnt"
    markLearnt(dataset[curr].Idx);
    curr = curr+1;
    update(curr);
})
wrong.addEventListener('click',()=>{
    dataset[curr].Status = "Incorrect"
    markIncorrect(dataset[curr].Idx);
    curr=curr+1;
    update(curr);
})
undo.addEventListener('click',()=>{
    curr=curr-1;
    markUnseen(dataset[curr].Idx);
    dataset[curr].Status = "";
    update(curr);
})

// d3.tsv("../content/medical.tsv", function(data){
//    dataset=d3.shuffle(data);
//    dataset=dataset.filter(function(d){ return d.Status == "" });
//    dataset=dataset.slice(0,nwords);
//    update(0);
//    });


getPropertyVal(dataRef, 'unseen')
.then(function(result){
    d3.tsv("../content/medical.tsv", function(data){
        dataset = result.map(index => data[index]);
        dataset=d3.shuffle(data);
        dataset=dataset.slice(0,nwords);
        update(0);
        });
})

function assignValues(userData){
    unseen_arr = userData.unseen;
    if ('learnt' in userData){
        learnt_arr = userData.learnt;
    }
    if ('incorrect' in userData){
        incorrect_arr = userData.incorrect;
    }
}

function pushData(learnt_arr, incorrect_arr, unseen_arr){
    var userData = {
        username: username,
        password: password,
        learnt: learnt_arr,
        incorrect: incorrect_arr,
        unseen: unseen_arr
      }; 
    dataRef.update(userData)
    .then(() => {
        console.log('Data entry updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating data entry:', error);
      });
}

function markLearnt(idx_update){
    var idx_num = parseInt(idx_update);
    unseen_arr = unseen_arr.filter(item => item !== idx_num);
    incorrect_arr = incorrect_arr.filter(item => item !== idx_num);
    learnt_arr.push(idx_num)
    pushData(learnt_arr, incorrect_arr, unseen_arr)
}

function markIncorrect(idx_update){
    var idx_num = parseInt(idx_update);
    unseen_arr = unseen_arr.filter(item => item !== idx_num);
    learnt_arr = learnt_arr.filter(item => item !== idx_num);
    incorrect_arr.push(idx_num)
    pushData(learnt_arr, incorrect_arr, unseen_arr)
}

function markUnseen(idx_update){
    var idx_num = parseInt(idx_update);
    incorrect_arr = unseen_arr.filter(item => item !== idx_num);
    learnt_arr = learnt_arr.filter(item => item !== idx_num);
    unseen_arr.push(idx_num);
    pushData(learnt_arr, incorrect_arr, unseen_arr)
}

function Unflip() {
    front.classList.contains("is-flipped") === true ? front.classList.remove("is-flipped") : console.log('Not flipped');
    back.classList.contains("is-flipped") === true ? back.classList.remove("is-flipped") : console.log('Not flipped');
}

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
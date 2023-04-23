const timer_bar = document.getElementById('progress-bar');
const chinese_text = document.getElementById('test-text');
const option1 = document.getElementById('test-option1');
const option2 = document.getElementById('test-option2');
const option3 = document.getElementById('test-option3');
const option4 = document.getElementById('test-option4');
const panda = document.getElementById('test-panda');
var choice = 0;
var correct_choice = 2;
var total_correct = 0;
var shown = [];
var numbers = [];
var dataset;

d3.tsv("../content/medical.tsv", function(data){
    dataset=d3.shuffle(data);
    next_choice();
    });

enable_choices();

function enable_choices(){
    option1.addEventListener("click", function() {
        choice = 1;
        process_choice();
    });
    option2.addEventListener("click", function() {
        choice = 2;
        process_choice();
    });
    option3.addEventListener("click", function() {
        choice = 3;
        process_choice();
    });
    option4.addEventListener("click", function() {
        choice = 4;
        process_choice();
    });

    timer_bar.addEventListener("animationend", () => {
        process_choice();
    });
}

function process_choice(){
    timer_bar.classList.add('paused')
    console.log(choice)
    document.getElementById("test-option" + correct_choice).style.background = "#74CB7D";
    if(choice == correct_choice){
        panda.src = "/TianTian/content/panda5.svg";
        total_correct+=1;
    }
    else {
        if(choice > 0){
            document.getElementById("test-option" + choice).style.background = "#FF6363";
        }
        panda.src = "/TianTian/content/panda3.svg"
    }
    setTimeout(function(){
        next_choice();
    }, 3000);
}



function make_random_numbers(){
    numbers = [];
    for(var i = 0; i < 4; ++i) {
        numbers.push(Math.floor(Math.random() * 156));
}
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

function next_choice(){
    timer_bar.classList.remove('timer-bar-animation')

    if (shown.length == 10){
        // Remove All 
        exit_function()
        return
    }
    void timer_bar.offsetWidth;
    timer_bar.classList.add('timer-bar-animation');
    panda.src = "/TianTian/content/panda4.svg";
    make_random_numbers();
    console.log(numbers)
    option1.innerHTML = dataset[numbers[0]].English
    if (dataset[numbers[0]].English.length > 8){
        option1.style.fontSize='20px';
    }
    option2.innerHTML = dataset[numbers[1]].English
    if (dataset[numbers[1]].English.length > 8){
        option2.style.fontSize='20px';
    }
    option3.innerHTML = dataset[numbers[2]].English
    if (dataset[numbers[2]].English.length > 8){
        option3.style.fontSize='20px';
    }
    option4.innerHTML = dataset[numbers[3]].English
    if (dataset[numbers[3]].English.length > 8){
        option4.style.fontSize='20px';
    }
    option1.style.background = '#B5D5F2'
    option2.style.background = '#B5D5F2'
    option3.style.background = '#B5D5F2'
    option4.style.background = '#B5D5F2'
    var ordering_ = shuffle([0,1,2,3])
    correct_choice = ordering_[0] + 1
    shown.push(numbers[ordering_[0]])
    choice = 0
    chinese_text.innerHTML = dataset[numbers[ordering_[0]]].Chinese
    if (dataset[numbers[ordering_[0]]].Chinese.length < 2) {
        chinese_text.style.fontSize = '150px'
    }
    else if (dataset[numbers[ordering_[0]]].Chinese.length == 3) {
        chinese_text.style.fontSize = '90px'
    }
    else if (dataset[numbers[ordering_[0]]].Chinese.length == 4) {
        chinese_text.style.fontSize = '70px'
    }
    
    timer_bar.classList.remove('paused')
}

function exit_function(){
    console.log('Finish Here' + total_correct)
    document.getElementById('test-container').remove();
    const congrats_div = document.createElement('div');
    congrats_div.className = 'test-congrats';
    congrats_div.innerHTML = 'Congragulations! You scored';

    const score_div = document.createElement('div');
    score_div.className = 'test-score';
    score_div.innerHTML = total_correct + '/10'

    const play_again = document.createElement('div');
    play_again.className = 'test-play-again';
    play_again.innerHTML = 'Play Again';
    play_again.addEventListener("click", function(){
        window.location.href = '/TianTian/test-yourself/';
    })

    const exit_ = document.createElement('div');
    exit_.className = 'test-exit';
    exit_.innerHTML = 'Exit';
    exit_.addEventListener("click", function(){
        window.location.href = '/TianTian/';
    })

    const congrats_panda = document.createElement('div');
    congrats_panda.className = 'test-panda-congrats';
    const img_tag = document.createElement("img");
    img_tag.src = '/TianTian/content/panda2.svg'
    congrats_panda.appendChild(img_tag)

    const div_wrapper = document.createElement('div')
    div_wrapper.append(congrats_div);
    div_wrapper.append(score_div);
    div_wrapper.append(play_again);
    div_wrapper.append(exit_);
    div_wrapper.append(congrats_panda);
  
    const container = document.getElementById('container');
    container.appendChild(div_wrapper)
}
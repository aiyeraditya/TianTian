const front = document.getElementById('flip-card-front')
const back = document.getElementById('flip-card-back')
const btn = document.getElementById('learnword-box')
const card_div = document.getElementById('learnword-content')
const container = document.getElementById('container');

function handleFlip() {
  front.classList.toggle('is-flipped')
  back.classList.toggle('is-flipped')
}

btn.addEventListener('click', handleFlip)

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1]
        }
    }
}

function redo_wrong_words(){
    document.getElementById('final-screen-wrap').remove()
    container.append(card_div)
    container.append(count_box)
    curr=0;
    dataset=dataset.filter(function(d){ return d.Status == "Incorrect" });
    console.log('Repeating')
    console.log(dataset)
    update(0);
  }

function removeDiv(){
    card_div.remove();
    count_box.remove();
    const congrats_div = document.createElement('div');
    congrats_div.className = 'learnword-congrats';
    const words_correct = nwords - count_incorrect();
    if (words_correct > 0){
        congrats_div.innerHTML = 'Congratulations! You have learnt';
    }
    else{
        congrats_div.innerHTML = 'You Have Learnt';
    }
    const word_num_div = document.createElement('div');
    word_num_div.className = 'learnword-wordnum';
    word_num_div.innerHTML = words_correct;
  
    const new_words_div = document.createElement('div');
    new_words_div.className = 'learnword-new-words';
    if (words_correct == 1){
        new_words_div.innerHTML = 'New Word';
    }
    else{
        new_words_div.innerHTML = 'New Words';
    }
  
    const congrats_panda = document.createElement('div');
    congrats_panda.className = 'learnword-congrats-panda';
  
    const next_set = document.createElement('div');
    next_set.id = 'learnword-next'
    next_set.className = 'learnword-next-set';
    next_set.innerHTML = 'Start Next Set';
    next_set.addEventListener("click", function(){
        window.location.href = '/TianTian/learn-new-words';
    })

    const redo_wrong = document.createElement('div');
    redo_wrong.id = 'redo-wrong'
    redo_wrong.className = 'learnword-redo-wrong';
    redo_wrong.innerHTML = 'Redo Incorrect Words'
    redo_wrong.addEventListener("click", redo_wrong_words)
  
    const div_wrapper = document.createElement('div')
    div_wrapper.id = 'final-screen-wrap'
    div_wrapper.append(congrats_div);
    div_wrapper.append(word_num_div);
    div_wrapper.append(new_words_div);
    div_wrapper.append(congrats_panda);
    div_wrapper.append(next_set);
    if (words_correct < nwords) {
        div_wrapper.append(redo_wrong);
    }
  
    container.appendChild(div_wrapper);
  }


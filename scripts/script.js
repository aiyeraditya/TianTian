const front = document.getElementById('flip-card-front')
const back = document.getElementById('flip-card-back')
const btn = document.getElementById('wordoftheday_box')

function handleFlip() {
  front.classList.toggle('is-flipped')
  back.classList.toggle('is-flipped')
}
btn.addEventListener('click', handleFlip)

getUserData()
  .then(function(result) {
    var userData = result;
    var unseen = 0;
    var learnt = 0;
    var incorrect = 0;
    if (userData.hasOwnProperty('learnt')){
      learnt = userData.learnt.length
    }
    if (userData.hasOwnProperty('unseen')){
      unseen = userData.unseen.length
    }
    if (userData.hasOwnProperty('incorrect')){
      incorrect = userData.incorrect.length
    }
    const ctx = document.getElementById('myChart');
    make_chart(ctx, learnt,incorrect, unseen);
    updateProgressText(learnt, incorrect, unseen);
  })
  .catch(function(error) {
    console.error(error);
  });

function updateProgressText(learnt, incorrect, unseen){
  document.getElementById('wordslearnt').innerHTML = learnt;
  document.getElementById('wordsnotlearnt').innerHTML = incorrect;
  document.getElementById('unknownwords').innerHTML = unseen;
}

function make_chart(ctx, learnt, incorrect, unseen){
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Learnt',
        'Not Learnt',
        'Unknown'
      ],
      datasets: [{
        label: 'Learning Stats',
        data: [learnt, incorrect, unseen],
        backgroundColor: [
          '#C178B1',
          '#5240BF',
          '#7D66B2'
        ],
        hoverOffset: 1,
        borderWidth: 0,
        devicePixelRatio: 4,
      }]
    },
    options: {
      plugins: {
        tooltip: {
          enabled: false
        }
      }
    },
  });
  Chart.overrides.doughnut.plugins.legend.display = false;
  //Chart.options.plugins.tooltip.enabled = true;
}


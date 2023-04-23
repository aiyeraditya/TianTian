const front = document.getElementById('flip-card-front')
const back = document.getElementById('flip-card-back')
const btn = document.getElementById('wordoftheday_box')

function handleFlip() {
  front.classList.toggle('is-flipped')
  back.classList.toggle('is-flipped')
}

btn.addEventListener('click', handleFlip)

const ctx = document.getElementById('myChart');

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
        data: [100, 150, 79],
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
  Chart.options.plugins.tooltip.enabled = false;

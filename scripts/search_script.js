$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "../content/medical.csv",
    dataType: "text",
    success: function(data) {
      processData(data);
    }
  });
});


const word_box = document.getElementById('word_list')

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  
  for (var i = 1; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(',');
    var iDiv = document.createElement('div');
    iDiv.id = data[0];
    iDiv.className = 'word-box mt-3';

    var content = document.createTextNode(data[0]);
    var iDiv_chinese = document.createElement('div');
    iDiv_chinese.id = `${data[0]}chinese`;
    iDiv_chinese.className = 'word-box-chinese';
    iDiv_chinese.appendChild(content)
    iDiv.appendChild(iDiv_chinese)

    content = document.createTextNode(data[1]);
    var iDiv_english = document.createElement('div');
    iDiv_english.id = `${data[0]}english`;
    iDiv_english.className = 'word-box-english';
    if (content.length > 8) {
      iDiv_english.style.fontSize = "30px";
      iDiv_english.style.marginTop =  "6px";
    }
    else{
      iDiv_english.style.fontSize = "40px"
      iDiv_english.style.marginTop =  "12px";
    }
    iDiv_english.appendChild(content)
    iDiv.appendChild(iDiv_english)
    const word = data[0];
    iDiv.addEventListener('click',()=>{
      window.location.href = `/TianTian/wordcard/?word=${word}` ;
   })
    word_box.appendChild(iDiv);
  }
}


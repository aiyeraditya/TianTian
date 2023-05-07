d3.tsv("../content/medical.tsv", function(data){
  for (var i=0; i < data.length; i++) {
    processData_new(data[i])
  } 
});

const word_box = document.getElementById('word_list')

function processData_new(data) {
  var iDiv = document.createElement('div');
  iDiv.id = data.Chinese
  iDiv.className = 'word-box mt-3';

  var content = document.createTextNode(data.Chinese);
  var iDiv_chinese = document.createElement('div');
  iDiv_chinese.id = `${data.Chinese}chinese`;
  iDiv_chinese.className = 'word-box-chinese';
  iDiv_chinese.appendChild(content)
  iDiv.appendChild(iDiv_chinese)

  content = document.createTextNode(data.Pinyin);
  var iDiv_english = document.createElement('div');
  iDiv_english.id = `${data.Chinese}english`;
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
  const word = data.Chinese;
  iDiv.addEventListener('click',()=>{
    window.location.href = `/TianTian/wordcard/?word=${word}` ;
  })
  word_box.appendChild(iDiv);
}
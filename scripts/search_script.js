var dataset;
var temp_dataset;
var ischinese;
var ispinyin;
var isenglish;

d3.tsv("../content/medical.tsv", function(data){
  dataset = data;
  for (var i=0; i < data.length; i++) {
    processData(data[i])
  } 
});

const word_box = document.getElementById('word_list')
const word_search = document.getElementById('word-search')
word_search.addEventListener("keyup", function(){
  console.log(this.value)
  search_subset(this.value)
})

function processData(data) {
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

function search_subset(search_word){
  if (search_word == ""){
    for (var i = 0; i < dataset.length; i++){
      document.getElementById(dataset[i].Chinese).style.display = "";
    }
  }
  else{
    for (var i = 0; i < dataset.length; i++){
      ischinese = dataset[i].Chinese.includes(search_word);
      ispinyin = dataset[i].Pinyin.includes(search_word);
      isenglish = dataset[i].English.includes(search_word);
      if (!(ischinese || isenglish || ispinyin)){
        document.getElementById(dataset[i].Chinese).style.display = "none";
      }
      else{
        document.getElementById(dataset[i].Chinese).style.display = "";
      }
    }
  }
}
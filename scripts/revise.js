d3.tsv("../content/medical.tsv", function (d) {
    for (var i=1; i < d.length; i++) {
        process(d[i])
    }
});
const word_box = document.getElementById('word_list')

function process(d){
    if (d.Status=="Learnt"){
        var iDiv = document.createElement('div');
        iDiv.id = d.Chinese;
        iDiv.className = 'word-box mt-3';
    
        var content = document.createTextNode(d.Chinese);
        var iDiv_chinese = document.createElement('div');
        iDiv_chinese.id = `${d.Chinese}chinese`;
        iDiv_chinese.className = 'word-box-chinese';
        iDiv_chinese.appendChild(content)
        iDiv.appendChild(iDiv_chinese)
    
        content = document.createTextNode(d.Pinyin);
        var iDiv_english = document.createElement('div');
        iDiv_english.id = `${d.Chinese}english`;
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
        const word = d.Chinese;
        iDiv.addEventListener('click',()=>{
            window.location.href = `/TianTian/wordcard/?word=${word}` ;
        })
        word_box.appendChild(iDiv);
    }
}
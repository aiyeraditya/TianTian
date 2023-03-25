const fontsize_options = ['', '220px', '150px', '100px'];

d3.tsv("../content/test.tsv", function(data){
    var curr = GetCurrentWord(data);
    const wordchinese = document.getElementById("wordcard-chinese");
    const wordcard = document.getElementById("wordcard")
    wordchinese.innerHTML = curr.Chinese;
    wordchinese.style.fontSize = fontsize_options[curr.Chinese.length]
    UpdateCard(curr);
    });

function UpdateCard(curr){
    document.getElementById("wordcard-pinyin").innerHTML = curr.Pinyin;
    document.getElementById("wordcard-meaning").innerHTML = `Meaning:  ${curr.English}`;
    document.getElementById('wordcard-sentence-chinese').innerHTML = curr.Sentence;
    document.getElementById('wordcard-sentence-pinyin').innerHTML = curr.Sentence_Pinyin;
    document.getElementById('wordcard-sentence-english').innerHTML = curr.Sentence_English;

    document.getElementById("wordcard-audio").onclick = function () {
        new Audio(`/TianTian/content/audio_files/${curr.Audio}`).play();
    }
    document.getElementById("strokeorder").onclick = function () {
        document.getElementById('strokeorder-box').style.display = "block";
        document.getElementById("strokeorder-video").src = '/TianTian/content/strokeorder/' + curr.Stroke_Order;
        setTimeout(function(){
            document.getElementById('strokeorder-box').style.display = "None";
            document.getElementById("strokeorder-video").src = ''    
        }, 10000*curr.Chinese.length);
    }
}

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

function GetCurrentWord(data)
{
    var word = decodeURIComponent(GetURLParameter('word'));
    for (var i=0; i < data.length; i++)
    {
        if (data[i].Chinese == word)
        {
            return data[i]
        }
    }
    return 0
}

document.getElementById("goback").onclick = function () {
    location.href = "/TianTian/search/";
};
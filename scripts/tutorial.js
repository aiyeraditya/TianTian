function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

function addFadeIn( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 100;
}

var current_screen = 1;
const panda = document.getElementById('tutorial-panda')

document.getElementById('tutorial-tap').addEventListener("click", function() {
    if (current_screen == 2){
        panda.src = "../content/panda2.svg"
    }
    else if (current_screen == 3){
        panda.src = "../content/panda5.svg"
    }
    else if (current_screen == 4){
        panda.src = "../content/panda2.svg"
    }
    else if (current_screen == 6){
        panda.src = "../content/panda1.svg"
    }
    else if (current_screen == 10){
        panda.src = "../content/panda5.svg"
    }
    removeFadeOut(document.getElementById(`tutorial-screen${current_screen}`), 1000);
    setTimeout(function(){
        addFadeIn(document.getElementById(`tutorial-screen${current_screen+1}`), 2000);
        current_screen+=1;
    }, 500);
});
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
const panda = document.getElementById('tutorial-panda');
const tutorial_container = document.getElementById('container-tutorial');

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
        panda.src = "../content/panda1.svg";
        tutorial_container.style.backgroundImage = "url('../content/tutorial5.svg')";
        console.log('Trying to change background')
    }
    else if (current_screen == 7){
        tutorial_container.style.backgroundImage = "url('../content/tutorial6.svg')";
    }
    else if (current_screen == 8){
        tutorial_container.style.backgroundImage = "url('../content/tutorial7.png')";
    }
    else if (current_screen == 9){
        tutorial_container.style.backgroundImage = "url('../content/tutorial8.svg')";
    }
    else if (current_screen == 10){
        panda.src = "../content/panda5.svg"
        tutorial_container.style.backgroundImage = "";
    }
    else if (current_screen == 11){
        window.location.href = "../";
    }
    removeFadeOut(document.getElementById(`tutorial-screen${current_screen}`), 1000);
    setTimeout(function(){
        addFadeIn(document.getElementById(`tutorial-screen${current_screen+1}`), 2000);
        current_screen+=1;
    }, 500);
});
// Create an array of resources to preload
var resourcesToLoad = [
    "content/panda1.svg",
    "content/panda2.svg",
    "content/panda3.svg",
    "content/panda4.svg",
    "content/panda5.svg",
    "content/tutorial5.svg",
    "content/tutorial6.svg",
    "content/tutorial7.png",
    "content/tutorial8.svg",
    "content/revise-words-card-bg.svg",
    "content/incorrect-words-bg.svg",
    "content/new-words-card-bg.svg"
];

// Create a function to preload the resources
function preloadResources() {
  // Display the loading page
  var loadingPage = document.getElementById("loading");
  var container = document.getElementById("container");
  loadingPage.style.display = "block";
  // Create a counter to keep track of loaded resources
  var loadedResources = 0;
  
  for (var i = 0; i < resourcesToLoad.length; i++) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", resourcesToLoad[i], true);
    
    // Use the onreadystatechange event to check when each resource is loaded
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Update the loading message to indicate that the resource is loaded
        loadedResources++;
        var loadingMessage = document.getElementById("loading-message");
        loadingMessage.innerHTML = "Loading resource " + loadedResources + " of " + resourcesToLoad.length;
        
        // Perhaps the check for login and node can be done here instead
        // Hide the loading page and display the website once all the resources are loaded
        if (loadedResources == resourcesToLoad.length) {
          loadingPage.style.display = "none";
          container.style.display = "block";
        }
      }
    };
    xhr.send();
  }
}

// Call the preload function when the root link is visited
window.onload = function() {
  preloadResources();
}
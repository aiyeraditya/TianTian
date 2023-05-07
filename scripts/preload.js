// Create an array of resources to preload
var resourcesToLoad = [
    "content/panda1.svg",
    "content/panda2.svg",
    "content/panda3.svg"
];

// Create a function to preload the resources
function preloadResources() {
  // Display the loading page
  var loadingPage = document.getElementById("loading");
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
        
        // Hide the loading page and display the website once all the resources are loaded
        if (loadedResources == resourcesToLoad.length) {
          loadingPage.style.display = "none";
          document.body.style.display = "block";
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
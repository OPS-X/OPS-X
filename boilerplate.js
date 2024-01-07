/* diagnostics */

function listMediaElements() {
    var audioElements = document.querySelectorAll('audio');
    var videoElements = document.querySelectorAll('video');
    var mediaInfo = [];

    audioElements.forEach(function(audio, index) {
        mediaInfo.push("Audio " + (index + 1) + ": ID = " + audio.id + ", Source = " + (audio.src || "No source"));
    });

    videoElements.forEach(function(video, index) {
        mediaInfo.push("Video " + (index + 1) + ": ID = " + video.id + ", Source = " + (video.src || "No source"));
    });

    alert("Found " + audioElements.length + " audio elements and " + videoElements.length + " video elements:\n" + mediaInfo.join("\n"));
}

/*///////  IFRAME /////////////*/


//this function is to check if an iframe is active - sheetmaster will check this to decide which function to use when navigating to a sheet
function checkIframeActivated() {
    var iframe = document.getElementById('sheetFrame');
    var iframeStatusElement = document.getElementById('iframeStatus');

    if (iframe && iframe.src) {
        iframeStatusElement.innerText = 'Activated';
    } else {
        iframeStatusElement.innerText = 'Deactivated';
    }
}

function reloadIframeOnSuccess(success) {
    if (success) {
        // Reload the iframe
        var iframe = document.getElementById('sheetFrame');
        iframe.src = iframe.src;
    } else {
        alert("Failed to rearrange sheets.");
    }
}

function updateIframe() {
  google.script.run.withSuccessHandler(function(url) {
    document.getElementById('sheetFrame').src = url;
  }).getActiveSpreadsheetUrl();
}

function updateIframeSpecific() {
var url = 'https://docs.google.com/spreadsheets/d/1-TR43KKdvSKfS-jODUbZtN1pVWGnIOs6Ik1M8XIqMMI/edit?usp=sharing';
document.getElementById('sheetFrame').src = url;
}


//this code works, but the method doesn't - gid is only usable in published versions of the sheet (not edittable) 
function switchSheet(gid) {
var base_url = 'https://docs.google.com/spreadsheets/d/1-TR43KKdvSKfS-jODUbZtN1pVWGnIOs6Ik1M8XIqMMI/edit';
var new_src = base_url + '?usp=sharing&gid=' + gid;
document.getElementById('sheetFrame').src = new_src;
}



/*///////  TOGGLE AND VISIBILITY AT LAUNCH /////////////*/


/* regular version - just adds the element that is turned visible */
function toggleContainer(containerId) {
    // Play the toggle sound
    var sound = document.getElementById('toggleSound');
    sound.volume = 0.1; // Set volume to 10%, adjust as needed
    sound.play();
    var container = document.querySelector(containerId);
    console.log("Toggling container: ", containerId);

    // Log current computed display status before toggling
    var currentComputedDisplayStatus = window.getComputedStyle(container).display;
    console.log("Current computed display status: ", currentComputedDisplayStatus);

    // Toggle visibility
    container.style.display = currentComputedDisplayStatus === 'none' ? '' : 'none';

    // Get and log new set display status after toggling
    var newSetDisplayStatus = container.style.display;
    console.log("New set display status: ", newSetDisplayStatus);

    // Get and log new computed display status after toggling
    var newComputedDisplayStatus = window.getComputedStyle(container).display;
    console.log("New computed display status: ", newComputedDisplayStatus);

    // Additional checks for visibility
    console.log("Is element offsetHeight > 0 (visible): ", container.offsetHeight > 0);
    console.log("Is element offsetWidth > 0 (visible): ", container.offsetWidth > 0);


}


/* this version removes the 3rd element in case another one is toggled into visibility - which results in a replacement effect */
function toggleContainer(containerId) {
  
    var sound = document.getElementById('toggleSound'); // Get the audio element for toggle sound
    var container = document.querySelector(containerId);
    var isElement3 = Array.from(container.classList).some(className => className.includes('element3'));
    sound.volume = 0.1; // Set volume to 50%, adjust this value between 0.0 and 1.0 as needed


    console.log("Toggling container: ", containerId, " Is Element 3: ", isElement3);

    if (isElement3) {
        var allElement3s = document.querySelectorAll('[class*="element3"]');
        allElement3s.forEach(function(el) {
            if (el !== container) {
                console.log("Hiding element: ", el);
                el.style.display = 'none';
                sound.play();


            }
        });
    }

    // Toggle visibility
    sound.volume = 0.1;
    sound.play();

    container.style.display = container.style.display === 'none' ? '' : 'none';
    console.log("New display status of ", containerId, ": ", container.style.display);
}


function syncToggleSections(visibleSectionId) {
    var sectionIds = [
        'controlCenterSection', 
        'configSection', 
        'artificialIntelligenceSection', 
        'webDevelopment', 
        'googleSheetsSection', 
        'designSection',
        'secondary-interface',
        'audioSection',
    ];

    // Default behavior when no specific section is provided
    if (!visibleSectionId) {
        sectionIds.forEach(function(sectionId) {
            var section = document.querySelector('#' + sectionId);
            section.style.display = 'none';
        });
    } else {
        // Ensure the specified section remains fully visible
        var visibleSection = document.querySelector('#' + visibleSectionId);
        visibleSection.style.display = '';

        // Set all other sections to the opposite state (none)
        sectionIds.forEach(function(sectionId) {
            if (sectionId !== visibleSectionId) {
                var section = document.querySelector('#' + sectionId);
                section.style.display = 'none';
            }
        });
    }

    // Play the toggle sound
    var sound = document.getElementById('toggleSound');
    sound.volume = 0.1;
    sound.play();
}





    /*
    function toggleContainerFLEX(containerId) {
      var container = document.querySelector(containerId);
      var sound = document.getElementById('toggleSound'); // Get the audio element for toggle sound
      sound.volume = 0.1; // Set volume to 50%, adjust this value between 0.0 and 1.0 as needed


      if (container.style.display === 'none') {
          container.style.display = 'flex'; // Set to the original display style
          sound.play(); // Play the sound
      } else {
          container.style.display = 'none';
          sound.play(); // Play the sound
      }
    }
    */

    // !this one can be removed soon ! JavaScript for toggleDataContainerWithJQuery
    function toggleDataContainerWithJQuery() {
        $('.dataContainer').toggle(); // This will toggle the visibility
        $('.dataContainer').toggleClass('fullscreen'); // This will toggle the fullscreen class
    }

/*///////// CONTROL CENTER ///////////////*/

// Specific function to display global variables
function showReportGlobalVars() {
    var globalVars = [
        { name: "databaseConfigData", data: databaseConfigData },
        { name: "databaseData", data: databaseData },
        { name: "databaseList", data: databaseList },
        { name: "configTable", data: configTable },
        { name: "onloadSettings", data: onloadSettings }
    ];

    showReportInDialog(globalVars);
}





function launchGoogleCloudLogging() {
  var url = "https://console.cloud.google.com/logs/query;cursorTimestamp=2023-12-19T18:39:03.456160Z;duration=PT3H?authuser=0&project=retool-test-403808";
  window.open(url, 'Cloud Logging', 'width=800,height=600,scrollbars=yes,resizable=yes');
}

function testLog() {
  console.log('Net state changed from IDLE to BUSY');
}

function resetClientSideVars() {
    databaseConfigData = null; // Reset to null
    databaseData = null; // Reset to null
    databaseList = []; // Reset to an empty array
    configTable = null; // Reset to null
    onloadSettings = {}; // Reset to an empty object

    console.log("All client-side variables have been reset.");

    showReportGlobalVars();
}

function resetServerSideCacheKeys() {
showSpinner('resetServerSideCacheKeysButton');
google.script.run
  .withSuccessHandler(function(message) {
    displayLog(message);
    hideSpinner('resetServerSideCacheKeysButton');

  })
  .resetServerSideCacheKeys();
}


function displayLog(message) {
var logContainer = document.getElementById('serverSideLogs');
logContainer.textContent += message + "\n"; // Append the message to the log container
}






/* ------------ GLOBAL VAR SLIDESHOW  ---------------- */

var mastersheetART; // Global variable to store the fetched image links
var slideshowInterval; // To keep track of the slideshow interval
var isSlideshowRunning = false;
var currentIndex = 0; // Global index to keep track of the current image


/* -------------------------------------------------   */

//temp fun slideshow
function toggleSlideshow() {
    var button = document.getElementById('toggleSlideshowButton');

    if (isSlideshowRunning) {
        stopSlideshow();
        button.textContent = 'Start Slideshow'; // Change button text to 'Start Slideshow'
        isSlideshowRunning = false;
    } else {
        startSlideshow();
        button.textContent = 'Stop Slideshow'; // Change button text to 'Stop Slideshow'
        isSlideshowRunning = true;
    }
}

function startSlideshow() {
    if (mastersheetART && mastersheetART.length > 0 && !isSlideshowRunning) {
        function updateIframeContent() {
            var iframe = document.getElementById('sheetFrame');
            var htmlContent = `
                <html>
                    <head>
                        <style>
                            body, html {
                                margin: 0;
                                padding: 0;
                                height: 100%;
                                width: 100%;
                                text-align: center; /* Center content horizontally */
                            }
                            img {
                                max-width: 100%;
                                height: auto;
                                display: inline-block; /* Inline block for horizontal centering */
                                margin: 0 auto; /* Auto margins for horizontal centering */
                                border-radius: 4px;
                                box-shadow: 0 0 15px rgba(255, 255, 255, 0.6); /* Glowing border effect */
                                transition: box-shadow 0.3s ease; /* Smooth transition for hover effect */
                            }
                            img:hover {
                                box-shadow: 0 0 25px rgba(255, 255, 255, 0.8); /* Enhanced glow on hover */
                            }
                            /* Additional styling here */
                        </style>
                    </head>
                    <body>
                        <img src="${mastersheetART[currentIndex]}" alt="Slideshow Image">
                        <!-- More content can be added here -->
                    </body>
                </html>
            `;

            iframe.srcdoc = htmlContent;
            currentIndex = (currentIndex + 1) % mastersheetART.length;
        }

        updateIframeContent();
        clearInterval(slideshowInterval);
        slideshowInterval = setInterval(updateIframeContent, 4000); // Adjust time as needed
        isSlideshowRunning = true;
    }
}

function stopSlideshow() {
  clearInterval(slideshowInterval); // Clear the interval set by startSlideshow
  isSlideshowRunning = false;
}

function fetchImagesFromSheet() {
  google.script.run.withSuccessHandler(onFetchImagesSuccess).getLinksFromSheet();
}

function onFetchImagesSuccess(links) {
  mastersheetART = links;

  // Check if there are any links
  if (mastersheetART.length > 0) {
      console.log('Slideshow: 1st image link:', mastersheetART[0]);
      console.log('Slideshow; Last image link:', mastersheetART[mastersheetART.length - 1]);
  } else {
      console.log('No image links fetched.');
  }
}

/* ---------------------------------------------------------------------------------------------------- */

/* other toggle buttons */

function toggleSheet() {
    var button = document.getElementById('toggleSheetButton');

    if (loadActiveSheet) {
        // When turning off active sheet loading
        button.textContent = 'Load Active Sheet'; // Change button text to 'Load Active Sheet'
        loadActiveSheet = false;

        // Update the iframe with a blank sheet
        updateSheetFrame(''); // Passing an empty string to indicate a blank sheet
    } else {
        // When turning on active sheet loading
        button.textContent = 'Load Blank Sheet'; // Change button text to 'Load Blank Sheet'
        loadActiveSheet = true;

        // Call getActiveWorkbook(), which should handle everything related to the active workbook
        getActiveWorkbook();
    }
}


/*  ---- */




// CSS related

function reloadCSSMT() {
    var timestamp = new Date().getTime();
    var boilerplateCSS = document.getElementById("boilerplateCSS");
    var opsXCSS = document.getElementById("opsXCSS");
    var htmlMaster = document.getElementById("htmlMaster");
    var opsxTabulator = document.getElementById("opsxTabulator"); // Get the Tabulator CSS element

    boilerplateCSS.href = "https://drive.google.com/uc?id=1eodjKJMmM1ex2HiXkSxWP45N2zJCT2Dd&t=" + timestamp;
    opsXCSS.href        = "https://drive.google.com/uc?id=1-0r9K9QYnAWhtlL49tImhgK8UiH0WKqO&t=" + timestamp;
    htmlMaster.href     = "https://drive.google.com/uc?id=1KWPZCtEaKjdg5S8xphfsPWKVhshj6hvB&t=" + timestamp;
    opsxTabulator.href  = "https://drive.google.com/uc?id=1nxt1cQChT3gey9Xe81AHV0jAupiFKYXJ&t=" + timestamp; // Update the Tabulator CSS link

    // Delay the message display by 2 seconds
    setTimeout(function() {
        var userAlertContainer = document.getElementById("userAlertContainer");
        userAlertContainer.innerHTML = "<p>Stylesheets reloaded successfully!</p>";
    }, 2000); // 2000 milliseconds = 2 seconds
}




function toggleFullScreen() {
    var fullScreenButton = document.getElementById('launchFullScreenButton');

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        }).then(() => {
            // Change button text after entering full screen
            fullScreenButton.textContent = 'Exit Full Screen';
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
                // Change button text after exiting full screen
                fullScreenButton.textContent = 'Full Screen';
            });
        }
    }
}

function initializeSelect2Components() {
    // Initialize Select2 on all select elements
$('select:not(#functionNamesSelection, #rangeSelection, #trackSelector, #htmlFileDropdown, #smWorkBookSelection').select2({ width: '100%' });

}

function showSpinner(buttonId) {
    var button = document.getElementById(buttonId);
    if (button) {
        button.innerHTML = '<div class="spinner"><\/div>';
        button.disabled = true;
    }
}

function hideSpinner(buttonId, originalText) {
    var button = document.getElementById(buttonId);
    if (button) {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

function reloadSidebar() {
showSpinner('reloadSidebarButton'); // Show spinner at the start
    google.script.run.launchMaster();
}


function currentTime() {
    var now = new Date();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var timeString = hours + ':' + minutes;
    document.getElementById('currentTime').textContent = timeString;
}

// Update time every minute
setInterval(currentTime, 60000);

function displayResolution() {
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    document.getElementById("resolution").textContent = screenWidth + "x" + screenHeight;
}

function closeDialog(dialogId) {
    var dialog = document.getElementById(dialogId);
    if (dialog) {
        // Close the specific dialog
        dialog.style.display = 'none';  // This hides the dialog

        // Alternatively, if you're using a method to close the dialog, use it here
        // For example, if you have a specific framework or library method for closing dialogs
    } else {
        console.error('Dialog with ID ' + dialogId + ' not found.');
    }
}


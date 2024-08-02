// ==UserScript==
// @name         Escape Button and ENUM modifier
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  try to take over the world!
// @author       Roy Espinosa
// @match        *appsheet*
// @include      *appsheet*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=appsheet.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var popUp = null;
    var doneButton = null;


    // Callback function to execute when mutations are observed
    var callback = function(mutationsList, observer) {
        // Function to execute when the Escape key is pressed

        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('role') === 'presentation') {
                        popUp = node;

                        // Clone the item and append it to the specified location
                        const itemToClone = document.getElementById('enumListButton');
                        if (itemToClone) {
                            const clonedItem = itemToClone.cloneNode(true);
                            const targetContainer = popUp.querySelector('.ActionControls');
                            if (targetContainer) {
                                targetContainer.appendChild(clonedItem);

                            }
                        }
                    }
                });
            }
        }
    };

    // Select the node that will be observed for mutations
    var targetNode = document.body;

    // Options for the observer (which mutations to observe)
    var config = { childList: true, subtree: true };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);





    // Function to execute when the Escape key is pressed
    function clickDone() {
        var buttonElements = document.querySelectorAll('[type="button"]');
        var doneButton = Array.from(buttonElements).find(button => button.innerText === 'Done');
        if (doneButton) {
            doneButton.click();
        }
    }


    // Add the event listener for the keydown event in the capturing phase
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            clickDone();
        }
    }, true); // The third argument `true` makes the event listener run in the capturing phase

})();

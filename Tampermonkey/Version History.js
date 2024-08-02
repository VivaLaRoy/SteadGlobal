// ==UserScript==
// @name         Version History
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

    function convertToCentralTimeAndFormat(utcDateString) {
        // Parse the UTC date string to a Date object
        var utcDate = new Date(utcDateString);

        // Define the options for the time formatting
        var timeOptions = {
            timeZone: 'America/Chicago', // Central Time Zone
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Use 12-hour format with AM/PM
        };

        // Define the options for the date formatting
        var dateOptions = {
            timeZone: 'America/Chicago', // Central Time Zone
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        // Convert to Central Time and format time and date
        var centralTime = utcDate.toLocaleTimeString('en-US', timeOptions);
        var centralDate = utcDate.toLocaleDateString('en-US', dateOptions);

        return `<b>${centralTime}</b> on ${centralDate}`;
    }

    // mutation with only class name and not attribute!
    /*
    var callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('VersionHistoryResults')) {
                        var popUp = node;
                        console.log(popUp);
                    }
                });
            }
        }
    };

    // Select the node to be observed
    var targetNode = document.body; // Change this to the specific parent node if needed

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Configuration of the observer (which mutations to observe)
    var config = { childList: true, subtree: true };

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    */



    // Detect a change in class from node.getAttribute('data-path') === 'Manage,Versions,History')
    // Where that node with that attribute changes its class from class="ExpandingSection Section_History"
    // to
    // class="ExpandingSection Open Section_History"

    // Define the callback function to be executed when mutations are observed
    var popUp = null;
    var callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const node = mutation.target;
                if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('data-path') === 'Manage,Versions,History') {
                    popUp = node
                    // Convert UTC to central time.
                    var resultsTable = popUp.querySelector('.ResultsTable')
                    var rows = resultsTable.querySelectorAll('tr');

                    rows.forEach(function(row) {
                        var cells = row.querySelectorAll('td');
                        cells.forEach(function(cell) {
                            var originalTime = cell.textContent;
                            if (Date.parse(originalTime)) {
                                var centralTimeAndDate = convertToCentralTimeAndFormat(originalTime);
                                cell.innerHTML = centralTimeAndDate;
                            }
                        });
                    });
                }
            }
        }
    };

    // Select the node to be observed
    var targetNode = document.body; // Change this to the specific parent node if needed

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Configuration of the observer (which mutations to observe)
    var config = { attributes: true, attributeFilter: ['class'], subtree: true };

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);




})();

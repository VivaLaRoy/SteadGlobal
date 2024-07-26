// ==UserScript==
// @name         Appsheet Buttons
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

    // All functions use asyn sleep
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // THE FOLLOWING ARE FUNCTIONS FOR THE BUTTON CREATIONS
    var standardColumnsIcon = 'https://github.com/VivaLaRoy/SteadGlobal/blob/main/Tampermonkey/send.png?raw=true';
    var enumListIcon = 'https://github.com/VivaLaRoy/SteadGlobal/blob/main/Tampermonkey/list.png?raw=true';


    // Function to duplicate an element by its class name
    function duplicateElementByClassName(className, newIconUrl, newIconID, newIconTitle, newIconFunction) {
        // Find the element by its class name
        var elementToDuplicate = document.querySelector(`.${className}`);

        if (elementToDuplicate) {
            // Clone the element without its event listeners
            var clonedElement = elementToDuplicate.cloneNode(true);

            // Create a new element from the clone to remove any event listeners
            var newElement = clonedElement.cloneNode(true);
            newElement.id = newIconID;
            newElement.title = newIconTitle;
            // Set the desired classes
            newElement.className = 'MuiButtonBase-root MuiIconButton-root';



            // Assign the new function to be called when the button is clicked
            newElement.addEventListener('click', function() {
                newIconFunction();
            });

            // Change the icon of the new element
            var svgElement = newElement.querySelector('svg');
            if (svgElement) {
                // Remove the existing SVG
                svgElement.remove();

                // Create a new img element
                var imgElement = document.createElement('img');
                imgElement.src = newIconUrl;
                imgElement.style.width = '24px'; // Adjust size as needed
                imgElement.style.height = '24px'; // Adjust size as needed
                imgElement.style.objectFit = 'contain'; // Ensure the entire image is visible within the bounds

                // Append the new img element to the new button
                newElement.querySelector('.MuiIconButton-label').appendChild(imgElement);
            }

            // Append the new element to the same parent
            elementToDuplicate.parentNode.appendChild(newElement);
        } else {
            console.log(`Element with class name "${className}" not found.`);
        }
    }





    // THE FOLLOWING ARE FUNCTIONS FOR ENUM LIST
    // Define the enum list function
    async function executeEnumList() {
        async function simulateKeypress(char) {
            // Create a new KeyboardEvent for keydown
            let keydownEvent = new KeyboardEvent('keydown', {
                key: char,
                keyCode: char.charCodeAt(0),
                which: char.charCodeAt(0),
                bubbles: true,
                cancelable: true
            });

            // Create a new KeyboardEvent for keyup
            let keyupEvent = new KeyboardEvent('keyup', {
                key: char,
                keyCode: char.charCodeAt(0),
                which: char.charCodeAt(0),
                bubbles: true,
                cancelable: true
            });

            // Dispatch the events to the focused element
            document.activeElement.dispatchEvent(keydownEvent);
            document.activeElement.dispatchEvent(keyupEvent);

            // Append the character to the value of the focused element (simulate the actual input)
            document.activeElement.value += char;

            // Small delay to simulate typing speed
            //await sleep(10);
        }

        async function typeString(str) {
            for (let char of str) {
                await simulateKeypress(char);
            }
        }


        async function waitForDeletePress() {
            return new Promise(resolve => {
                function onDeletePress(event) {
                    if (event.key === 'Backspace') {
                        document.removeEventListener('keydown', onDeletePress);
                        resolve();
                    }
                }
                document.addEventListener('keydown', onDeletePress);
            });
        }


        // this changes basic stuff...
        async function executeSteps() {

            // user input csv list
            var userInput = await prompt("Please enterr a comma delimmited list:");
            var list = userInput.split(',').map(item => item.trim());

            var listLength = list.length;
            var paper = document.getElementsByClassName('Content')[0];
            var addButton = paper.getElementsByTagName('button')[2];
            var listItems = paper.getElementsByClassName('ListItems')[0].children;

            for (var i = 0; i < listLength; i++) {
                addButton.click();
            };
            await sleep(1500);
            //console.log('1000')


            for (var j = 0; j < list.length; j++) {
                listItems[j].children[1].children[0].children[0].focus()
                await sleep(50)
                await typeString(list[j] + "X"); // delete this X later.
                await waitForDeletePress(); // Wait for delete key press before moving to the next item
                await sleep(50)
                console.log('1000');

            }
        };

        await executeSteps();
    }



    // THE FOLLOWING ARE FUNCTIONS FOR STANDARD LIST
    // Define the organizeColumns function
    async function executeStandardList() {
        // this changes basic stuff...
        async function executeSteps(rowNumber, colNum, inputText) {
            var table = document.getElementsByClassName('ReactVirtualized__Grid__innerScrollContainer')[0];
            var rows = table.children;

            var formulbox = rows[rowNumber].getElementsByClassName('MuiInputBase-input')[colNum];
            formulbox.click();

            // Wait for the click to be processed
            await sleep(200); // Adjust the delay as needed

            // Set the input text
            document.getElementsByClassName('cm-line')[0].textContent = inputText;
            document.getElementsByClassName('cm-line')[0].textContent = inputText;

            // Wait for the text to be set
            await sleep(1); // Adjust the delay as needed

            var paper = document.getElementsByClassName('MuiPaper-root MuiDialog-paper')[0];

            // OUTDATED
            //var saveButton = paper.getElementsByClassName('MuiButtonBase-root MuiButton-root')[1];

            // More Specific
            var saveButton = paper.getElementsByClassName('MuiButtonBase-root MuiButton-root MuiButton-contained SaveExpressionButton')[0]


            // Click the save button
            saveButton.click();

            // Wait for the save to be processed
            await sleep(1); // Adjust the delay as needed
        };

        // Checkbox remover
        function uncheckBoxes() {
            var table = document.getElementsByClassName('ReactVirtualized__Grid__innerScrollContainer')[0];
            var rows = table.children;
            var indices = [6, 14];
            var targetRows = [1, 2, 3, 4];

            targetRows.forEach(function(rowIndex) {
                var row = rows[rowIndex];
                indices.forEach(function(index) {
                    var check = row.getElementsByClassName('Control')[index];
                    var checkbox = check.querySelector('input[type="checkbox"]');
                    if (checkbox.checked) {
                        checkbox.click();
                    }
                });
            });
        }


        await executeSteps(1, 2, "UTCNOW()");
        await executeSteps(2, 2, "ANY(AUTH[UID])");
        await executeSteps(3, 1, "UTCNOW()");
        await executeSteps(3, 2, "");
        await executeSteps(4, 1, "ANY(AUTH[UID])");
        await executeSteps(5, 2, "Active");
        await executeSteps(8, 2, "LOWER(UNIQUEID(UUID))");
        uncheckBoxes();
    }


    // Example usage: duplicate the element with the class 'MuiButtonBase-root'
    window.addEventListener('load', function() {
        setTimeout(function() {
            duplicateElementByClassName('MuiButtonBase-root', standardColumnsIcon, "StandardColumnsButton", "Click to Standardize Columns", executeStandardList);
            duplicateElementByClassName('MuiButtonBase-root', enumListIcon, "enumListButton", "Click to automate ENUM Lists", executeEnumList);
        }, 5000); // Delay in milliseconds
    });



})();

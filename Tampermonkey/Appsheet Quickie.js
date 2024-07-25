// ==UserScript==
// @name         Appsheet Quickie
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


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

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




    document.addEventListener('keydown', async function(event) {
        if (event.ctrlKey && event.key === '1') {
            await executeSteps(1, 2, "UTCNOW()");
            await executeSteps(2, 2, "ANY(AUTH[UID])");
            await executeSteps(3, 1, "UTCNOW()");
            await executeSteps(3, 2, "");
            await executeSteps(4, 1, "ANY(AUTH[UID])");
            await executeSteps(5, 2, "Active");
            await executeSteps(8, 2, "LOWER(UNIQUEID(UUID))");
            uncheckBoxes();
        }
    });


})();

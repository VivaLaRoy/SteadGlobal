var newIconUrl = 'https://github.com/VivaLaRoy/SteadGlobal/blob/main/Tampermonkey/send.png?raw=true';

// Function to duplicate an element by its class name
function duplicateElementByClassName(className) {
    // Find the element by its class name
    var elementToDuplicate = document.querySelector(`.${className}`);

    if (elementToDuplicate) {
        // Clone the element without its event listeners
        var clonedElement = elementToDuplicate.cloneNode(true);

        // Create a new element from the clone to remove any event listeners
        var newElement = clonedElement.cloneNode(true);
        newElement.id = "clonedElement";
        newElement.title = "Standardized Columns";
        // Set the desired classes
        newElement.className = 'MuiButtonBase-root MuiIconButton-root';



        // Assign the new function to be called when the button is clicked
        newElement.addEventListener('click', function() {
            organizeColumns();
        });

        // Change the icon of the new element
        var svgElement = newElement.querySelector('svg');
        if (svgElement) {
            // Remove the existing SVG
            svgElement.remove();

            // Create a new img element
            var imgElement = document.createElement('img');
            imgElement.src = newIconUrl;
            imgElement.style.width = '24px';  // Adjust size as needed
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



// Define the organizeColumns function
function organizeColumns() {
    console.log("organizeColumns function called");
    // Your function logic here
}

// Example usage: duplicate the element with the class 'MuiButtonBase-root'
// Ensure the DOM is fully loaded before trying to duplicate the element
window.addEventListener('load', function() {
    duplicateElementByClassName('MuiButtonBase-root');
});

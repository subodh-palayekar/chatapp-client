function capitalizeFirstLetter(inputString) {
    // Check if the input is not empty
    if (inputString && inputString.length > 0) {
        // Capitalize the first letter and concatenate with the rest of the string
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    } else {
        // Return an empty string if the input is empty
        return '';
    }
}

export default capitalizeFirstLetter;
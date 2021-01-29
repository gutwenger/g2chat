export function checkMessage(input) {
    
    if (input.trim() === "") {
        return false;
    }

    if (input.length > 1600) {
        return false;
    }

    return true;
}
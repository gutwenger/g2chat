export function checkIDInput(input) {
    
    if (input.trim() === "" || input.trim().length < 5) {
        return { valid: false, error: "ID must contain at least 5 characters." };
    }

    if (input.trim().length > 20) {
        return { valid: false, error: "ID must not exceed 20 characters." };
    }

    if (input.trim().match(/[^a-zA-Z0-9]/)) {
        return { valid: false, error: "ID must contain only numbers and/or letters." };
    }

    return { valid: true, error: null };
}
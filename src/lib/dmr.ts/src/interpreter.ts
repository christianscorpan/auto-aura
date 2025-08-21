const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const datePart = dateStr.split(' ').pop();
    if (!datePart) return null;
    const parts = datePart.split('-');
    if (parts && parts.length === 3) {
        const day = parseInt(parts[0].replace(/[^0-9]/g, ''), 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            return new Date(Date.UTC(year, month - 1, day));
        }
    }
    return null;
}

export const interpretValue = (s: string | null): any => {
    if (s === null || s === undefined) return null;

    const val = s.trim();

    // Null-like
    if (val === "" || val === "-" || val === "–" || val === "—" || val.toLowerCase() === 'n/a') return null;

    // Boolean
    if (/^ja$/i.test(val)) return true;
    if (/^nej$/i.test(val)) return false;

    // Date
    const date = parseDate(val);
    if (date) return date;

    // Number with unit
    const m = val.match(/-?\d+(?:[.,]\d+)?/);
    if (m) {
        const numeric = Number(m[0].replace(",", "."));
        // Trim surrounding punctuation and whitespace from remaining unit text
        let unit: string | null = val
            .replace(m[0], "")
            .replace(/^[\s,:;()-]+|[\s,:;()-]+$/g, "")
            .trim();
        unit = unit || null;
        if (unit) {
            return { numeric, unit };
        }
        // if it's just a number, return it as a number
        if (!isNaN(numeric) && val.match(/^[0-9,.\s]+$/)) {
            return numeric;
        }
    }

    // Fallback string
    return val;
};

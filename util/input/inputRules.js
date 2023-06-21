function durationEvaluation (value) {
    let toReturn = 0;
    // If input is null
    if (value == null) { return NaN; }
    // Define regex for simple time expressions (Examples are: 1000ms, 10s, 20m, 4h)
    const regex = /-{0,1}[0-9]+|ms|s|h|m/gm;
    const matches = [];
    // Get matches
    while ((m = regex.exec(value)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) { regex.lastIndex++; }
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => { matches.push(match); });
    }
    // Se passo un solo valore, considero sia in millisecondi
    if (matches.length == 1) { return getNumber (matches[0], 1, 60 * 60 * 1000) ? parseFloat (value) : NaN }
    // Se abbiamo dei match dispari, la sintassi è incompleta
    if (matches.length % 2 !== 0) { return NaN; }
    for (let i=0; i<matches.length; i+=2) {
        let number = getNumber (matches[i]);
        let symbol =  matches[i+1];
        if (!number) { return NaN; }
        switch (symbol) {
            case 'ms':
                number *= 1;
                break;
            case 's':
                number *= 1000;
                break;
            case 'm':
                number *= 1000 * 60;
                break;
            case 'h':
                number *= 1000 * 60 * 60;
                break;
            default:
                return NaN;
        }
        toReturn += number;
    }

    if (toReturn > 60 * 60 * 1000) {
        toReturn = 60 * 60 * 1000;
    } else if (toReturn < 1) {
        toReturn = 1;
    }
    return toReturn;
}

function getNumber (value, min, max) {
    let basic = (value != null && parseFloat(value));
    let advanced = (min != null && max != null && (value >= min || value <= max)) || basic;
    return (basic && advanced) ? parseFloat(value) : NaN;
}

module.exports = {durationEvaluation, getNumber}
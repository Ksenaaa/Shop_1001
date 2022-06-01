export const selectOptionCategory = ['Astronomy', 'Geography', 'History', 'Humour', 'Medicine', 'Romance', 'Science']

export const selectOptionYear = () => {
    let allYears = [];
    let maxOffset = 100;
    let thisYear = (new Date()).getFullYear();
    for(let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }
    return allYears
}

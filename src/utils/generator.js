
export const generateYears = (startYear) => {

    const currentYear = new Date().getFullYear();
    startYear = startYear || 1980;
    let years = [];
    while (startYear <= currentYear) {
        years.push(startYear++);
    }

    return years.reverse()

}

export const generateMonths = () => {
    let month = 1;
    let months = [];
    while (month <= 12) {
        months.push(month++)
    }

    return months;
}
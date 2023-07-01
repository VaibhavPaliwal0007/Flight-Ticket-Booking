function generateTime() {
    let arrivalHrs = Math.floor(Math.random() * 24);
    let durationHours = Math.floor(Math.random() * 7) + 3;
    let destHrs = arrivalHrs + durationHours;

    if (destHrs >= 24) destHrs -= 24;

    let arrivalMins = Math.floor(Math.random() * 60);
    let durationMins = Math.floor(Math.random() * 60);
    let destMins = arrivalMins + durationMins;

    if (destMins >= 60) destMins -= 60;

    arrivalHrs = arrivalHrs.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    arrivalMins = arrivalMins.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    destHrs = destHrs.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    destMins = destMins.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });

    let duration = durationHours * 100 + durationMins;

    return [arrivalHrs + ":" + arrivalMins, destHrs + ":" + destMins, duration];
};

module.exports = generateTime;
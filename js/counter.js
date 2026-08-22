const relationshipStart = new Date(
    "2024-08-24T08:24:00+07:00"
);


const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");


function formatCounter(value) {

    return String(value).padStart(2, "0");

}


function updateLoveCounter() {

    const now = new Date();

    let years =
        now.getFullYear() - relationshipStart.getFullYear();

    let months =
        now.getMonth() - relationshipStart.getMonth();

    let days =
        now.getDate() - relationshipStart.getDate();

    let hours =
        now.getHours() - relationshipStart.getHours();

    let minutes =
        now.getMinutes() - relationshipStart.getMinutes();

    let seconds =
        now.getSeconds() - relationshipStart.getSeconds();


    if (seconds < 0) {

        seconds += 60;

        minutes--;

    }


    if (minutes < 0) {

        minutes += 60;

        hours--;

    }


    if (hours < 0) {

        hours += 24;

        days--;

    }


    if (days < 0) {

        const previousMonth = new Date(

            now.getFullYear(),

            now.getMonth(),

            0

        );

        days += previousMonth.getDate();

        months--;

    }


    if (months < 0) {

        months += 12;

        years--;

    }


    yearsElement.textContent = formatCounter(years);

    monthsElement.textContent = formatCounter(months);

    daysElement.textContent = formatCounter(days);

    hoursElement.textContent = formatCounter(hours);

    minutesElement.textContent = formatCounter(minutes);

    secondsElement.textContent = formatCounter(seconds);

}


updateLoveCounter();

setInterval(updateLoveCounter, 1000);
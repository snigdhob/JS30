const hourHand = document.querySelector('.hour');
const minHand = document.querySelector('.min');
const secHand = document.querySelector('.second');

function setRotationDegrees() {
    let degree = 0;
    const degreeOffset = 30;
    for (let i = 1; i < 12; i++) {
        const number = document.querySelector(`.number${i}`);
        degree += degreeOffset;
        number.style.setProperty('--rotationDegree', `${degree}deg`);
    }
}

setClock = () => {
    const selectedTimezone = document.querySelector('#timezone').value;
    const currentDate = moment().tz(selectedTimezone);
    let secondRatio = currentDate.seconds() / 60;
    let minuteRatio = (secondRatio + currentDate.minutes()) / 60;
    let hourRatio = (minuteRatio + currentDate.hours()) / 12;

    rotate(secHand, secondRatio);
    rotate(minHand, minuteRatio);
    rotate(hourHand, hourRatio);
    const audio = document.querySelector('[data-tick]');
    hourHand.click();
    let promise = audio.play();
    if (promise) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
            audio.play();
        });
    }
}

rotate = (element, ratio) => {
    element.style.setProperty('--rotationDegreeForHand', `${ratio * 360}deg`);
}

populateDropdown = () => {
    const timezoneDropdown = document.querySelector('#timezone');
    const timezones = moment.tz.names();
    timezones.forEach(x => {
        let optionVal = x;
        const element = document.createElement("option");
        element.textContent = optionVal;
        element.value = optionVal;
        timezoneDropdown.appendChild(element);
    });
    timezoneDropdown.value = moment.tz.guess();
}

setInterval(setClock, 1000);
populateDropdown();
setRotationDegrees();
setClock();
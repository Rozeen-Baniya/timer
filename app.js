window.onload = () => {
    document.querySelector('#calculate').onclick = calculate;
    document.querySelector('#reset').addEventListener('click', reset);
};

let interval; // Declare the interval globally to avoid multiple intervals being created.

function calculate() {
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;

    // Validate date and time inputs
    if (!date || !time) {
        alert("Please enter both date and time.");
        return;
    }

    const stop = document.querySelector('#stop');
    const endTime = new Date(`${date}T${time}`); // Use ISO 8601 format for better compatibility.

    if (endTime <= new Date()) {
        alert("The entered date and time must be in the future.");
        return;
    }

    clearInterval(interval); // Clear any existing interval to prevent overlaps.
    interval = setInterval(() => calculateTime(endTime), 1000);

    stop.onclick = () => {
        clearInterval(interval);
    };
}

function calculateTime(endTime) {
    const currentTime = new Date();

    const days = document.querySelector('#countdown-days');
    const hours = document.querySelector('#countdown-hours');
    const minutes = document.querySelector('#countdown-minutes');
    const seconds = document.querySelector('#countdown-seconds');

    if (endTime > currentTime) {
        const timeLeft = (endTime - currentTime) / 1000;

        days.innerText = Math.floor(timeLeft / (24 * 60 * 60));
        hours.innerText = Math.floor((timeLeft / (60 * 60)) % 24);
        minutes.innerText = Math.floor((timeLeft / 60) % 60);
        seconds.innerText = Math.floor(timeLeft % 60);
    } else {
        clearInterval(interval); // Stop the countdown when the time is up.
        days.innerText = 0;
        hours.innerText = 0;
        minutes.innerText = 0;
        seconds.innerText = 0;
        alert("Time's up!");
    }
}

function reset() {
    clearInterval(interval); // Clear any running interval.
    document.querySelector('#countdown-days').innerText = 0;
    document.querySelector('#countdown-hours').innerText = 0;
    document.querySelector('#countdown-minutes').innerText = 0;
    document.querySelector('#countdown-seconds').innerText = 0;

    // Optionally, reset the input fields.
    document.querySelector("#date").value = '';
    document.querySelector("#time").value = '';
}

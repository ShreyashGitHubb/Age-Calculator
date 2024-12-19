document.getElementById("age-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const dob = new Date(document.getElementById("dob").value);
    const now = new Date();

    if (isNaN(dob.getTime())) {
        document.getElementById("result").innerHTML = "Please enter a valid date.";
        return;
    }

    // Calculate basic age details
    const years = now.getFullYear() - dob.getFullYear();
    const months = years * 12 + now.getMonth() - dob.getMonth();
    const days = Math.floor((now - dob) / (1000 * 60 * 60 * 24));
    const hours = days * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;

    // Calculate next birthday
    const nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBirthday < now) nextBirthday.setFullYear(now.getFullYear() + 1);

    // Function to update the real-time countdown
    function updateRealTimeCountdown() {
        const liveNow = new Date();
        const timeRemaining = nextBirthday - liveNow;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);  // Stop the interval when birthday has passed
        }

        // Calculate remaining days, hours, minutes, seconds
        const daysLeft = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Display the countdown
        document.getElementById("countdown").innerHTML = `
            <h2>Next B'Day CountDown</h2>
            <p>${daysLeft} Days, ${hoursLeft} Hours, ${minutesLeft} Minutes, ${secondsLeft} Seconds</p>
        `;
    }

    // Start real-time countdown for next birthday
    const countdownInterval = setInterval(updateRealTimeCountdown, 1000);

    // Update the live age every second
    window.liveAgeInterval = setInterval(() => {
        const liveNow = new Date();
        const liveSeconds = Math.floor((liveNow - dob) / 1000);
        const liveDays = Math.floor(liveSeconds / (60 * 60 * 24));
        const liveHours = Math.floor((liveSeconds % (60 * 60 * 24)) / (60 * 60));
        const liveMinutes = Math.floor((liveSeconds % (60 * 60)) / 60);
        const liveSecondsFinal = liveSeconds % 60;

        // Update the age display
        document.getElementById("live-age").innerHTML = `
            <h2>Live Age</h2>
            <p>${years} Years, ${months % 12} Months, ${liveDays % 30} Days, ${liveHours}h : ${liveMinutes}m : ${liveSecondsFinal}s</p>
        `;

        // Update the detailed result with seconds
        document.getElementById("detailed-result").innerHTML = `
            <h2>Result</h2>
            <p><strong>Date of Birth:</strong> ${dob.toDateString()}</p>
            <p><strong>Age:</strong> ${years} Years, ${months % 12} Months, ${days % 30} Days</p>
            <p><strong>Birth Day of Week:</strong> ${dob.toLocaleString("en-US", { weekday: "long" })}</p>
            <p><strong>Age in Days:</strong> ${days} Days</p>
            <p><strong>Age in Seconds:</strong> ${liveSeconds} Seconds</p>
        `;

        // Update interesting facts
        document.getElementById("fun-facts").innerHTML = `
            <h2>Interesting Facts About You</h2>
            <p>You have taken breaths around: ${(liveSeconds / 5).toLocaleString()} times</p>
            <p>Your heart has beaten around: ${(liveSeconds * 1.2).toLocaleString()} times</p>
        `;
    }, 1000);
});

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    document.querySelectorAll("#result div").forEach((div) => div.classList.toggle("dark-mode"));
    const isDarkMode = document.body.classList.contains("dark-mode");
    document.getElementById("theme-toggle").innerText = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
});

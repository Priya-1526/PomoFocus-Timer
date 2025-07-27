const taskValue = localStorage.getItem("taskValue") || "No task available";
const displayTask = document.getElementById("task");

if (displayTask) {
  displayTask.textContent = taskValue; // Display task in <p>
}

function startCountdown(durationMins) {
  let duration = durationMins * 60; // Conversion in seconds

  const displayTime = document.getElementById("time-remaining");

  function updateCountdown() {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    displayTime.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (duration > 0) {
      duration--;
    } else {
      clearInterval(interval);

      if (Notification.permission === "granted") {
        new Notification("Pomofocus", {
          body: "Break's over! Time to get back to work 💪",
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Pomofocus", {
              body: "Break's over! Time to get back to work 💪",
            });
          }
        });
      }

      // ✅ Navigate using browser
      window.location.href = "stopBreak.html";
    }
  }

  updateCountdown(); // Initial call to avoid 1s delay
  const interval = setInterval(updateCountdown, 1000);
}

window.onload = function () {
  const storedBreakMinutes = parseInt(localStorage.getItem("breakMinutes")) || 5;
  startCountdown(storedBreakMinutes);
};

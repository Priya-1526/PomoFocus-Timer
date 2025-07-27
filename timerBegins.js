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

      // Show a web notification
      if (Notification.permission === "granted") {
        new Notification("Pomofocus", {
          body: "Time's up! Take a break 😊",
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Pomofocus", {
              body: "Time's up! Take a break 😊",
            });
          }
        });
      }

      // Navigate to break/stop screen
      window.location.href = "stopWork.html";
    }
  }

  updateCountdown(); // Initial call to avoid 1s delay
  const interval = setInterval(updateCountdown, 1000);
}

window.onload = function () {
  const storedWorkMinutes = parseInt(localStorage.getItem("workMinutes")) || 25;
  startCountdown(storedWorkMinutes);
};

document.getElementById("go-back-btn").addEventListener("click", () => {
  window.location.href = "setTask.html";
});

document.getElementById("exit-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to exit Pomofocus?")) {
    // Can't close tab programmatically unless it was opened with JS.
    alert("You can now close the tab manually.");
    window.location.href = "index.html"; // Optional fallback
  }
});

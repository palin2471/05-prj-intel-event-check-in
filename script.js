// Store attendee data
const attendeeList = [];
let totalAttendees = 0;
const teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};
const attendanceGoal = 50;

// Greeting message for each team
function getGreeting(name, team) {
  let message = "";
  if (team === "water") {
    message = `Welcome, ${name}! Thank you for checking into team Water Wise!`;
  } else if (team === "zero") {
    message = `Hello, ${name}! Thank you for checking into team Net Zero!`;
  } else if (team === "power") {
    message = `Hi, ${name}! Thank you for checking into team Power Renewables!`;
  } else {
    message = `Welcome, ${name}!`;
  }
  return message;
}

// Update displayed counts and progress bar
function updateDisplay() {
  document.getElementById("attendeeCount").textContent = totalAttendees;
  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;

  // Progress bar
  const progressBar = document.getElementById("progressBar");
  const percent = Math.min((totalAttendees / attendanceGoal) * 100, 100);
  progressBar.style.width = `${percent}%`;
}

// Handle check-in form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("checkInForm");
  const greetingEl = document.getElementById("greeting");
  const greetingSection = document.getElementById("greetingSection");
  // Hide greeting box on page load
  greetingSection.style.display = "none";
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameInput = document.getElementById("attendeeName");
    const teamSelect = document.getElementById("teamSelect");
    const name = nameInput.value.trim();
    const team = teamSelect.value;
    if (name && team) {
      attendeeList.push({ name: name, team: team });
      totalAttendees++;
      teamCounts[team]++;
      const greetingMsg = getGreeting(name, team);
      greetingEl.textContent = greetingMsg;
      // Show greeting message in the greetingSection
      greetingSection.innerHTML = `<span>${greetingMsg}</span>`;
      greetingSection.style.display = "block";
      updateDisplay();
      nameInput.value = "";
      teamSelect.selectedIndex = 0;
    }
  });
  updateDisplay();
});

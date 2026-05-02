document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

    // Function to fetch activities from API
  async function fetchActivities() {
    try {
      // Mock data for demonstration
      const activities = {
        "Basketball Team": {
          description: "Join the school's basketball team for competitive games and practice.",
          schedule: "Mondays and Wednesdays, 4-6 PM",
          max_participants: 20,
          participants: ["alice@mergington.edu", "bob@mergington.edu", "charlie@mergington.edu"]
        },
        "Swimming Club": {
          description: "Dive into fun with the swimming club at the local pool.",
          schedule: "Tuesdays and Thursdays, 5-7 PM",
          max_participants: 15,
          participants: ["diana@mergington.edu", "eve@mergington.edu"]
        },
        "Drama Club": {
          description: "Express yourself through acting and theater productions.",
          schedule: "Fridays, 3-5 PM",
          max_participants: 25,
          participants: ["frank@mergington.edu", "grace@mergington.edu", "henry@mergington.edu", "ivy@mergington.edu"]
        },
        "Debate Team": {
          description: "Sharpen your argumentation skills and compete in debates.",
          schedule: "Wednesdays, 6-8 PM",
          max_participants: 12,
          participants: ["jack@mergington.edu", "kate@mergington.edu"]
        },
        "Science Club": {
          description: "Explore science through experiments and projects.",
          schedule: "Thursdays, 4-6 PM",
          max_participants: 18,
          participants: ["leo@mergington.edu", "mia@mergington.edu", "noah@mergington.edu"]
        }
      };

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;
        const participantsList = details.participants.length
          ? `<ul>${details.participants.map((participant) => `<li>${participant}</li>`).join("")}</ul>`
          : '<p><em>No participants yet.</em></p>';

        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          <div class="participants">
            <strong>Participants:</strong>
            ${participantsList}
          </div>
        `;

        activitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        activitySelect.appendChild(option);
      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);
    }
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});

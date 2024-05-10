document.addEventListener("DOMContentLoaded", function () {
  const userCardsContainer = document.getElementById("user-cards");
  const nameFilterInput = document.getElementById("nameFilter");
  const searchButton = document.getElementById("searchButton");

  function createUserCards(users) {
    userCardsContainer.innerHTML = ""; // Clear existing cards
    users.forEach((user) => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.innerHTML = `
<div class="card">
    <img src="${user.imageurl}" class="card-img-top" alt="Profile image of ${user.name}">
    <div class="card-body">
        <h5 class="card-title">${user.name}</h5>
        <p class="card-text">${user.nickname}</p>
        <p class="card-text"><strong>XP Points:</strong> ${user.xp}</p>
        <p class="card-text"><strong>Currently Working On:</strong> ${user.currentlyWorkingOn}</p>
        <a href="${user.github}" target="_blank" class="btn btn-success">GitHub</a>
        <a href="${user.linkedin}" target="_blank" class="btn btn-danger">Website</a>
        <a href="${user.linkedin}" target="_blank" class="btn btn-info">LinkedIn</a>
        <a href="mailto:${user.email}?subject=Hi%20${user.name}&body=Hi%20${user.name}" class="btn btn-primary"><i class="bi bi-envelope"></i> Email</a> </div>
</div>
`;
      userCardsContainer.appendChild(card);
    });
  }

  function updateXP(students) {
    students.forEach((student) => {
      // Check and parse 'currentlyWorkingOn' assuming it contains just the page number
      let pageNumber = parseInt(student.currentlyWorkingOn);
      if (!isNaN(pageNumber)) {
        // Check if the pageNumber is a valid number
        student.xp = 10 * Math.pow(2, pageNumber);
      } else {
        student.xp = 0; // Default to 0 if not a valid number
      }
    });
  }
  // Call the function to update XP based on the current page number
  updateXP(students);
  // Function to filter users based on input
  function filterUsers() {
    const filterValue = nameFilterInput.value.toLowerCase();
    const filteredData = students.filter(
      (student) =>
        student.name.toLowerCase().includes(filterValue) ||
        student.nickname.toLowerCase().includes(filterValue) ||
        student.group.toLowerCase().includes(filterValue)
    );
    createUserCards(filteredData);
  }

  // Initially load all users
  createUserCards(students);

  // Add event listener to the search button
  searchButton.addEventListener("click", function () {
    filterUsers(); // Call filterUsers function on click
  });

  // Optionally, you can also trigger filtering with the Enter key
  nameFilterInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      filterUsers();
    }
  });
});

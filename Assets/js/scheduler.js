// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB6MzXFlulVse4B0ALemX9E8oAtymTbm3c",
    authDomain: "trainscheduler-a8b96.firebaseapp.com",
    databaseURL: "https://trainscheduler-a8b96.firebaseio.com",
    projectId: "trainscheduler-a8b96",
    storageBucket: "",
    messagingSenderId: "646041502572"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
    var minutesAway = $("#minutes-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var trainTable = {
      name: trainName,
      destination: destination,
      departure: trainTime,
      minutes: minutesAway
    };
  
    // Uploads employee data to the database
    database.ref().push(trainTable);
      // Logs everything to console
    console.log(trainTable.name);
    console.log(trainTable.destination);
    console.log(trainTable.departure);
    console.log(trainTable.minutes);
  
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#minutes-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store snapshot into a variable
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var departure = childSnapshot.val().departure;
    var minutesAway = childSnapshot.val().minutes;
      // Console log for verification
    console.log(trainName);
    console.log(destination);
    console.log(departure);
    console.log(minutesAway);
  
    // Make depature time in military time format
    var departureTIme = moment.unix(departure).format("HH:mm");
  
    // Calculate minutes away
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Create the new row tag with td tags to append each entry by user
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(departureTIme),
      $("<td>").text(minutesAway),
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  
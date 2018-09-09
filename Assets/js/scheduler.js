 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB6MzXFlulVse4B0ALemX9E8oAtymTbm3c",
    authDomain: "trainscheduler-a8b96.firebaseapp.com",
    databaseURL: "https://trainscheduler-a8b96.firebaseio.com",
    projectId: "trainscheduler-a8b96",
    storageBucket: "trainscheduler-a8b96.appspot.com",
    messagingSenderId: "646041502572"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();
  
    // Creates temp local object for holding train info
    var trainTable = {
      name: trainName,
      destination: destination,
      first: firstTrain,
      minutes: frequency
    };
  
    // Uploads user's train input data to the database
    database.ref().push(trainTable);
      // Logs everything to console
    console.log(trainTable.name);
    console.log(trainTable.destination);
    console.log(trainTable.first);
    console.log(trainTable.minutes);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store snapshot into a variable
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().minutes;
    var firstTrain =  childSnapshot.val().first;
    // var nextArrival = childSnapshot.val().arrival;
    // var minutesAway = childSnapshot.val().minutesAway;
      // Console log for verification
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(firstTrain);
    // console.log(nextArrival);
    // console.log(minutesAway);

    // Make next arrival time in military time format
    var convertArrivalTime = moment.unix(nextArrival).format("HH:mm");

    // Calculate Mintues Away
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;  
    console.log(tRemainder);

    // Minutes Until Train
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
    
    // Create the new row tag with td tags to append each entry by user
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(convertArrivalTime),
      $("<td>").text(minutesAway)    
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
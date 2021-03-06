$(document).ready(function() {
  var loggedInCurrentUser = localStorage.getItem("loggedIn");
  //console.log(loggedInCurrentUser);

  if (loggedInCurrentUser === "false") {
    //console.log("Not logged in yet cannot grab spouseId and date table data");
  } else if (loggedInCurrentUser === "true") {
    var getSpouse = localStorage.getItem("spouseId");
    // var getSpouse = 11;

    //console.log("This is the current spouseId: ", getSpouse);
    var datesArr = [];
    $.get("/api/dates/" + getSpouse, function(res) {
      for (var i = 0; i < res.length; i++) {


        var formatted = new Date(res[i].date);
        var dd = String(formatted.getDate()).padStart(2, '0');
        var mm = String(formatted.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = formatted.getFullYear();

        formatted = mm + '/' + dd + '/' + yyyy;

        $('#date-accordion').append(
          `
          <div class="card bg-5">
          <div class="card-header" id="date-heading${i}">
            <h5 class="mb-0">
              <button class="btn btn-link max-width" data-toggle="collapse" data-target="#date-collapse${i}" aria-expanded="true" aria-controls="date-collapse${i}">
                ${res[i].event} 
                <hr class='bg-3'>
              </button>
            </h5>
          </div>
          
          <div id="date-collapse${i}" class="collapse" aria-labelledby="date-heading${i}" data-parent="#date-accordion">
          <div class="card-body fav-card-text mx-auto">
         ${formatted} <br><br>
           
          
          </div>
          </div>
          </div>
          `)
        var dateObj = {
          event: `${res[i].event}`,
          date: `${res[i].date}`
        };

        datesArr.push(dateObj);
      }
      findNextDate();
      // return datesArr;
      // //console.log("This is the date table data: ", datedata);
    });

    function findNextDate() {
      var today;
      var eventDate;
      getToday();

      function getToday() {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        today = day;
        return today;
      }

      function getEvent() {
        var then = new Date(datesArr[i].date);
        var start = new Date(then.getFullYear(), 0, 0);
        var diff = then - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        eventDate = day;
        console.log(
          "then: ",
          then,
          "start: ",
          start,
          "diff: ",
          diff,
          "one day: ",
          oneDay,
          "day: ",
          day
        );
        // return eventDate;
      }

      var thisYear = [];
      var nextYear = [];
      var nextEvent;

      for (var i = 0; i < datesArr.length; i++) {
        compareDate = new Date(datesArr[i].date);
        getEvent();
        if (eventDate > today) {
          thisYear.push(datesArr[i]);
        } else if (eventDate < today) {
          nextYear.push(datesArr[i]);
        }
      }
      function declareNextEvent() {
        if (thisYear.length === 0) {
          nextEvent = nextYear[0];
          console.log("Next Event is :", nextEvent);
          $("#next-event").text(nextEvent.event);
          return nextEvent;
        } else {
          nextEvent = thisYear[0];
          console.log("Next Event is :", nextEvent);
          $("#next-event").text(nextEvent.event);
          return nextEvent;
        }
      }
      declareNextEvent();
      // var countDownDate = nextEvent.date;
      // console.log('cd ',countDownDate)

      function getNextEventDay() {
        var then = new Date(nextEvent.date);
        var start = new Date(then.getFullYear(), 0, 0);
        var diff = then - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);
        eventDate = day;
        console.log("day: ", day);
      }

      getNextEventDay();

      var eventCountDown;

      function getCountDown() {
        eventCountDown = eventDate - today;

        if (eventCountDown > 1) {
          $("#countDown").append(`${eventCountDown} Days to get Ready!`);
        } else if ((eventCountDown = 1)) {
          $("#countDown").append(`${eventCountDown} Day to get Ready!`);
        }
      }
      getCountDown();
      console.log("countdown is :", eventCountDown);
    }

    //end document.ready DO NOT EDIT BELOW
  }
});

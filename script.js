$(function () {
    // Display the current day in the header
    const currentDay = dayjs().format("MMMM D, YYYY");
    $("#currentDay").text(currentDay);
  
    function generateTimeBlocks() {
      let timeBlocks = [];
      for (let i = 8; i <= 17; i++) {
        timeBlocks.push(i);
      }
      return timeBlocks;
    }
  
    function renderTimeBlocks() {
      let timeBlocksContainer = $(".container-fluid");
      let timeBlocks = generateTimeBlocks();
      let currentHour = dayjs().hour();
  
      timeBlocksContainer.empty();
  
      timeBlocks.forEach((hour) => {
        let amPm = hour >= 12 ? "PM" : "AM";
        let displayHour = hour % 12 === 0 ? 12 : hour % 12;
        let pastPresentFuture = "";
  
        if (hour < currentHour) {
          pastPresentFuture = "past";
        } else if (hour === currentHour) {
          pastPresentFuture = "present";
        } else {
          pastPresentFuture = "future";
        }
  
        let blockHtml = `
        <div id="hour-${hour}" class="row time-block ${pastPresentFuture}">
          <div class="col-2 col-md-1 hour text-center py-3">${displayHour}${amPm}</div>
          <textarea class="col-8 col-md-10 description" rows="3"></textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        </div>`;
  
        timeBlocksContainer.append(blockHtml);
      });
    }
  
    renderTimeBlocks();
  
    // Save to localStorage on button click
    $(document).on("click", ".saveBtn", function () {
      const hour = $(this).parent().attr("id").split("-")[1];
      const amPm = parseInt(hour) >= 12 ? "PM" : "AM";
      const eventText = $(this).siblings("textarea").val();
      localStorage.setItem(hour + amPm, eventText);
    });
  
    // Load from localStorage
    $(".time-block").each(function () {
      const hour = $(this).attr("id").split("-")[1];
      const amPm = parseInt(hour) >= 12 ? "PM" : "AM";
      const eventText = localStorage.getItem(hour + amPm);
      if (eventText) {
        $(this).find("textarea").val(eventText);
      }
    });
  });
  
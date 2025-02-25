class Calendar {
  constructor() {
    // initialize current, start and end dates 
    this.today = new Date();
    this.currentMonthStart = this.today.getMonth() + 1;
    this.currentYearStart = this.today.getFullYear();
    this.currentMonthEnd = this.today.getMonth() + 1;
    this.currentYearEnd = this.today.getFullYear();
  }

  formatDate(year, month, day) {
    return `${year}-${month}-${day}`;
  }

  // selecting start date and highlighting selected start date
  selectStartDate(cell, year, month, day) {
    const allCells = document.querySelectorAll("#calendarStart td");
    allCells.forEach((cell) => cell.classList.remove("selectedDate"));
    cell.classList.add("selectedDate");
    document.getElementById("startDate").value = this.formatDate(
      year,
      month,
      day
    );
  }

  // selecting end date and highlighting selected end date
  selectEndDate(cell, year, month, day) {
    const allCells = document.querySelectorAll("#calendarEnd td");
    allCells.forEach((cell) => cell.classList.remove("selectedDate"));
    cell.classList.add("selectedDate");
    document.getElementById("endDate").value = this.formatDate(
      year,
      month,
      day
    );
  }

  // getting day of the week
  getDay(date) {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
  }

  // getting name of the month
  getMonthName(month) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month - 1];
  }

  // creating calendar table
  createCalendar(elem, year, month, selectFunction) {
    const mon = month - 1;
    const date = new Date(year, mon);

    let table = "<table><tr><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th><th>SUN</th></tr>";
    let row = "<tr>";

    for (let i = 0; i < this.getDay(date); i++) {
      row += "<td></td>";
    }

    while (date.getMonth() == mon) {
      const classes =
        date.getDate() === this.today.getDate() &&
        date.getMonth() === this.today.getMonth() &&
        date.getFullYear() === this.today.getFullYear()
          ? "currentDate"
          : "";

      row += `<td class="${classes}" data-year="${year}" data-month="${month}" data-day="${date.getDate()}">${date.getDate()}</td>`;

      if (this.getDay(date) % 7 == 6) {
        row += "</tr>";
        table += row;
        row = "<tr>";
      }
      date.setDate(date.getDate() + 1);
    }

    if (this.getDay(date) != 0) {
      for (let i = this.getDay(date); i < 7; i++) {
        row += "<td></td>";
      }
    }

    row += "</tr>";
    table += row;
    table += "</table>";

    elem.innerHTML = table;

    // event listeners for every cell so they can be chosen as start or end dates
    const cells = elem.querySelectorAll("td[data-year]");
    cells.forEach((cell) => {
      cell.addEventListener("click", (event) => {
        const year = event.target.getAttribute("data-year");
        const month = event.target.getAttribute("data-month");
        const day = event.target.getAttribute("data-day");
        if (selectFunction === "selectStartDate") {
          this.selectStartDate(event.target, year, month, day);
        } else {
          this.selectEndDate(event.target, year, month, day);
        }
      });
    });
  }

  updateCalendarHeader(month, year, elementId) {
    const monthYearLabel = document.getElementById(elementId);
    monthYearLabel.textContent = `${this.getMonthName(month)} ${year}`;
  }

  initialize() {
    const calendarStart = document.getElementById("calendarStart");
    const calendarEnd = document.getElementById("calendarEnd");

    // event listener for navigating to previous month (start date calendar)
    document
      .getElementById("prevMonthButtonStart")
      .addEventListener("click", () => {
        this.currentMonthStart--;
        if (this.currentMonthStart < 1) {
          this.currentMonthStart = 12;
          this.currentYearStart--;
        }
        this.createCalendar(
          calendarStart,
          this.currentYearStart,
          this.currentMonthStart,
          "selectStartDate"
        );
        this.updateCalendarHeader(
          this.currentMonthStart,
          this.currentYearStart,
          "monthYearLabelStart"
        );
      });

    // event listener for navigating to next month (start date calendar)
    document
      .getElementById("nextMonthButtonStart")
      .addEventListener("click", () => {
        this.currentMonthStart++;
        if (this.currentMonthStart > 12) {
          this.currentMonthStart = 1;
          this.currentYearStart++;
        }
        this.createCalendar(
          calendarStart,
          this.currentYearStart,
          this.currentMonthStart,
          "selectStartDate"
        );
        this.updateCalendarHeader(
          this.currentMonthStart,
          this.currentYearStart,
          "monthYearLabelStart"
        );
      });

    // event listener for navigating to previous month (end date calendar)
    document
      .getElementById("prevMonthButtonEnd")
      .addEventListener("click", () => {
        this.currentMonthEnd--;
        if (this.currentMonthEnd < 1) {
          this.currentMonthEnd = 12;
          this.currentYearEnd--;
        }
        this.createCalendar(
          calendarEnd,
          this.currentYearEnd,
          this.currentMonthEnd,
          "selectEndDate"
        );
        this.updateCalendarHeader(
          this.currentMonthEnd,
          this.currentYearEnd,
          "monthYearLabelEnd"
        );
      });

    // event listener for navigating to next month (end date calendar)
    document
      .getElementById("nextMonthButtonEnd")
      .addEventListener("click", () => {
        this.currentMonthEnd++;
        if (this.currentMonthEnd > 12) {
          this.currentMonthEnd = 1;
          this.currentYearEnd++;
        }
        this.createCalendar(
          calendarEnd,
          this.currentYearEnd,
          this.currentMonthEnd,
          "selectEndDate"
        );
        this.updateCalendarHeader(
          this.currentMonthEnd,
          this.currentYearEnd,
          "monthYearLabelEnd"
        );
      });

    
    this.createCalendar(
      calendarStart,
      this.currentYearStart,
      this.currentMonthStart,
      "selectStartDate"
    );
    this.updateCalendarHeader(
      this.currentMonthStart,
      this.currentYearStart,
      "monthYearLabelStart"
    );

    this.createCalendar(
      calendarEnd,
      this.currentYearEnd,
      this.currentMonthEnd,
      "selectEndDate"
    );
    this.updateCalendarHeader(
      this.currentMonthEnd,
      this.currentYearEnd,
      "monthYearLabelEnd"
    );
  }
}


const calendar = new Calendar();
export { calendar };


document.addEventListener("DOMContentLoaded", () => {
  calendar.initialize();
});
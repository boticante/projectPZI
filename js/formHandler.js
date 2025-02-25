import { eventManager } from "./eventManager.js";

class FormHandler {
  constructor(calendar, locationManager) {
    this.calendar = calendar;
    this.locationManager = locationManager;
  }

  // check if inputs are valid
  validateForm() {
    const title = document.getElementById("eventTitle").value;
    const description = document.getElementById("eventDescription").value;
    const imageUrl = document.getElementById("eventImage").value;
    const location = this.locationManager.getSelectedLocation();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    // check if any field is empty
    if (
      !title ||
      !description ||
      !imageUrl ||
      !location ||
      !startDate ||
      !endDate
    ) {
      alert("Please fill in all fields");
      return false;
    }

    //end date must be after start date
    if (new Date(startDate) > new Date(endDate)) {
      alert("End date must be after start date");
      return false;
    }

    return true;
  }

  // collecting all data that was previously added through input fields
  getFormData() {
    return {
      title: document.getElementById("eventTitle").value,
      description: document.getElementById("eventDescription").value,
      imageUrl: document.getElementById("eventImage").value,
      location: this.locationManager.getSelectedLocation(),
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
    };
  }

  resetForm() {
    document.getElementById("eventForm").reset();
  }

  setupFormListener() {
    const form = document.getElementById("eventForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.validateForm()) {
        const formData = this.getFormData();
        eventManager.addEvent(formData);
        this.resetForm();
      }
    });
  }
}

export { FormHandler };
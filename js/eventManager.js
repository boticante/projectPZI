class EventManager {
  constructor() {
    this.events = [];
    this.loadEvents();
  }

  // load events from local storage
  loadEvents() {
    const savedEvents = localStorage.getItem("events");
    this.events = savedEvents ? JSON.parse(savedEvents) : [];
    this.addFilterOptions();
    this.displayEvents();
  }

  // save events into local storage
  saveEvents() {
    localStorage.setItem("events", JSON.stringify(this.events));
  }

  // add new event
  addEvent(eventData) {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      createdAt: new Date().toISOString(),
    };

    this.events.push(newEvent);
    this.saveEvents();
    this.addFilterOptions();
    this.displayEvents();
    return newEvent;
  }

  // delete event
  deleteEvent(eventId) {
    this.events = this.events.filter((event) => event.id !== eventId);
    this.saveEvents();
    this.addFilterOptions();
    this.displayEvents();
  }
  
  // show all events (or filtered)
  displayEvents(filterLocation = "") {
    const eventsContainer = document.getElementById("eventsContainer");
    if (!eventsContainer) return;

    eventsContainer.innerHTML = "";

    let filteredEvents = this.events;
    if (filterLocation && filterLocation !== "all") {
      filteredEvents = this.events.filter(
        (event) => event.location === filterLocation
      );
    }

    if (filteredEvents.length === 0) {
      eventsContainer.innerHTML =
        '<p class="no-events">No events available</p>';
      return;
    }

    filteredEvents.forEach((event) => {
      const eventElement = this.createEventElement(event);
      eventsContainer.appendChild(eventElement);
    });
  }

  // create html element for certain event
  createEventElement(event) {
    const eventDiv = document.createElement("div");
    eventDiv.className = "event-card";

    const startDate = new Date(event.startDate).toLocaleDateString();
    const endDate = new Date(event.endDate).toLocaleDateString();

    eventDiv.innerHTML = `
      <div class="event-image">
          <img src="${event.imageUrl}" alt="${event.title}" onerror="this.src='/placeholder.svg'">
      </div>
      <div class="event-content">
          <h3>${event.title}</h3>
          <p class="event-location">${event.location}</p>
          <p class="event-dates">${startDate} - ${endDate}</p>
          <p class="event-description">${event.description}</p>
          <button class="delete-event" data-id="${event.id}">Delete Event</button>
      </div>
    `;

    // event listener for delete event button
    const deleteButton = eventDiv.querySelector(".delete-event");
    deleteButton.addEventListener("click", () => {
      this.deleteEvent(event.id);
    });

    return eventDiv;
  }

  // fill dropdown menu for filtering with available locations
  addFilterOptions() {
    const filterSelect = document.getElementById("filterLocation");
    if (!filterSelect) return;

    filterSelect.innerHTML = '<option value="all">All Locations</option>';

    const uniqueLocations = [
      ...new Set(this.events.map((event) => event.location)),
    ];

    uniqueLocations.forEach((location) => {
      const option = document.createElement("option");
      option.value = location;
      option.textContent = location;
      filterSelect.appendChild(option);
    });
  }
}

export const eventManager = new EventManager();

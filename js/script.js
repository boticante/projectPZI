import { locationManager } from "./fetchLocations.js";
import { FormHandler } from "./formHandler.js";
import { eventManager } from "./eventManager.js";
import { calendar } from "./calendar.js";

  // execute after fully loaded html
document.addEventListener("DOMContentLoaded", async () => {
  if (!checkAuth()) {
    window.location.href = "signInForm.html";
    return;
  }

  // show event form and sign out button
  document.getElementById("eventForm").style.display = "block";
  document.getElementById("signOutButton").style.display = "block";

  // event listener for sign out button
  document.getElementById("signOutButton").addEventListener("click", signOut);

  await locationManager.addLocations();

  const formHandler = new FormHandler(calendar, locationManager);
  formHandler.setupFormListener();

  eventManager.loadEvents();
  calendar.initialize();

  // event listener for filtering events by location
  document.getElementById("filterLocation").addEventListener("change", (e) => {
    eventManager.displayEvents(e.target.value);
  });
});

  // check if user is authenticated
function checkAuth() {
  return document.cookie.includes("authenticated=true");
}

  // function for sign out
function signOut() {
  document.cookie = "authenticated=; Max-Age=0; path=/";
  window.location.href = "signInForm.html";
}
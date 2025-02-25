class LocationManager {
  async addLocations() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/samayo/country-json/refs/heads/master/src/country-by-capital-city.json"
      );
      const data = await response.json();

      const locationSelector = document.getElementById("locationSelector");

      // sort alphabetically by country name
      data.sort((a, b) => a.country.localeCompare(b.country));

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select a location";
      locationSelector.appendChild(defaultOption);

      // dropdown menu (capital city,country or just country) 
      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.city
          ? `${item.city}, ${item.country}`
          : item.country;
        option.textContent = item.city
          ? `${item.city}, ${item.country}`
          : item.country;
        locationSelector.appendChild(option);
      });

      return true;
    } catch (error) {
      console.error("Error fetching locations:", error);
      return false;
    }
  }

  getSelectedLocation() {
    const locationSelector = document.getElementById("locationSelector");
    return locationSelector.value;
  }
}

const locationManager = new LocationManager();
export { locationManager };

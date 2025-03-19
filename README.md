# Search Places

Search Places is a simple web application that allows users to search for cities around the world. The application fetches city data from the **GeoDB Cities API** and displays results in a user-friendly table with pagination and customizable limits.

## Features

- **Search Box**: Users can type a city name and press Enter to search.
- **Keyboard Shortcut**: Press `CTRL + /` (Windows/Linux) or `CMD + /` (Mac) to focus on the search box.
- **Results Table**:
  - Displays city name, country, and country flag.
  - Shows "No results found" if no matching city exists.
  - Default displays **3 items per page**.
- **Pagination**: Users can navigate between pages if there are multiple results.
- **Custom Results Limit**: Users can specify the number of cities to fetch (default: **5**, max: **10**).
- **Loading Indicator**: A spinner appears while fetching results.
- **Optimized API Calls**: Prevents excessive requests on every keystroke using debouncing.

## Getting Started

### Prerequisites
- A modern web browser.
- No frameworks or third-party libraries are required.

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/TejaUppalapati217/Searchplaces.git
   ```
2. Navigate into the project directory:
   ```bash
   cd search-places
   ```
3. Open `index.html` in your browser to run the app.

## Project Structure
```
search-places/
│── index.html   # Main HTML structure
│── styles.css   # CSS styles
│── script.js    # JavaScript logic
│── README.md    # Documentation
```

## API Usage
The application fetches city data using the **GeoDB Cities API**.

Example API Request:
```javascript
const options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  headers: {
    'x-rapidapi-key': 'YOUR_API_KEY',
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
  }
};
```

### Country Flags
Flags are fetched using `https://flagsapi.com/{countryCode}/shiny/64.png`.

Example:
```
https://flagsapi.com/US/shiny/64.png
```

## Development Best Practices
- Keep code **clean**, **maintainable**, and **readable**.
- Use **formatters and linters** for consistency.
- Follow **best practices** for vanilla JavaScript, HTML, and CSS.
- **Avoid inline styles** and unnecessary third-party libraries.

## To-Do
- Improve UI responsiveness.
- Enhance search experience with autocomplete suggestions.
- Implement error handling for failed API requests.

## License
This project is open-source and free to use.

---
Start searching now and explore cities around the world! 🌍


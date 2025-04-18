# Running_App

A web-based application for runners to compute speed, time, and distance conversions. The app supports both metric (km) and imperial (miles) units and provides an intuitive interface for calculations.

## Features

- **Compute Needed Speed**: Calculate the speed required to cover a given distance within a specified time.
- **Compute Time Based on Speed**: Determine the time required to cover a distance at a given speed.
- **Unit Conversion**: Seamlessly switch between kilometers and miles.
- **Interactive UI**: Increment and decrement inputs with buttons for ease of use.
- **Validation**: Input fields are validated to ensure correct formats and values.

## Project Structure

```
.gitignore
app.js
index.html
README.md
__pycache__/
python_variant/
utils/
```

- **`app.js`**: Main JavaScript file for handling UI interactions and computations.
- **`index.html`**: HTML file for the web interface.
- **`python_variant/`**: Python implementation of the app using Kivy for a desktop GUI (DEPRECATED).
- **`utils/`**: JavaScript utility files for computations and validations.

## Getting Started

### Prerequisites

- Node.js installed on your system.

### Running the Web App Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/mihai-cristianpopa/Running_App.git
   cd Running_App
   ```

2. Install a static server (if not already installed):
   ```bash
   npm install -g serve
   ```

3. Start the server:
   ```bash
   npx serve
   ```

4. Open the app in your browser at `http://localhost:5000`.

## Deployment

The web app is deployed and accessible at:
[Running_App on GitHub Pages](https://mihai-cristianpopa.github.io/Running_App/)

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (ES6 Modules)
- **Utilities**: Node.js for local testing, GitHub Pages for deployment

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to your fork:
   ```bash
   git commit -m "Description of changes"
   git push origin feature-name
   ```
4. Open a pull request on the main repository.

## Acknowledgments

- Inspired by the needs of runners for quick and accurate computations.
- Built with love for the running community.

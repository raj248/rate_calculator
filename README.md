# Rate Calculation App

A simple and efficient React Native application for tracking piece-rate workers' daily earnings in a factory.

## Features

- **Add Daily Entries:** Users can input the quantity of 2₹ and 2.5₹ items produced.
- **Automatic Total Calculation:** Calculates daily and monthly totals based on entered data.
- **Persistent Storage:** Data is stored using Zustand and AsyncStorage.
- **Month Navigation:** Easily view previous or next month’s data with swipe gestures or buttons.
- **Backup & Restore:** Seamless integration with GitHub Gists to store and retrieve backup data.
- **Search Functionality:** Quickly find specific records.
- **Optimized UI:** Responsive and compact design, avoiding unnecessary horizontal scrolling.

## Tech Stack

- **Framework:** React Native (Expo)
- **State Management:** Zustand
- **Storage:** AsyncStorage
- **UI:** NativeWind (Tailwind for React Native)
- **Navigation:** React Navigation
- **Cloud Backup:** GitHub Gists API

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/rate-calculation-app.git
   cd rate-calculation-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   expo start
   ```

## Usage

1. **Adding an Entry:** Click the 'Add' button, input the quantities, and save.
2. **Viewing Data:** The home screen displays the current month's records.
3. **Navigating Months:** Swipe left/right or use buttons to change the month.
4. **Backup to GitHub:** Ensure a GitHub token is set, then upload data.
5. **Restore Data:** Load from GitHub if a backup exists.

## Backup & Restore

- **Backup:** The app creates or updates a private GitHub Gist with your data.
- **Restore:** Fetches the latest data from the stored Gist.

## Configuration

- **GitHub Backup:**
  - Add a **Personal Access Token (PAT)** for authentication.
  - Gist description: `Rate Calculation Backup`.
  
## Future Enhancements

- Exporting data as CSV.
- More detailed analytics.
- Cloud storage options beyond GitHub.

## License

This project is open-source under the MIT License.

---

Made with ❤️ using React Native.


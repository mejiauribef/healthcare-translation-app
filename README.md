# Healthcare Translation App

The Healthcare Translation App is a web-based application designed to facilitate real-time translation between patients and healthcare providers. It converts spoken input into text, translates it into the selected language, and provides audio playback of the translated text.

## Features
- **Voice Input**: Users can speak into their microphone, and the app will transcribe the speech into text.
- **Real-Time Translation**: The transcribed text is translated into the selected output language.
- **Audio Playback**: Users can listen to the translated text with the "Speak" button.
- **User-Friendly Interface**: A simple and intuitive design for easy navigation.

## Prerequisites
- **Node.js** and **npm** installed on your machine.
- A modern web browser (e.g., Chrome, Firefox).
- Access to the Hugging Face API for translation (API key required).

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/healthcare-translation-app.git
   cd healthcare-translation-app

2. **Install Dependencies**:
    ```bash
    npm install

3. **Set Up the Backend**:
- Navigate to the `backend` directory
- Copy the `.env.sample` file to `.env`
    ```bash
    cp backend/.env.sample backend/.env
- Open the `backend/.env` and add your Hugging Face API key:
    ```text
    HF_API_KEY=your_hugging_face_api_key

4. **Run the Application**:
- Start the Backend server
    ```bash
    cd backend
    npm start
- In a new terminal, start the front end:
    ```bash
    cd ..
    npm start

5. **Access the App**:
- A new window should open, if not, enter your modern browser and go to 'http://localhost:3000'

## Usage

1. **Start Listening**:
- Click the "Start Listening" button and speak into your microphone.
- The app will transcribe your speech into the "Original" text box.
2. **View Translation**:
- The transcribed text will be translated, and the result will appear in the "Translated" text box.
3. **Listen to Translation**:
-Click the "Speak" button to hear the translated text.

## Troubleshooting

- Translation Failed: Ensure your Hugging Face API key is correctly set in `backend/.env.`
- Microphone Issues: Check browser permissions for microphone access.
- API Errors: Verify the selected languages are supported by the translation model.
# Ibitter: A Twitter-like Social Media App for University Students

Welcome to the Ibitter GitHub repository! Ibitter is social media mobile application designed specifically for university students. Our goal is to provide a platform for students to connect, share their emotions, and exchange experiences within the university environment. Whether you're excited about a recent achievement or need a place to express your thoughts, Ibitter is here to enhance your university journey.

## 🎓 A College Project

Ibitter is the result of our hard work for the **Programming Topics in New Technologies** course. As a team of dedicated students, we've poured our knowledge and creativity into developing an application that meets the needs of modern university life.

## 📖 Project Overview

The Ibitter project consists of a dynamic front-end, a robust API, and a powerful back-end, all working together to create a seamless user experience.

### Front-end (Mobile Application)

Our front-end is built with modern technologies to ensure a smooth and engaging user interface:

- **JavaScript (ES6+)**: The foundation of our front-end development.
- **React-Native**: Empowering us to create a native-like mobile app experience.
- **Expo**: A toolchain that accelerates our React Native development.

### Back-end (Business Logic)

The back-end of Ibitter is where the magic happens. It provides the necessary services and logic to ensure the application runs flawlessly:

- **NodeJS**: The backbone of our server-side operations.
- **Express**: A fast and minimalist web application framework for Node.js.
- **PostgreSQL**: Our relational database of choice, ensuring data integrity and efficiency.

## ⬇️ Installation Guide

Getting Ibitter up and running is straightforward. Follow these steps to install the necessary components on your system:

🔔 **Note**: Installation steps may vary depending on your operating system. We've provided general guidance, but be sure to adapt them to your environment if needed.

1. **NodeJS, NPM, and Expo**: Make sure you have NodeJS, NPM, and Expo installed on your system.

2. **PostgreSQL**: Install PostgreSQL on your machine. If you need assistance, refer to the PostgreSQL documentation.

3. **Database Setup**: Log in to PostgreSQL via your terminal:

   ```sh
   psql
   ```

   Create a user named `ibitter_user`:

   ```sql
   CREATE USER ibitter_user WITH PASSWORD '<your password>' CREATEDB;
   ```

   Create a database named `ibitter_db`:

   ```sql
   CREATE DATABASE ibitter_db;
   ```

   Transfer ownership of `ibitter_db` to the `ibitter_user`:

   ```sql
   ALTER DATABASE ibitter_db OWNER TO ibitter_user;
   \q
   ```

4. **Clone the Repository**: Clone this repository to your local machine:

   ```sh
   git clone https://github.com/ricardofares/ibitter.git
   ```

5. **Front-end Dependencies**: Navigate to the project directory and install front-end dependencies:

   ```sh
   cd ibitter/frontend
   npm install
   cd ..
   ```

6. **Back-end Dependencies**: Install back-end dependencies:

   ```sh
   cd backend
   npm install
   ```

7. **Database Configuration**: In the `knexfile.js` file, update the password to match the one you set for `ibitter_user`.

## 🏃 Running Ibitter

To fully experience Ibitter, ensure both the front-end and back-end are up and running:

1. **Front-end**: Launch the front-end by executing the following commands:

   ```sh
   cd frontend
   npx expo start
   ```

2. **Back-end**: Open another terminal window, navigate to the `ibitter` directory, and start the back-end:

   ```sh
   cd backend
   npm run start
   ```

Congratulations! Ibitter is now live, and you're ready to dive into the world of university-focused social media.

Feel free to explore, share your emotions, and connect with other students. If you encounter any issues or have suggestions for improvement, don't hesitate to reach out. Happy Ibittering! 🎉

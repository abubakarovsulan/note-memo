# note-memo

This is a simple webapplication, which is build with various technologies for testing / practicing purposes. You can store any of your ideas in MongoDB and they will be presented in the webapplication **ONLY** for the user who inserted the data. So it has authentication, but also authorization.

![note-memo-homepage](/assets/images/notememo-homepage.png)

---

## Getting Started

1. clone the project

1. `npm install` in the main folder

1. replace *process.env.SESSION_SECRET* and *process.env.MONGODB_URI* in **server.js** with your details

1. run **mongod** in your terminal

1. `npm start`, to start the web server

1. per default the web server listens on **port 3000**

1. insert new notes with a HTTP Post-Request to this URI *localhost:PORT-NUMBER/add-note* with the **username, title** and **content**

---

## Used Technologies

- AJAX
- NodeJS
- JavaScript
- Express
- API Calls
- Passport for authentication / authorization
- Session management via mongoose / passport
- Mongoose
- MongoDB
- Html
- CSS
- JQuery
- Bootstrap4
- EJS

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = 8000;
const { login, signup, logout } = require("./Controllers/AuthControllers");
const noteRoutes = require("./Routes/Notes");
const cookieParser = require("cookie-parser")

//Load environment from variables from .env files
dotenv.config();
require("./Models/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser()); 

app.get("/", (req, res) => {
  res.write("Welcome to NodeJs server");
  res.send();
});

app.use("/notes", noteRoutes);

app.post("/test", (req, res) => {   //for test authorization
  //Read the authorization token
  const contentType = req.headers["content-type"];
  const authHeader = req.headers["authorization"] || "No auth header provide";

  //check if user is authorized
  if(authHeader !== '1234'){
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Invalid token"
    });
  }

  const { name, age } = req.body;

  res.status(200).json({
    success: true,
    headers: {
      contentType: contentType,
      authorization: authHeader,
    },
    body: {
      name,
      age,
    },
    message: `Hello ${name}, you are ${age} years old!`,
  });
});


app.post("/login", login);
app.post("/signup", signup);
app.post("/logout", logout);

app.listen(PORT, () => {
  console.log(`Listining to Port ${PORT}`);
});

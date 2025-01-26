const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

const port = 3000;
const app = express();
app.use(cors());
dotenv.config();


const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

const HEADER = {
  Authorization: "Basic "+btoa(":"+API_KEY)
};

app.use(express.static(path.join(__dirname,"dist")));

app.get("/api/file", async (req, res) => {
  try {
    const response = await fetch(BASE_URL+"/user/files", {
      method: "GET",
      headers: HEADER,
    });
    res.send(await response.json());
  } catch (err) {
    res.send(err);
  }
});

app.delete("/api/file/:id", async (req, res) => {
  try {
    const response = await fetch(BASE_URL+"/file/"+req.params.id, {
      method: "DELETE",
      headers: HEADER,
    });
    res.send(await response.json());
  } catch (err) {
    res.send(err);
  }
});

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"dist","index.html"));
})

module.exports = app;
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import express from "express";
const app = express(); 

const port = 90;

app.get("/", (req, res) => {
    res.send("<h1>Full Cycle Rocks!!!</h1>")
});

app.listen({
    port: port,
    host: "0.0.0.0"
});
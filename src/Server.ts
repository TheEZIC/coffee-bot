import express from "express";

const Express = express();

Express.all("./", (req, res) => res.send("ok"));

const startServer = () => Express.listen(3000, () => console.log("[Server] server started"));

export default startServer ;
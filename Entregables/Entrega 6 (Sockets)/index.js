const express = require("express");
const { Server: IOServer } = require("socket.io");

const app = express()

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server on - Port: ${PORT}`);
})
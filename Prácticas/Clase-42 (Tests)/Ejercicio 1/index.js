const { writeFile } = require("fs");
const http = require("http");
const https = require("https");

const options = {
  hostname: "jsonplaceholder.typicode.com",
  port: 80,
  path: "/posts",
  method: "GET",
};

const req = http.request(options, (res) => {
  console.log(`StatusCode: ${res.statusCode}`);

  res.on("data", (posts) => {
    const data = posts;
    const file = "postsHttp.json";
    writeFile(file, JSON.stringify(data, null, "\t"), (error) => {
      if (error) throw "Error de escritura de archivo";

      console.log(`Escritura en archivo: ${file}`);
    });
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.end();

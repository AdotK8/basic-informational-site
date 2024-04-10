const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { name } = path.parse(req.url);
  console.log(name);
  const pageName = name || "index";

  let filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : pageName + ".html"
  );

  let contentType = "text/html";

  //read file
  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        res.writeHead(500);
        res.end("server error:" + err.code);
      }
    } else {
      res.writeHead(200, { "content-type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.port || 8080;

server.listen(PORT, console.log(`server running on port ${PORT}`));

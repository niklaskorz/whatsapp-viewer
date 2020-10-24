#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");
const url = require("url");
const path = require("path");
const open = require("open");
const next = require("next");
const conf = require("../next.config");

const app = next({ conf, dir: path.resolve(__dirname, "..") });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = url.parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
      open("http://localhost:3000");
    });
});

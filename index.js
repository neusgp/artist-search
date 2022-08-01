const express = require("express");
const fs = require("fs");
const fetch = require("node-fetch");

const secrets = require("./secrets.json"); // the API keys
const functions = require("./functions.js");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world!");
});

//this is the route that the client side can call in order to obtain the CSV file with the results.
//It contains two params: :artist => artist name || :filename => the user-supplied file name.

app.get("/api/:artist/:filename", (req, res) => {
    console.log("GET request to /api/filename");

    const { artist, filename } = req.params;

    //fetching the Last.fm API using the :artist parameter and the imported API_KEY.

    fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${secrets.API_KEY}&format=json&limit=10`
    )
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                let results = data.results.artistmatches.artist;
                const artists = functions.filterData(results); // Filtering the retrieved data

                const csv = functions.createCSV(artists, filename);

                fs.writeFile(`${filename}.csv`, csv, function (err) {
                    if (err) {
                        return console.log("error", err);
                    }
                    res.attachment(`${filename}.csv`);
                    res.end();
                });
            }
            console.log("No results", data);
        })
        .catch((err) => {
            console.log("error getting an artist", err);
            res.end();
        });
});

app.listen(port, () => console.log(`Hello world app listening on port 3000!`));

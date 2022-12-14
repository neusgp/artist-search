const express = require("express");
const fetch = require("node-fetch");

require("dotenv").config({ path: __dirname + "/.env" });

/* const secrets = require("./secrets.json"); */ 
const functions = require("./functions.js"); // useful functions
const artist_names = require("./artist_names.json"); // random artist names

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(
        '<html><p>To download the CSV file, add the following query to the URL: api/"artist"/"filename"</p><p>Example: ...api/madonna/madonna_list</p></html>'
    );
});

//This is the REST Api that the client side can call in order to obtain the CSV file with the results.
//The route contains two params: :artist => artist name || :filename => the user-supplied file name.

app.get("/api/:artist/:filename", (req, res) => {
    const { artist, filename } = req.params;

    //Now we fetch the Last.fm API using the :artist parameter and the imported API_KEY. I decided to limit the number of results to 20.

    fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${process.env.API_KEY}&format=json&limit=20`
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.results.artistmatches.artist[0]) {
                //If there are results, we write them in a CSV file and send everything to the user:
                let csv = functions.getCSV(data.results.artistmatches.artist); //see functions.js
                res.attachment(`${filename}.csv`).send(csv); // sending the CSV file to the user (download)
                console.log("Success");
                return;
            }
            //Otherwise, if there are no results, we get a random name from "artist_names.json" and we use it as a parameter:
            const randomName = functions.getRandomName(artist_names);
            fetch(
                `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${randomName}&api_key=${process.env.API_KEY}&format=json&limit=20`
            )
                .then((res) => res.json())
                .then((data) => {
                    let csv = functions.getCSV(
                        data.results.artistmatches.artist
                    );
                    res.attachment(`${filename}.csv`).send(csv);
                    console.log("Success");
                })
                .catch((err) => {
                    console.log("error getting json artist", err);
                    res.end();
                });
        })
        .catch((err) => {
            console.log("error getting artist", err);
            res.end();
        });
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});



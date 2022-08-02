const express = require("express");
const fetch = require("node-fetch");

const secrets = require("./secrets.json"); // the API keys
const functions = require("./functions.js");
const random_artists = require("./random_artists.json");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send(
        '<html><p>To download the CSV file, add the following query to the URL: /"artist"/"filename"</p><p>Example: .../madonna/madonna_list</p></html>'
    );
});

//this is the REST Api that the client side can call in order to obtain the CSV file with the results.
//The route contains two params: :artist => artist name || :filename => the user-supplied file name.

app.get("/:artist/:filename", (req, res) => {
    console.log("GET request to /api/filename");

    const { artist, filename } = req.params;

    //Now we fetch the Last.fm API using the :artist parameter and the imported API_KEY. I decided to limit the number of results to 20.

    fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${secrets.API_KEY}&format=json&limit=20`
    )
        .then((res) => res.json())
        .then((data) => {
             if (data) {
                //If there are results, we write them in a CSV file and send everything to the user:
                let results = data.results.artistmatches.artist; //accessing the object values
                const artists = functions.filterData(results); // filtering the retrieved data
                const csv = functions.createCSV(artists); //building a string in CSV format
                res.attachment(`${filename}.csv`).send(csv); // sending the CSV file to the user (download)
            }
            //Otherwise, if there's no data we give the user some results from our JSON file.
            console.log("No results", data);
            const csv = functions.createCSV(random_artists);
            res.attachment(`${filename}.csv`).send(csv);
        })
        .catch((err) => {
            console.log("error getting an artist", err);
            res.end();
        });
});

app.listen(port, () => console.log(`listening on port 3000!`));


module.exports.filterData = (results) => {
    var artists = [];
    for (i = 0; i < results.length; i++) {
        artists.push([
            results[i].name,
            results[i].mbid,
            results[i].url,
            /*  results[i].image, */
        ]);
    }
    return artists;
};

module.exports.createCSV = (data) => {
    var csv = "name,mbid,url\r\n";
    for (let i of data) {
        csv += i.join(",") + "\r\n";
    }
    return csv;
};

/* module.exports.deleteFile = (file) => {
    setTimeout(() => {
        fs.unlink(file, (err) => {
            if (err) {
                console.log("err", err);
            }
            console.log("file deleted");
        });
    }, 5000);
};

module.exports.writeFile = (filename, csv) => {
    fs.writeFile(`${filename}.csv`, csv, (err) => {
        if (err) {
            return console.log("error", err);
        }
        console.log("file created");
    });
};
 */

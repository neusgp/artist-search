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

module.exports.createCSV = (data, filename) => {
    var csv = "name,mbid,url\r\n";
    for (let i of data) {
        csv += i.join(",") + "\r\n";
    }
    return csv;
};

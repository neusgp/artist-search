module.exports.filterData = (results) => {
    var artists = [];
    for (i = 0; i < results.length; i++) {
        artists.push([
            results[i].name,
            results[i].mbid,
            results[i].url,
            results[i].image[0]["#text"],
            results[i].image[1]["#text"],
        ]);
    }
    return artists;
};

module.exports.createCSV = (data) => {
    var csv = "name,mbid,url,image_small,image\r\n";
    for (let i of data) {
        csv += i.join(",") + "\r\n";
    }
    return csv;
};

module.exports.getRandomNames = (artist_names) => {
    const names = [];
    let i = 0;
    while (i < 20) {
        const index = Math.floor(Math.random() * artist_names.length);
        names.push(artist_names[index]);
        i++;
    }
    return names;
};

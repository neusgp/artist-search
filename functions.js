const filterData = (data) => {
    var array = [];
    for (i = 0; i < data.length; i++) {
        array.push([
            data[i].name,
            data[i].mbid,
            data[i].url,
            data[i].image[0]["#text"], //When receiving the data from the API, I saw there are no "image" and "image_small" values, so I accessed the "images" array and I got the url for the small and medium images.
            data[i].image[1]["#text"],
        ]);
    }
    return array;
};

const createCSV = (array) => {
    var csv = "name,mbid,url,image_small,image\r\n";
    for (let i of array) {
        csv += i.join(",") + "\r\n";
    }
    return csv;
};

module.exports.getRandomName = (artist_names) => {
    const index = Math.floor(Math.random() * artist_names.length);
    return artist_names[index];
};

module.exports.getCSV = (data) => {
    const array = filterData(data);
    const csv = createCSV(array);
    return csv;
};

# REST Api application

This Node.js application connects with the Last.fm Api :guitar: (https://www.last.fm/api/show/artist.search), allows the user to search for an artist name :mag: and retreives a list of matching results in a CSV file :clipboard:. If there are no results available, the app gets a random name from a .json file (artis_names.json) and uses it to do one more search.

# Tools

To build this app i used...

-   Node.js
-   Express
-   node-fetch

## Try it!

:globe_with_meridians: https://artist-search-nodejs.herokuapp.com/

-   Open the app in the browser.
-   To download the CSV file, add "/api" to the URL, and then the artist name and your desired filename:
    Example: .../api/madonna/madonna_list
-   Press enter and the CSV file will download.

# REST Api application

This Node.js application connects with the Last.fm Api :guitar: (https://www.last.fm/api/show/artist.search), allows the user to search for an artist name :mag: and retreive a list of matching results in a CSV file :clipboard:. If there are no results available, we give the user a list of random artists names.

# Tools

To build this app i used...

-   Node.js
-   Express
-   node-fetch

## Try it!

:globe_with_meridians: https://artist-search-nodejs.herokuapp.com/

-   Open the app in the browser.
-   To download the CSV file, add "/api" to the URL, and then the artist name and your desired filename:
    Example: .../api/madonna/madona_list
-   Press enter and the CSV file will download.

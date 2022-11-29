# Map of intergovernmental organisations

## About
Intergovernmental organisations map or IGO map for short,
is an interactive application where you can select any of around 250 different international
organisations which were data-scraped from [World Fact Book](https://www.cia.gov/the-world-factbook/) using python into a [JSON file](https://github.com/forgeManNation/map/blob/a94a262f0891681e9198abf3c95a37240c06052f/src/data/IGOs.json), which now functioms as a user side database.
Additional data about all of the countries were downloaded from a public source and can be found in another [JSON file](https://github.com/forgeManNation/map/blob/a94a262f0891681e9198abf3c95a37240c06052f/src/data/world_countries_information.json).
In next versions of this app the information and most importantly the flag of each country will be stored server-side to prevent long loading times. Additional data about each organisation are fetched from wikipedia and loaded asynchronously. 


## Technology used
Aplication uses React, Leaflet Tailwind and Typescript.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# nodejs_tw_grid
A sort of reverse engineering of the Trade Wars 2002 bbs Game Grid routines.

![alt text](https://raw.githubusercontent.com/mvcuccaro/nodejs_tw_grid/master/images/screenshot01.png "grid screenshot")

I was discussing old bbs door games with a few friends and I joked that we should do a modern trade-wars 2002 port. I dont really have time to do that for real and I even saw that some other people have attempted it but... I remember, when I was a kid, wondering how the grid initialization worked - as well as how the seemingly random travel routes between sectors  were "calculated". This is my reimaging of how it might be done. 

It is a single module that provides a grid that will initliaize itself as a pseudo vector.  It will initialize a random grid with hardcoded values if no init argument is passed but can also take init parameters or a static grid if you want to load one you've stored in a file, db, memory etc. The grid provides sequential sector values but randomly distributed throughout different coordinates.  It provides functions to convert a sector value to a coordinate pair and vice versa.  It also provides a function to return an array of sectors that must be passed through based on a beginning and ending sector value. 

This grid could easily be serialized and stored - and sector values could be mapped to meta data in a db or flat file to store information about who or what is in any given sector.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

```sh
git clone https://github.com/mvcuccaro/nodejs_tw_grid.git
cd nodejs_tw_grid
npm start
```

## Usage
Sample code for using the grid: 

```javascript
var twgrid = require('./twgrid');

//an random grid initiliazed with properties. 
mygrid = twgrid({cell_count:20, items_per_row:4});
console.log('A custom size random grid\n');
mygrid.drawGrid();


//a static grid initilized with a predefined static grid
console.log('\nA static grid\n');
mygrid = twgrid({grid: [[1,2,3], [4,5,6]]});
mygrid.drawGrid();


//a random grid initilaized with hardcoded default values
console.log('a hardcoded random grid')
mygrid = twgrid();;
//Draw the grid
console.log("\nHardcoded size Random Grid:\n");
mygrid.drawGrid();



console.log("\n");

//get coordinates for a sector
console.log('The coordinates of sector 23 are ', mygrid.getCoordinatesByValue(23));

//get sector from a coordinate pair
console.log('The sector at coordinates 2,3 are ', mygrid.getValueByCoordinates([2,3]));

//get route from 2 sectors
console.log('The route from sector 24 to 11 is', mygrid.getRoute(24, 11));
```

Watch out for the Ferengi!
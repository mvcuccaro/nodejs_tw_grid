var twgrid = require('./twgrid')();

//Draw the grid
console.log("\n\nThe Gridd:\n");
twgrid.drawGrid();

console.log("\n\n");

//get coordinates for a sector
console.log('The coordinates of sector 23 are ', twgrid.getCoordinatesByValue(23));

//get sector from a coordinate pair
console.log('The sector at coordinates 2,3 are ', twgrid.getValueByCoordinates([2,3]));

//get route from 2 sectors
console.log('The route from sector 24 to 11 is', twgrid.getRoute(24, 11));

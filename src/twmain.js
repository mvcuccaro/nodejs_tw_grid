var twgrid = require('./twgrid');
mygrid = twgrid({cell_count:20, items_per_row:4});
console.log('A custom size random grid\n');
mygrid.drawGrid();

console.log('\nA static grid\n');
mygrid = twgrid({grid: [[1,2,3], [4,5,6]]});
mygrid.drawGrid();


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

/**
* Initialize and return a grid
*/
getTwGrid = function(arg_init = {}){
	var twgrid = {};

	//load a static grid if passed in arg_init
	if( arg_init.grid ){
		twgrid.grid = arg_init.grid;

		//since we dont have an items per row - extrapolate it.
		twgrid.items_per_row = twgrid.grid[0].length;
	} else {
		twgrid.cell_count = arg_init.cell_count ? arg_init.cell_count : 100;  //get arg_init value or use 100
		var sequential = Array.apply(null, {length: twgrid.cell_count}).map(Number.call, Number);
		var shuffled = shuffle(sequential);


		//init grid
		twgrid.grid = [];
		twgrid.items_per_row = arg_init.items_per_row ? arg_init.items_per_row : 10; //get arg_init value or use 10

		var row_item = 0;
		var row = 0;
		shuffled.forEach( val => {
			if( typeof(twgrid.grid[row]) == 'undefined') {
				twgrid.grid[row] = [];
			}
			twgrid.grid[row].push(val)
			row_item++;
			if( row_item == twgrid.items_per_row ){
				row_item = 0;
				row++;
			}
		})
	}

	

	//find coordiantes of a value in the grid.
	twgrid.getCoordinatesByValue = function(arg_value){
		let total_rows = twgrid.grid.length;
		let x=0;
		let y=0;
		twgrid.grid.some(val => {
			x = twgrid.grid[y].indexOf(arg_value);
			if( x == -1 ){
				y++;
				return false;
			} else {
				return true;
			}
		})

		return [x,y];
	}

	//find the value at the following coordinates
	twgrid.getValueByCoordinates = function(arg_coordinates){
		y = arg_coordinates[0];
		x = arg_coordinates[1];

		return twgrid.grid[x][y];
	}

	//draw the grid
	twgrid.drawGrid = function(){
		twgrid.grid.forEach(y => {
			let row = '';
			y.forEach(x => {
				row += pad(x, 3) + ' | ';
			})
			console.log(row);
			console.log('-'.repeat(twgrid.items_per_row * 6));
		})

	}

	//return the shortest route from one value to another
	twgrid.getRoute = function(arg_begin, arg_end){
		let route = [arg_begin];

		let coord_begin 	= twgrid.getCoordinatesByValue(arg_begin);
		let coord_end 		= twgrid.getCoordinatesByValue(arg_end);

		let x_begin 		= coord_begin[0];
		let x_end 			= coord_end[0];
		let x_distance 		= x_end - x_begin;
		let x_direction 	= x_distance < 0 ? -1 : 1;

		let y_begin 		= coord_begin[1];
		let y_end 			= coord_end[1];
		let y_distance 		= y_end - y_begin;
		let y_direction 	= y_distance < 0 ? -1 : 1;

		//console.log('x', x_begin, x_end, x_distance, x_direction);
		//console.log('y', y_begin, y_end, y_distance, y_direction);

		let wx = true;
		let current_x 		= x_begin;
		let distance_left 	= Math.abs(x_distance);

		if( x_begin != x_end ){
			while(wx){
				current_x = current_x + (x_direction);
				distance_left--;
				current_xy = [current_x, y_begin];
				route.push(twgrid.getValueByCoordinates(current_xy))
				wx = distance_left ? true : false;
			}
		}

		let wy = true;
		current_y 		= y_begin;
		distance_left 	= Math.abs(y_distance);

		if( y_begin != y_end ){
			while(wy){
				current_y 	= current_y + (y_direction);
				distance_left--;
				current_xy 	= [current_x, current_y];
				route.push(twgrid.getValueByCoordinates(current_xy));
				wy = distance_left ? true : false;
			}
		}

		return route;	
	}

	return twgrid;
}

module.exports = getTwGrid;

//fisher-yates shuffle provided at:
//https://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}

//pad numbers
//https://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
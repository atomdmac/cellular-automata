function Conway (map) {

	// Create 2 maps to alternate between:
	// - One will hold the current state and will be used by cells to determine 
	//   their new state.
	// - The other will be modified based on the states of cells in the first map.
	this.map1 = map;
	this.map2 = map.clone();
}

Conway.prototype.iterate = function () {
	var map1 = this.map1, 
		map2 = this.map2,
		alive,
		count;

	for(var x=0; x<map1.data.length; x++) {
		for(var y=0; y<map1.data[x].length; y++) {

			count = map1.getSurroundingWallCount(x, y);
			alive = map1.getCell(x, y) === 1 ? true: false;

			// Cells on the outside are always alive.
			if(x === 0 || x === map1.width - 2) map2.setCell(x, y, 1);
			else if(y === 0 || y === map1.height - 2) map2.setCell(x, y, 1);

			// Under population
			else if(count < 2) map2.setCell(x, y, 0);

			// Juuuust right.  If alive, live to see another iteration.
			else if(alive && (count === 2 || count === 3)) map2.setCell(x, y, 1);

			// Over population.
			else if(count > 3) map2.setCell(x, y, 0);
			
			// Birth
			else if(!alive && count === 3) map2.setCell(x, y, 1);
		}
	}

	map1.duplicate(map2);
};
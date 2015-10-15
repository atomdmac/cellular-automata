function Map (width, height, cellSize, canvas) {

	// Save map dimensions.
	this.width = width;
	this.height = height;
	this.cellSize = cellSize;
	
	// Create initial map grid.
	this.data = [];
	for(var w=0; w<width; w++) {
		this.data[w] = [];
		for(var h=0; h<height; h++) {
			this.data[w][h] = 0;
		}
	}

	// Save canvas reference.
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
}

Map.prototype.randomize = function () {
	for(var x=0; x<this.width; x++) {
		for(var y=0; y<this.height; y++) {
			this.data[x][y] = Math.random() > 0.5 ? 0 : 1;
		}
	}
};

// Return a clone of this map.
Map.prototype.clone = function () {
	var map = new Map(this.width, this.height, this.cellSize, this.canvas)
	map.duplicate(this);
	return map;
};

// Duplicate the settings/data from another map and apply it to this map.
Map.prototype.duplicate = function (map) {
	this.width = map.width;
	this.height = map.height;
	this.cellSize = map.cellSize;
	this.canvas = map.canvas;
	this.context = map.canvas.getContext('2d');
	this.data = [];

	for(var x=0; x<map.width; x++) {
		this.data[x] = [];
		for(var y=0; y<map.height; y++) {
			this.data[x][y] = map.data[x][y];
		}
	}
};

Map.prototype.render = function () {
	// Clear existing graphics
	// this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fillStyle = '#fff';
	this.context.globalAlpha = 0.9;
	this.context.beginPath();
	this.context.rect(0, 0, this.canvas.width, this.canvas.height);
	this.context.fill();

	// Draw each cell.
	for(var x=0; x<this.width; x++) {
		for(var y=0; y<this.height; y++) {
			this.renderCell(x, y);
		}
	}
};

Map.prototype.renderCell = function(x, y, data) {
	var ctx = this.context;

	ctx.fillStyle = this.data[x][y] === 1 ? '#000' : '#fff';
	ctx.beginPath();
	ctx.rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
	ctx.fill();
};

Map.prototype.setCell = function (x, y, data) {
	if(x >= 0 && x < this.width - 1 && y >= 0 && y < this.height - 1) {
		this.data[x][y] = data;
	}
};

Map.prototype.getCell = function (x, y) {
	if(x >= 0 && x < this.width - 1 && y >= 0 && y < this.height - 1) {
		return this.data[x][y];
	} else {
		return false;
	}
};

Map.prototype.getSurroundingWallCount = function (x, y) {
	var count = 0;

	// N
	if(this.getCell(x, y-1) === 1) count++;
	// NE
	if(this.getCell(x+1, y-1 === 1)) count++;
	// E
	if(this.getCell(x+1, y) === 1) count++;
	// SE
	if(this.getCell(x+1, y+1 === 1)) count++;
	// S
	if(this.getCell(x, y+1) === 1) count++;
	// SW
	if(this.getCell(x-1, y+1 === 1)) count++;
	// W
	if(this.getCell(x-1, y) === 1) count++;
	// NW
	if(this.getCell(x-1, -1) === 1) count++;

	return count;
};
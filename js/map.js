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
	console.log(canvas);
	this.context = canvas.getContext('2d');
}

Map.prototype.randomize = function () {
	for(var x=0; x<this.width; x++) {
		for(var y=0; y<this.height; y++) {
			this.data[x][y] = Math.random() > 0.5 ? 0 : 1;
		}
	}
};

Map.prototype.render = function () {
	// Clear existing graphics
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
		throw "Cell coordinates are out of bounds, y'dummy.";
	}
};
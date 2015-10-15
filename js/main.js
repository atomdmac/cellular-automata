function Main () {
	var map = new Map(50, 50, 10, document.getElementById('stage'));
	map.randomize();
	map.render();
}
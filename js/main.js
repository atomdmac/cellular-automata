function Main () {
	var map = new Map(50, 50, 5, document.getElementById('stage'));
	map.randomize();

	var conway = new Conway(map);

	setInterval(function () {
		conway.iterate();
		map.render();
	}, 500);
}
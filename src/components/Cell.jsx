import React from 'react';

function Cell({ id, cell, cells, setCells, firstGo, setFirstGo, winner,score }) {
	function handleGame(event) {
		let taken =
			event.target.firstChild.classList.contains('circle') ||
			event.target.firstChild.classList.contains('cross');

		if (!taken && firstGo === 'circle' && !winner) {
			event.target.firstChild.classList.add('circle'); // Играчот игра со 'circle'
			handleCellChange('circle');
			setFirstGo('cross'); // Следен е компјутерот
		}
	}

	function handleCellChange(classList) {
		let updateArrayCell = cells.map((el, index) => (index === id ? classList : el));
		setCells(updateArrayCell);
	}

	return (
		<div
			className='square'
			id={id}
			onClick={handleGame}>
			<div className={cell}></div>
		</div>
	);
}

export default Cell;

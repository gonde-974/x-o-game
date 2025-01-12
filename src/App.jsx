import { useEffect, useState } from 'react';

import './App.css';
import Cell from './components/Cell';

function App() {
	const [cells, setCells] = useState(Array(9).fill('')); // Почетна состојба на клетки
	const [firstGo, setFirstGo] = useState('circle'); // Прв потег секогаш е на играчот
	const [winner, setWinner] = useState(null); // Победник
  const [score, setScore] = useState({ X: 0, O: 0 });


	let checkArray = cells.every((cell) => cell !== ''); // Проверува дали сите клетки се пополнети

	useEffect(() => {
    if (!winner) { // Проверете дали победникот веќе е поставен
      checkWinner(); // Проверува за победник по секој потег
    }
  
    if (firstGo === 'cross' && !winner && !checkArray) {
      setTimeout(() => makeComputerMove(), 500); // Компјутерскиот потег
    }
  
  }, [cells, firstGo]); // Немојте да го вклучувате score во зависности за да избегнете бескраен циклус
  

function updateScore(winner) {
  if (winner === 'circle') {
    setScore(prev => ({ ...prev, O: prev.O + 1 }));
  } else if (winner === 'cross') {
    setScore(prev => ({ ...prev, X: prev.X + 1 }));
  }
}


function checkWinner() {
  let winnerCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winnerCombination.forEach((comb) => {
    let crossWinner = comb.every((cell) => cells[cell] === 'cross');
    let circleWinner = comb.every((cell) => cells[cell] === 'circle');

    if (crossWinner) {
      setWinner('Победник е играчот (X)!');
      updateScore('cross');
      return;
    } else if (circleWinner) {
      setWinner('Победник е играчот (O)!');
      updateScore('circle');
      return;
    } else if (checkArray) {
      setWinner(`<p>Нерешено!</p`);
    }
  });
}



	function makeComputerMove() {
		let winnerCombination = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		// Проверка за победнички потег
		for (let comb of winnerCombination) {
			let [a, b, c] = comb;
			if (cells[a] === 'cross' && cells[b] === 'cross' && cells[c] === '') {
				return makeMove(c);
			}
			if (cells[a] === 'cross' && cells[c] === 'cross' && cells[b] === '') {
				return makeMove(b);
			}
			if (cells[b] === 'cross' && cells[c] === 'cross' && cells[a] === '') {
				return makeMove(a);
			}
		}

		// Проверка за блокирање на играчот
		for (let comb of winnerCombination) {
			let [a, b, c] = comb;
			if (cells[a] === 'circle' && cells[b] === 'circle' && cells[c] === '') {
				return makeMove(c);
			}
			if (cells[a] === 'circle' && cells[c] === 'circle' && cells[b] === '') {
				return makeMove(b);
			}
			if (cells[b] === 'circle' && cells[c] === 'circle' && cells[a] === '') {
				return makeMove(a);
			}
		}

		// Ако нема победнички или блокирачки потег, игра случајно
		let emptyCells = cells.map((cell, index) => (cell === '' ? index : null)).filter((index) => index !== null);
		if (emptyCells.length > 0) {
			let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
			makeMove(randomIndex);
		}
	}

	function makeMove(index) {
		let updatedCells = [...cells];
		updatedCells[index] = 'cross';
		setCells(updatedCells);
		setFirstGo('circle'); // Потегот се враќа на играчот
	}

	function handleResetGame() {
		if (winner || checkArray) {
			setCells(Array(9).fill('')); // Ресетирање на таблата
			setWinner(null);
			setFirstGo('circle'); // Играчот секогаш почнува прв
		}
	}

	return (
		<div className='app'>
			<h1 className='title'> (X/O) GAME</h1>
			<div className='squareContainer'>
				{cells.map((cell, index) => (
					<Cell
						key={index}
						id={index}
						cell={cell}
						cells={cells}
						setCells={setCells}
						firstGo={firstGo}
						setFirstGo={setFirstGo}
						winner={winner}
            score={score}
					/>
				))}
				<button onClick={handleResetGame}>Ресетирај ја играта</button>
				{winner && <h2>{winner}</h2>}
       
			</div>
		</div>
	);
}

export default App;

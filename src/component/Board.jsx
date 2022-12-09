import Square from './Square';
import { useEffect, useRef, useState } from 'react';
import { getRandInt } from '../utils/utils';
import '../style/style.css';

export default function Board() {
	const [firstPlayerLine, setFirstPlayerLine] = useState([]);
	const [secondPlayerLine, setSecondPlayerLine] = useState([]);

	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		checkWinner();
		console.log('First Player =>', firstPlayerLine);
		console.log('Second Player =>', secondPlayerLine);
	}, [firstPlayerLine]);

	const checkWinner = () => {
		if (firstPlayerLine.length === 4 || secondPlayerLine.length === 4) {
			resetGamePlay();
			return;
		}

		setTimeout(() => {
			// secondPlayerTurn();
			firstPlayerLine.length !== 0 && secondPlayerTurn();
		}, 1000);
	};

	const firstPlayerTurn = (id) => {
		firstPlayerLine.length < 4 && setFirstPlayerLine([...firstPlayerLine, id]);
	};

	const secondPlayerTurn = () => {
		let idSquare = getRandInt(0, 8);
		console.log(
			'CHECK TRUE FALSE =>',
			firstPlayerLine.includes(idSquare),
			'==',
			secondPlayerLine,
			idSquare
		);
		while (firstPlayerLine.includes(idSquare) || secondPlayerLine.includes(idSquare)) {
			idSquare = getRandInt(0, 8);
		}
		// idSquare =  ? getRandInt(0, 8) : idSquare;
		setSecondPlayerLine([...secondPlayerLine, idSquare]);
		console.log('SECOND PLAYER TURN ID => ', idSquare);
	};

	const resetGamePlay = () => {
		setFirstPlayerLine([]);
		setSecondPlayerLine([]);
	};

	return (
		<>
			<div className='board'>
				<div className='board-info-section'>
					<h1>AMADIKETU</h1>
					<button className='btn-reset' onClick={resetGamePlay}>
						Reset
					</button>
				</div>
				<div className='board-square-section'>
					{secondPlayerLine.length === 3 && <div className='blocker'></div>}
					{Array(9)
						.fill(null)
						.map((el, id) => {
							return (
								<Square
									id={id}
									key={id}
									onClick={() => firstPlayerTurn(id)}
									oActive={firstPlayerLine.includes(id)}
									xActive={secondPlayerLine.includes(id)}
								/>
							);
						})}
				</div>
			</div>
			{/* <Square /> */}
		</>
	);
}

// TODO : set mode PvP
// TODO : SET DISABLED BOARD BEFORE SECONDPLAYER TURN

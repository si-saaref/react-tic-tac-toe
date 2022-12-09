import Square from './Square';
import '../style/style.css';
import { useEffect, useRef, useState } from 'react';
import { getRandInt } from '../utils/utils';

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
		if (firstPlayerLine.length === 4) {
			resetGamePlay();
			return;
		}

		setTimeout(() => {
			secondPlayerTurn();
		}, 1000);
	};

	const firstPlayerTurn = (id) => {
		setFirstPlayerLine([...firstPlayerLine, id]);
	};

	// TODO : SET DISABLED BOARD BEFORE SECONDPLAYER TURN
	const secondPlayerTurn = () => {
		let idSquare = getRandInt(0, 8);
		console.log(
			'CHECK TRUE FALSE =>',
			firstPlayerLine.includes(idSquare),
			'==',
			secondPlayerLine,
			idSquare
		);
		while (firstPlayerLine.includes(idSquare)) {
			idSquare = getRandInt(0, 8);
		}
		// idSquare =  ? getRandInt(0, 8) : idSquare;
		setSecondPlayerLine([...secondPlayerLine, idSquare]);
		console.log('SECOND PLAYER TURN ID => ', idSquare);
	};

	const resetGamePlay = () => {
		setFirstPlayerLine([]);
	};

	return (
		<>
			<div className='board'>
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
			{/* <Square /> */}
		</>
	);
}

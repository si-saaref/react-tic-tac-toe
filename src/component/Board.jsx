import Square from './Square';
import { useEffect, useRef, useState } from 'react';
import { getRandInt, listIdWinner } from '../utils/utils';
import '../style/style.css';

export default function Board() {
	const [firstPlayerLine, setFirstPlayerLine] = useState([]);
	const [secondPlayerLine, setSecondPlayerLine] = useState([]);
	const [winner, setWinner] = useState();
	const [score, setScore] = useState({
		p1: 0,
		p2: 0,
	});
	const [gameMode, setGameMode] = useState('computer');

	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		firstPlayerLine.length !== 0 && gameMode === 'computer' && secondPlayerTurn();
		// console.log('Second Player =>', secondPlayerLine);
	}, [firstPlayerLine]);

	useEffect(() => {
		if (firstPlayerLine.length === 3) {
			const { firstStatus, secondStatus } = checkWinner();
			console.log({ firstStatus, secondStatus }, firstStatus && secondStatus);
			firstStatus && secondStatus
				? setWinner('DRAW')
				: firstStatus
				? (setWinner(gameMode === 'computer' ? 'You' : 'Player 1'),
				  setScore({ ...score, p1: score.p1 + 1 }))
				: secondStatus
				? (setWinner(gameMode === 'computer' ? 'Computer' : 'Player 2'),
				  setScore({ ...score, p2: score.p2 + 1 }))
				: setWinner('DRAW');

			setTimeout(() => {
				resetGamePlay();
			}, 3000);
		}
	}, [secondPlayerLine]);

	const checkWinner = () => {
		// if () {
		const firstStatus = listIdWinner.some((item) => {
			return JSON.stringify(item) == JSON.stringify(firstPlayerLine.sort());
		});
		const secondStatus = listIdWinner.some(
			(item) => JSON.stringify(item) == JSON.stringify(secondPlayerLine.sort())
		);
		// }
		if (firstStatus === false && secondStatus === false) {
			return {
				firstStatus: true,
				secondStatus: true,
			};
		}
		return {
			firstStatus,
			secondStatus,
		};
	};

	const firstPlayerTurn = (id) => {
		firstPlayerLine.length !== secondPlayerLine.length
			? firstPlayerLine.length <= 3 && setSecondPlayerLine([...secondPlayerLine, id])
			: firstPlayerLine.length <= 3 && setFirstPlayerLine([...firstPlayerLine, id]);
	};

	const secondPlayerTurn = () => {
		let idSquare = getRandInt(0, 8);
		// console.log('CHECK TRUE FALSE =>', firstPlayerLine.includes(idSquare), '==', idSquare);
		while (firstPlayerLine.includes(idSquare) || secondPlayerLine.includes(idSquare)) {
			idSquare = getRandInt(0, 8);
		}
		// idSquare =  ? getRandInt(0, 8) : idSquare;
		// setSecondPlayerLine([...secondPlayerLine, idSquare]);
		setTimeout(() => {
			// secondPlayerTurn();
			firstPlayerLine.length !== 0 && setSecondPlayerLine([...secondPlayerLine, idSquare]);
		}, 1000);
		console.log('SECOND PLAYER TURN ID => ', idSquare);
	};

	const changeGameMode = (value) => {
		setGameMode(value);
		resetGamePlay();
		console.log('GAME MODE =>', gameMode, value);
	};

	const resetGamePlay = (type = '') => {
		if (type === 'full') {
			setScore({ p1: 0, p2: 0 });
		}
		setFirstPlayerLine([]);
		setSecondPlayerLine([]);
		setWinner(undefined);
	};

	return (
		<>
			<div className='board'>
				<div className='board-info-section'>
					<h1 className='game-title'>Ticatoee</h1>
					<div className='flex-justify-between'>
						<button className='btn-reset' onClick={() => resetGamePlay('full')}>
							Reset
						</button>
						<select
							name=''
							id=''
							className='mode-game-selection'
							onChange={(e) => changeGameMode(e.target.value)}
						>
							{['Computer', 'PvP'].map((item, id) => {
								return (
									<option id={id} key={id} value={`${item.toLowerCase()}`}>
										{item}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className='board-winner-info-section'>
					<div className='first-player-info'>
						<h1>{gameMode === 'computer' ? 'You' : 'Player 1'}</h1>
						<h2>{score.p1}</h2>
					</div>
					<div className='second-player-info'>
						<h1>{gameMode === 'computer' ? 'Computer' : 'Player 2'}</h1>
						<h2>{score.p2}</h2>
					</div>
				</div>
				{/* <div className={winner === undefined ? '' : 'typewriter-wrapper'}>
					{winner !== 'DRAW' && (
							<h1 className={winner !== undefined ? '' : 'd-hide'}>The winner is</h1>
						)}
				</div> */}

				<div className='board-square-section'>
					{secondPlayerLine.length === 3 && (
						<div className='blocker'>
							<div className={winner === undefined ? '' : 'typewriter-wrapper'}>
								<h1 className={winner !== undefined ? '' : 'd-hide'}>
									{winner === 'DRAW' ? 'DRAW' : `${winner} Win`}
								</h1>
							</div>
						</div>
					)}
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

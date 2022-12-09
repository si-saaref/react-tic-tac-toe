import { useEffect } from 'react';

export default function Square({ onClick, oActive, xActive }) {
	useEffect(() => {
		console.log('ACTIVE CLASS =>', oActive);
	}, []);

	return (
		<div className='square' onClick={onClick}>
			{oActive && <p>O</p>}
			{xActive && <p>X</p>}
		</div>
	);
}

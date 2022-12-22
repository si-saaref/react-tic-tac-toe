import { useEffect } from 'react';

export default function Square({ onClick, oActive, xActive }) {
	useEffect(() => {
		console.log('ACTIVE CLASS =>', oActive);
	}, []);

	return (
		<div className='square' onClick={onClick}>
			{oActive && <span className='oActive'>O</span>}
			{xActive && <span className='xActive'>X</span>}
		</div>
	);
}

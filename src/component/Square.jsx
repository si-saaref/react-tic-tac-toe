import { useEffect } from 'react';

export default function Square({ onClick, oActive, xActive }) {
	useEffect(() => {
		console.log('ACTIVE CLASS =>', oActive);
	}, []);

	return (
		<div className='square' onClick={onClick}>
<<<<<<< HEAD
			{oActive && <span className='oActive'>O</span>}
			{xActive && <span className='xActive'>X</span>}
=======
			{oActive && <p>O</p>}
			{xActive && <p>X</p>}
>>>>>>> d187922 (feat: create logic to check winner and show player choices)
		</div>
	);
}

import Square from './Square';
import '../style/style.css';

export default function Board() {
	return (
		<>
			<div className='board'>
				{Array(9)
					.fill(null)
					.map((el, id) => {
						return <Square id={id + 1} key={id + 1} />;
					})}
			</div>
			{/* <Square /> */}
		</>
	);
}

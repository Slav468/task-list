import './CustomCloseBtn.scss';

function CustomCloseBtn({ onClick, open }) {
	return (
		<button
			type='button'
			className={`close-button ${open ? 'open' : ''}`}
			aria-label={open ? 'Collapse section' : 'Expand section'}
			aria-expanded={open}
			onClick={onClick}
		>
			+
		</button>
	);
}

export default CustomCloseBtn;

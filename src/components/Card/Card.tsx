import React from 'react';
import './Card.css';

const Card: React.SFC<React.ReactNode> = (props) => {
	return (
		<div className='card'>
			<div className='card-container'>{props.children}</div>
		</div>
	);
};

export default Card;

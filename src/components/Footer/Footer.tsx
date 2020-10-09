import React from 'react';
import './Footer.css';

const Footer: React.SFC = () => {
	return (
		<div className='footer'>
			<div className='secondary-footer'>
				<p className='main-text'>
					Outil de convertion de vos documents image vers pdf format.
				</p>
			</div>

			<div className='main-footer'>
				<p className='main-text'>
					<b>Document Converter {new Date().getFullYear()}</b>
				</p>
			</div>
		</div>
	);
};

export default Footer;

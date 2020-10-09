import React from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../store/user.store';
import Card from '../components/Card/Card';
import Uploader from '../components/Uploader/Uploader';
import Loader from '../components/Loader/Loader';

const Dashboard: React.SFC = observer(() => {
	const store = React.useContext(userStore);

	React.useEffect(() => {
		store.getUserFromAPI();
	}, [store]);

	const handleDowloadAttachement = (type: string): void => {
		store.download(store.attachementName, type);
	};

	return (
		<div className='dashboard'>
			<div className=''>
				<Card>
					<h3 className='main-title-sm'>
						<i className='fa fa-fw fa-info' />
						How to convert image to PDF and other documents ?
					</h3>
					<p className='main-text'>1.Upload your image or photo file.</p>
					<p className='main-text'>
						2.Choose a document format from the drop-down menu.
					</p>
					<p className='main-text'>
						3.With "Use OCR" in the optional settings, you can extract text from
						an image. If needed, you can set the language of the text as well
						(optional).
					</p>
					<p className='main-text'>
						4.After clicking on "Start", the conversion will begin.
					</p>
				</Card>

				<Uploader />

				<Card>
					<h4 className='main-title-sm'>
						<i className='fa fa-fw fa-cog' />
						Settings
					</h4>
					<form>
						<label htmlFor='file-extention' className='main-text'>
							Format
						</label>
						<select id='file-extention' className='input'>
							<option value='pdf'>pdf</option>
							<option value='txt'>txt</option>
							<option value='doc'>doc</option>
							<option value='docx'>docx</option>
						</select>

						<label htmlFor='ocr-lang' className='main-text'>
							Language
						</label>
						<select id='ocr-lang' className='input'>
							<option value='fr'>Frensh</option>
							<option value='eng'>English</option>
							<option value='ar'>Arabic</option>
							<option value='es'>Spanish</option>
						</select>

						<button type='submit' className='btn'>
							Start
						</button>
					</form>
				</Card>
			</div>

			<div className=''>
				<h2 className='main-title-sm'>Preview</h2>
				<Card>
					{store.isLoading === false ? (
						<>
							<p className='main-text'>{store.text}</p>
							<div className=''>
								<button
									type='button'
									className='btn'
									onClick={() => handleDowloadAttachement('pdf')}
								>
									Download PDF
								</button>

								<button
									type='button'
									className='btn'
									onClick={() => handleDowloadAttachement('txt')}
								>
									Download Txt
								</button>
							</div>
						</>
					) : (
						<Loader />
					)}
				</Card>
			</div>
		</div>
	);
});

export default Dashboard;

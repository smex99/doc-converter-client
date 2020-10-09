import React from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../../store/user.store';
import { useDropzone } from 'react-dropzone';
import './Uploader.css';

interface IProps {}

const Uploader: React.SFC<IProps> = observer((props) => {
	const store = React.useContext(userStore);

	const onDrop = React.useCallback(
		(acceptedFiles: any) => {
			store.isLoading = true;

			const formData = new FormData();
			formData.append('file', acceptedFiles[0], acceptedFiles[0].name);
			store.upload(formData);
		},
		[props]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: 'image/jpeg, image/png',
	});

	return (
		<>
			<div {...getRootProps()} className='upload-card'>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p className='main-title-sm'>
						<i className='fa fa-fw fa-upload' style={{ marginRight: '8px' }} />
						Drope your file ...
					</p>
				) : (
					<p className='main-title-sm'>
						<i className='fa fa-fw fa-upload' style={{ marginRight: '8px' }} />
						Drag your file here
					</p>
				)}
			</div>
		</>
	);
});

export default Uploader;

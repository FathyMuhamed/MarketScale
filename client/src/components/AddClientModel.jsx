import { useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';

function handleSubmit(e) {
	e.preventDefault();
	const { name, email, phone } = e.target.elements;
	console.log(name.value, email.value, phone.value);
	name.value = '';
	email.value = '';
	phone.value = '';

}
export default function AddClientModel() {
	return (
		<>
			<button
				type='button'
				className='btn btn-secondary'
				data-bs-toggle='modal'
				data-bs-target='#addClientModal'
			>
				<div className='d-flex align-items-center'>
					<FaUser className='icon' />
					<div>Add Client</div>
				</div>
			</button>

			<div
				className='modal fade'
				id='addClientModal'
				aria-labelledby='addClientModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='addClientModalLabel'>
								Add Client
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<form onSubmit={handleSubmit} >
								<div className='mb-3'>
									<label className='form-label'>Name</label>
									<input
										type='text'
										className='form-control'
										id='name'

									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Email</label>
									<input
										type='email'
										className='form-control'
										id='email'

									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Phone</label>
									<input
										type='text'
										className='form-control'
										id='phone'


									/>
								</div>

								<button
									type='submit'
									data-bs-dismiss='modal'
									className='btn btn-secondary'
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

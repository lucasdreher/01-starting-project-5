import React, { useState } from 'react';

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const SimpleInput = (props) => {
	const [ enteredName, setEnteredName ] = useState('');
	const [ enteredEmail, setEnteredEmail ] = useState('');
	const [ enteredNameIsTouched, setEnteredNameIsTouched ] = useState(false);
	const [ enteredEmailIsTouched, setEnteredEmailIsTouched ] = useState(false);

	const enteredNameIsValid = enteredName.trim() !== '';
	const enteredEmailIsValid = validateEmail(enteredEmail);
	const enteredEmailIsEmpty = enteredEmail.trim() === '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;
	const emailInputIsInvalid = (!enteredEmailIsValid || enteredEmailIsEmpty) && enteredEmailIsTouched;

	console.log('enteredEmailIsValid', enteredEmailIsValid);

	let formIsValid = false;

	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const emailInputChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const constNameInputBlurHandler = (event) => {
		setEnteredNameIsTouched(true);
	};

	const constEmailInputBlurHandler = (event) => {
		setEnteredEmailIsTouched(true);
	};

	const formSubmissionHandler = (event) => {
		// setEnteredName(event.target.value);
		event.preventDefault();
		setEnteredNameIsTouched(true);
		setEnteredEmailIsTouched(true);
		if (!formIsValid) {
			return;
		}
		console.log(enteredName, enteredEmail);
		setEnteredName('');
		setEnteredEmail('');
		setEnteredNameIsTouched(false);
		setEnteredEmailIsTouched(false);
	};

	const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';
	const emailInputClasses = !emailInputIsInvalid ? 'form-control' : 'form-control invalid';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameInputChangeHandler}
					onBlur={constNameInputBlurHandler}
					value={enteredName}
				/>
			</div>
			{nameInputIsInvalid && <p className="error-text">Name must not be empty!</p>}
			{/* TODO email input form validation */}
			<div className={emailInputClasses}>
				<label htmlFor="email">Your E-Mail</label>
				<input
					type="email"
					id="email"
					onChange={emailInputChangeHandler}
					onBlur={constEmailInputBlurHandler}
					value={enteredEmail}
				/>
			</div>
			{enteredEmailIsEmpty && enteredEmailIsTouched && <p className="error-text">Email must not be empty!</p>}
			{emailInputIsInvalid && !enteredEmailIsEmpty && <p className="error-text">Please enter a valid email.</p>}
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;

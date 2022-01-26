import React, { useState } from 'react';

const SimpleInput = (props) => {
	const [ enteredName, setEnteredName ] = useState('');
	const [ enteredNameIsTouched, setEnteredNameIsTouched ] = useState(false);

	const enteredNameIsValid = enteredName.trim() !== '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

	let formIsValid = false;

	if (enteredNameIsValid) {
		formIsValid = true;
	}

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const constNameInputBlurHandler = (event) => {
		setEnteredNameIsTouched(true);
	};

	const formSubmissionHandler = (event) => {
		// setEnteredName(event.target.value);
		event.preventDefault();
		setEnteredNameIsTouched(true);
		if (!enteredNameIsValid) {
			return;
		}
		console.log(enteredName);
		setEnteredName('');
		setEnteredNameIsTouched(false);
	};

	const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';

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
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;

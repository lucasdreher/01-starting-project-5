import React, { useRef, useState } from 'react';

const SimpleInput = (props) => {
	const nameInputRef = useRef();
	const [ enteredName, setEnteredName ] = useState('');
	const [ enteredNameIsValid, setEnteredNameIsValid ] = useState(false);
	const [ enteredNameIsTouched, setEnteredNameIsTouched ] = useState(false);

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
		if (enteredName.trim() !== '') {
			setEnteredNameIsValid(true);
		}
	};

	const constNameInputBlurHandler = (event) => {
		setEnteredNameIsTouched(true);

		if (enteredName.trim() === '') {
			setEnteredNameIsValid(false);
		}
	};

	const formSubmissionHandler = (event) => {
		// setEnteredName(event.target.value);
		event.preventDefault();
		setEnteredNameIsTouched(true);
		if (enteredName.trim() === '') {
			setEnteredNameIsValid(false);
			return;
		}

		setEnteredNameIsValid(true);
		console.log(enteredName);
		const enteredValue = nameInputRef.current.value;
		console.log(enteredValue);
		setEnteredName('');
	};

	const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

	const nameInputClasses = !nameInputIsInvalid ? 'form-control' : 'form-control invalid';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					ref={nameInputRef}
					type="text"
					id="name"
					onChange={nameInputChangeHandler}
					onBlur={constNameInputBlurHandler}
					value={enteredName}
				/>
			</div>
			{nameInputIsInvalid && <p className="error-text">Name must not be empty!</p>}
			<div className="form-actions">
				<button>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;

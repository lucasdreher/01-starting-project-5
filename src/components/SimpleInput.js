import useInput from '../hooks/useInput';

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const SimpleInput = (props) => {
	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput
	} = useInput((value) => value.trim() !== '');
	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput
	} = useInput((value) => validateEmail(value));

	let formIsValid = false;

	if (nameIsValid && emailIsValid) {
		formIsValid = true;
	}

	const formSubmissionHandler = (event) => {
		event.preventDefault();
		if (!formIsValid) {
			return;
		}
		console.log(enteredName, enteredEmail);
		resetNameInput();
		resetEmailInput();
	};

	const nameInputClasses = !nameInputHasError ? 'form-control' : 'form-control invalid';
	const emailInputClasses = !emailInputHasError ? 'form-control' : 'form-control invalid';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" onChange={nameChangeHandler} onBlur={nameBlurHandler} value={enteredName} />
			</div>
			{nameInputHasError && <p className="error-text">Name must not be empty!</p>}
			<div className={emailInputClasses}>
				<label htmlFor="email">Your E-Mail</label>
				<input type="email" id="email" onChange={emailChangeHandler} onBlur={emailBlurHandler} value={enteredEmail} />
			</div>
			{emailInputHasError && <p className="error-text">Please enter a valid email.</p>}
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;

import useInput from '../hooks/useInput';

const isNotEmpty = (value) => value.trim() !== '';
const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const BasicForm = (props) => {
	const {
		value: enteredFirstName,
		isValid: firstNameIsValid,
		hasError: firstNameInputHasError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: resetFirstNameInput
	} = useInput(isNotEmpty);
	const {
		value: enteredLastName,
		isValid: lastNameIsValid,
		hasError: lastNameInputHasError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: resetLastNameInput
	} = useInput(isNotEmpty);
	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput
	} = useInput(validateEmail);

	let formIsValid = false;

	if (firstNameIsValid && lastNameIsValid && emailIsValid) {
		formIsValid = true;
	}

	const formSubmitHandler = (event) => {
		event.preventDefault();
		if (!formIsValid) {
			return;
		}
		console.log(enteredFirstName, enteredLastName, enteredEmail);
		resetFirstNameInput();
		resetLastNameInput();
		resetEmailInput();
	};

	const firstNameClasses = firstNameInputHasError ? 'form-control invalid' : 'form-control';
	const lastNameClasses = lastNameInputHasError ? 'form-control invalid' : 'form-control';
	const emailClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

	return (
		<form onSubmit={formSubmitHandler}>
			<div className="control-group">
				<div className={firstNameClasses}>
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
						value={enteredFirstName}
						onChange={firstNameChangeHandler}
						onBlur={firstNameBlurHandler}
					/>
					{firstNameInputHasError && <p className="error-text">First name should not be empty.</p>}
				</div>

				<div className={lastNameClasses}>
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						value={enteredLastName}
						onChange={lastNameChangeHandler}
						onBlur={lastNameBlurHandler}
					/>
					{lastNameInputHasError && <p className="error-text">Last name should not be empty.</p>}
				</div>
			</div>
			<div className={emailClasses}>
				<label htmlFor="email">E-Mail Address</label>
				<input type="email" id="email" value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
				{emailInputHasError && <p className="error-text">Please enter a valid email.</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;

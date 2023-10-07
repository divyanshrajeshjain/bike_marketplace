import React from 'react';
import Loader from '../components/Loader';
import AuthForm, { IAuthFormSubmitCallback } from '../components/AuthForm';
import { post } from '../components/backendInterface';

function SignIn() {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [successText, setSuccessText] = React.useState<string | undefined>(undefined);
    const [errorText, setErrorText] = React.useState<string | undefined>(undefined);

    //For smooth transition to page
	React.useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 500)
	}, [])

    function submitCallback(callbackObject: IAuthFormSubmitCallback) {
        setSuccessText(undefined);
        setErrorText(undefined);
        let formData = new FormData();
        if (callbackObject.email != undefined) {
            formData.append("email", callbackObject.email);
        }
        if (callbackObject.password != undefined) {
            formData.append("password", callbackObject.password);
        }

        const requestResponse = post("/api/auth/", formData);
        requestResponse.then(() => {
            setSuccessText("Successfully logged in");

            //For smooth transition to home page
            setTimeout(() => {
                window.location.replace("/home/");
            }, 500)
        }).catch((error) => {
            if (error.response.status == 400) {
                setErrorText(error.response.data.error);
            }
        })
    }

	return (
		<>
            <Loader isLoaded={isLoaded} />

            <AuthForm isEmail isPassword submitBtnText="Sign In" alternateText="Don't have an account?"
                alternateActionText="Sign Up" alternateActionHref="/signup/" submitCallback={submitCallback}
                successAlertText={successText} warningAlertText={errorText} />
		</>
	);
}

export default SignIn;
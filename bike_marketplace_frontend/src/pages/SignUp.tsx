import React from 'react';

import Loader from '../components/Loader';
import AuthForm, { IAuthFormSubmitCallback } from '../components/AuthForm';
import { post } from '../components/backendInterface';

function SignUp() {
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
        formData.append("is_signup", "true");
        if (callbackObject.name != undefined) {
            formData.append("name", callbackObject.name);
        }
        if (callbackObject.email != undefined) {
            formData.append("email", callbackObject.email);
        }
        if (callbackObject.password != undefined) {
            formData.append("password", callbackObject.password);
        }

        const requestResponse = post("/api/auth/", formData);
        requestResponse.then(() => {
            setSuccessText("Account created successfully. Please sign in");
        }).catch((error) => {
            if (error.response.status == 400) {
                setErrorText(error.response.data.error);
            }
        })
    }

    return (
        <>
            <Loader isLoaded={isLoaded} />

            <AuthForm isName isEmail isPassword submitBtnText="Sign Up" alternateText="Have an account?"
                alternateActionText="Sign In" alternateActionHref="/signin/" submitCallback={submitCallback}
                successAlertText={successText} warningAlertText={errorText} />
            <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Alerts</h4>
                                <div className="card-content">
                                    <div className="alert alert-primary">This is a primary alert—check it out!</div>
                                    <div className="alert alert-secondary">This is a secondary alert—check it out!</div>
                                    <div className="alert alert-success">This is a success alert—check it out!</div>
                                    <div className="alert alert-danger">This is a danger alert—check it out!</div>
                                    <div className="alert alert-warning">This is a warning alert—check it out!</div>
                                    <div className="alert alert-info">This is a info alert—check it out!</div>
                                    <div className="alert alert-light">This is a light alert—check it out!</div>
                                    <div className="alert alert-dark">This is a dark alert—check it out!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Link color</h4>
                                <div className="card-content">
                                    <div className="alert alert-primary">This is a primary alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.</div>
                                    <div className="alert alert-secondary">This is a secondary alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.</div>
                                    <div className="alert alert-success">This is a success alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.</div>
                                    <div className="alert alert-danger">This is a danger alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.</div>
                                    <div className="alert alert-warning">This is a warning alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.</div>
                                    <div className="alert alert-info">This is a info alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.</div>
                                    <div className="alert alert-light">This is a light alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.</div>
                                    <div className="alert alert-dark">This is a dark alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Additional content</h4>
                                <div className="card-content">
                                    <div className="alert alert-success">
                                        <h4 className="alert-heading">Well done!</h4>
                                        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                                        <hr />
                                        <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Dismissing</h4>
                                <div className="card-content">
                                    <div className="alert alert-primary alert-dismissible fade show">
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>
                                        </button> <strong>Holy guacamole!</strong> You should check in on some of those fields below.</div>
                                    <div className="alert alert-danger alert-dismissible fade show">
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>
                                        </button> <strong>Holy guacamole!</strong> You should check in on some of those fields below.</div>
                                    <div className="alert alert-warning alert-dismissible fade show">
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>
                                        </button> <strong>Holy guacamole!</strong> You should check in on some of those fields below.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            </div>
        </>
    );
}

export default SignUp;
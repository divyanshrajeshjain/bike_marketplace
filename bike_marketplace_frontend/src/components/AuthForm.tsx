import React from "react";

interface IAuthForm {
    isName?: boolean,
    isEmail?: boolean,
    isPassword?: boolean,
    submitBtnText: string,
    alternateText: string,
    alternateActionHref: string,
    alternateActionText: string,
    submitCallback: (callbackObject: IAuthFormSubmitCallback) => void,
    successAlertText?: string,
    warningAlertText?: string
}

export interface IAuthFormSubmitCallback {
    name?: string,
    email?: string,
    password?: string
}

function AuthForm(props: IAuthForm) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let callbackObject: IAuthFormSubmitCallback = {};
        if (props.isName != undefined && props.isName) {
            callbackObject.name = name;
        }
        if (props.isEmail != undefined && props.isEmail) {
            callbackObject.email = email;
        }
        if (props.isPassword != undefined && props.isPassword) {
            callbackObject.password = password;
        }
        props.submitCallback(callbackObject);
    }

	return (
		<>
			<div className="login-form-bg h-100">
                {(() => {
                    if (props.successAlertText != undefined) {
                        return (
                            <div className="alert alert-primary">{props.successAlertText}</div>
                        )
                    }
                })()}
                {(() => {
                    if (props.warningAlertText != undefined) {
                        return (
                            <div className="alert alert-warning">{props.warningAlertText}</div>
                        )
                    }
                })()}
                <div className="container h-100">
                    <div className="row justify-content-center h-100">
                        <div className="col-xl-6">
                            <div className="form-input-content">
                                <div className="card login-form mb-0">
                                    <div className="card-body pt-5">
                                        <a className="text-center" href="/"> <h4>Aggie Bikes</h4></a>
                                        <form className="mt-5 mb-5 login-input" onSubmit={onSubmit}>
                                            {(() => {
                                                if (props.isName != undefined && props.isName) {
                                                    return (
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Name" 
                                                                required value={name} onChange={(e) => setName(e.target.value)} />
                                                        </div>
                                                    )
                                                }
                                            })()}
                                            {(() => {
                                                if (props.isEmail != undefined && props.isEmail) {
                                                    return (
                                                        <div className="form-group">
                                                            <input type="email" className="form-control" placeholder="Email" 
                                                                required value={email} onChange={(e) => setEmail(e.target.value)} />
                                                        </div>
                                                    )
                                                }
                                            })()}
                                            {(() => {
                                                if (props.isPassword != undefined && props.isPassword) {
                                                    return (
                                                        <div className="form-group">
                                                            <input type="password" className="form-control" placeholder="Password" 
                                                                required value={password} onChange={(e) => setPassword(e.target.value)} />
                                                        </div>
                                                    )
                                                }
                                            })()}
                                            <button className="btn login-form__btn submit w-100">{props.submitBtnText}</button>
                                        </form>
                                        <p className="mt-5 login-form__footer">{props.alternateText} <a href={props.alternateActionHref} className="text-primary">{props.alternateActionText} </a> now</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
		</>
	);
}

export default AuthForm;
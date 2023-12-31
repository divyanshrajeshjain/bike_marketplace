import React from 'react';

interface ILoader {
    isLoaded: boolean
}

function Loader(props: ILoader) {
    return (
        <div id="preloader" style={{ display: props.isLoaded ? 'none' : 'block' }}>
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10" />
                </svg>
            </div>
        </div>
    )
}

export default Loader;
import React from 'react';

function Alert({alert}) {
    return (
        <div>
            {alert && <div className={`alert alert-${alert.colour}`} role="alert">
                {alert.msg}
            </div>}
        </div>
    )
}

export default Alert;

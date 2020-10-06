import React from 'react';
import Alert from './Alert';

const App = () => {
    return (
        <div className="container mt-5">
            <Alert text="Eduardo"/>
            <Alert text="Nélio"/>
            <Alert />
            <Alert />
        </div>
    );
}

export default App;
import { receiveData, submitData } from '../../connection/connectionMethods';
import { useState } from 'react';

const HomePage = () => {
    const [message, setMessage] = useState('');
    const handleGetData = () => {
        receiveData((data) => {
            // Displaying the received data
            setMessage(`Received Data: ${JSON.stringify(data)}`);
        });
    };

    const handlePushData = () => {
        submitData();
        // Displaying a message after pushing data
        // You might want to update this based on the actual response from submitData
        setMessage('Data pushed successfully');
    };

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={handleGetData}>Get Data</button>
            <button onClick={handlePushData}>Push Data</button>
            <p>{message}</p>
        </div>
    );
};

export default HomePage;
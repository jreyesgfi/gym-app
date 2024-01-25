import axios from 'axios';
import { connectionUrl, connectionData } from "./connectionConfig";

// ----------------------------------------------------------------
export const submitData = (): void => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { ID, token } = params; // Assuming 'ID' is the query parameter name

    const postData = {
        id: ID,
        token: token,
        method: "addData" // Assuming 'addData' is your method identifier
    };

    axios.post(connectionUrl, postData, connectionData)
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

//----------------------------------------------------------------
export const receiveData = (callback: (data: any) => void): void => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { ID, token } = params; // Assuming 'ID' is the query parameter name

    const getData = {
        id: ID,
        token: token,
        method: "getData" // Assuming 'getData' is your method identifier
    };

    axios.post(connectionUrl, getData, connectionData)
        .then(response => {
            // You may want to process the data before passing to the callback
            const { muscles, who } = JSON.parse(response.data);
            console.log("Muscles:", muscles); // Process the muscles array
            console.log("Who:", who); // Process the who array
            callback({ muscles, who });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

import { connectionUrl, connectionData } from "./connectionConfig";
import axios from 'axios';

// ----------------------------------------------------------------
export const submitData = (): void => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { ID, token } = params; // Assuming 'ID' is the query parameter name

    const data = {
        ID: ID,
        token: token,
        Method: "addData" // Assuming 'addData' is your method identifier
    }

    axios.post(connectionUrl, data, connectionData)
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

//----------------------------------------------------------------
export const receiveData = (callback: (data: string) => void): void => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { ID, token } = params; // Assuming 'ID' is the query parameter name

    const data = {
        ID: ID,
        token: token,
        Method: "getData" // Assuming 'getData' is your method identifier
    }

    axios.post(connectionUrl, data, connectionData)
        .then((response) => {
            callback(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

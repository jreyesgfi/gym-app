import axios from 'axios';
import { connectionUrl, connectionData } from "./connectionConfig";
import { LogCallbackType } from '../types/callbacks';
import { MuscleNameType, TrainLogItf } from '../types/dataTypes';
import {currentCredentials} from './credentials'

// ----------------------------------------------------------------
export const submitData = (newLogs: TrainLogItf[],selectedMuscle:MuscleNameType): void => {
    const { ID, token } = currentCredentials();
    const postData = {
        id: ID,
        token: token,
        method: "addData",
        logs: JSON.stringify(newLogs), // Stringify the newLogs array
        muscle: selectedMuscle
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
    
    const { ID, token } = currentCredentials();
    const getData = {
        id: ID,
        token: token,
        method: "getData" // Assuming 'getData' is your method identifier
    };

    axios.post(connectionUrl, getData, connectionData)
        .then(response => {
            // You may want to process the data before passing to the callback
            console.log('Response:', response.data);
            const { muscles, who } = response.data;
            console.log("Muscles:", muscles); // Process the muscles array
            console.log("Who:", who); // Process the who array
            callback({ muscles, who });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};
//----------------------------------------------------------------
export const getLatestLogs = (selectedMuscle:MuscleNameType, callback: LogCallbackType): void => {
    const { ID, token } = currentCredentials();
    const latestLogsData = {
        id: ID, // You will need to get the ID as done before
        token: token, // You will need to get the token as done before
        method: "getLatestLogs",
        muscle: selectedMuscle
    };

    axios.post(connectionUrl, latestLogsData, connectionData)
        .then(response => {
            console.log('Latest logs:', response.data);
            callback(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

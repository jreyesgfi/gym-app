import React, { useState } from 'react';
import { getLatestLogs, receiveData, submitData } from '../../connection/connectionMethods';
import { ExerciseType, MuscleNameType, TrainLogItf } from '../../types/dataTypes';
import styled from 'styled-components';

const HomePage = () => {
    const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:hover {
    background-color: #f1f1f1;
  }
`;
    const [who, setWho] = useState<string[]>([]);
    const [muscles, setMuscles] = useState<MuscleNameType[]>([]);
    const [selectedMuscle, setSelectedMuscle] = useState<MuscleNameType>('');
    const [exercises, setExercises] = useState<ExerciseType[]>([]);
    // Store the exercises data retrieved from getMasterData
    const exercisesDataRef = React.useRef<{ [key: MuscleNameType]: ExerciseType[] }>({});

    // Function to call when the "Get Data" button is clicked
    const handleGetData = () => {
        receiveData((data) => {
            // Assuming data is in the format { muscles: MuscleItf[], who: string[] }
            setWho(data.who);
            setMuscles(Object.keys(data.muscles));
            exercisesDataRef.current = data.muscles;
        });
    };

    // Function to call when a muscle is selected
    const handleMuscleChange = (selectedMuscle: MuscleNameType) => {
        setSelectedMuscle(selectedMuscle);
        const availableExercises = exercisesDataRef.current[selectedMuscle] || [];
        setExercises(availableExercises);
    };

    const [latestLogs, setLatestLogs] = useState<TrainLogItf[]>([]);

    // Function to call when the "Continue" button is clicked
    const handleContinue = () => {
        if (selectedMuscle) {
            getLatestLogs(selectedMuscle, (data) => {
                const logs = data.map(log => ({ ...log, date: new Date(log.date) }));
                setLatestLogs(logs);
            });
        } else {
            alert("Please select a muscle first.");
        }
    };

    return (
        <div>
            {/* Other UI elements */}
            <button onClick={handleGetData}>Get Data</button>

            {/* Select for muscles */}
            <select onChange={(e) => handleMuscleChange(e.target.value)} value={selectedMuscle}>
                <option value="">Select Muscle</option>
                {muscles.map(muscle => (
                    <option key={muscle} value={muscle}>{muscle}</option>
                ))}
            </select>

            {/* Select for exercises */}
            <select>
                <option value="">Select Exercise</option>
                {exercises.map(exercise => (
                    <option key={exercise} value={exercise}>{exercise}</option>
                ))}
            </select>
            <button onClick={handleContinue}>Continue</button>
            <StyledTable>
            <thead>
                    <tr>
                        <th>Who</th>
                        <th>Date</th>
                        <th>Exercise</th>
                        <th>Max Weight</th>
                        <th>Min Weight</th>
                        <th>Max Reps</th>
                        <th>Min Reps</th>
                    </tr>
                </thead>
                <tbody>
                    {latestLogs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.who}</td>
                            <td>{log.date.toDateString()}</td>
                            <td>{log.exercise}</td>
                            <td>{log.maxWeight}</td>
                            <td>{log.minWeight}</td>
                            <td>{log.maxRep}</td>
                            <td>{log.minRep}</td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </div>
    );
};

export default HomePage;
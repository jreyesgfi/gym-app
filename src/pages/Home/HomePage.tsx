import React, { useEffect, useState } from 'react';
import { getLatestLogs, receiveData, submitData } from '../../connection/connectionMethods';
import { ExerciseType, MuscleNameType, TrainLogItf } from '../../types/dataTypes';
import styled from 'styled-components';


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
type HighlightedRowProps = {
    highlightColor: string;
};
const HighlightedRow = styled.tr<HighlightedRowProps>`
    background-color: ${props => props.highlightColor || 'white'};
`;
type TableCellProps = {
    value: any;
};
const TableCell = styled.td<TableCellProps>`
    background-color: ${props => props.value ? 'lightgreen' : 'lightcoral'};
    &:hover, &:focus {
        background-color: white;
        border: 1px solid black;
    }
`;

const NumericInput = styled.input`
  width: 100%;
  border: none;
  background-color: inherit;
`;
type FadeInSectionProps = {
    isVisible: boolean;
};
const FadeInSection = styled.section<FadeInSectionProps>`
transition: opacity 1s ease-out;
opacity: ${props => props.isVisible ? 1 : 0};
height: ${props => props.isVisible ? 'auto' : '0'};
overflow: hidden;
`;
const HomePage = () => {

    const [who, setWho] = useState<string[]>([]);
    const [muscles, setMuscles] = useState<MuscleNameType[]>([]);
    const [selectedMuscle, setSelectedMuscle] = useState<MuscleNameType>('');
    const [exercises, setExercises] = useState<ExerciseType[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseType>('');

    const [workoutStarted, setWorkoutStarted] = useState(false);
    const [latestLogs, setLatestLogs] = useState<TrainLogItf[]>([]);
    const [newLogs, setNewLogs] = useState<TrainLogItf[]>([]);

    const addNewLog = (isDifferentExercise = false) => {
        const newLog: TrainLogItf = {
            muscle: selectedMuscle,
            who: '', // Initial value for 'who' selector
            date: new Date(), // Current date in YYYY-MM-DD format
            exercise: isDifferentExercise ? '' : selectedExercise, // Empty if different exercise
            maxWeight: 0,
            minWeight: 0,
            maxRep: 0,
            minRep: 0,
        };
        setNewLogs([...newLogs, newLog]);
    }
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
    useEffect(() => {
        handleGetData(); // Call getData when the component mounts
    }, []);

    // Function to call when a muscle is selected
    const handleMuscleChange = (selectedMuscle: MuscleNameType) => {
        setSelectedMuscle(selectedMuscle);
        const availableExercises = exercisesDataRef.current[selectedMuscle] || [];
        setExercises(availableExercises);
        handleContinue(selectedMuscle);
    };
    const handleAddOtherPerson = () => {
        addNewLog();
        // Add logic for submitData if needed
    }

    const handleAddNewExercise = () => {
        addNewLog(true); // True indicates a different exercise
    }

    const handleExerciseChange = (selectedExercise: ExerciseType) => {
        setSelectedExercise(selectedExercise);
        // Prepare a new log entry
        addNewLog(true);
    }

    // Function to call when the "Continue" button is clicked
    const handleContinue = (selectedMuscle: MuscleNameType) => {
        getLatestLogs(selectedMuscle, (data) => {
            const logs = data.map(log => ({ ...log, date: new Date(log.date) }));
            setLatestLogs(logs);
        });

    };

    const handleStartWorkout = () => {
        setWorkoutStarted(true);
    };

    const handleChangeLog = (index: number, field: keyof TrainLogItf, e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const updatedLogs = [...newLogs];
    
        // Using a type assertion to bypass TypeScript's strict type checking
        (updatedLogs[index] as any)[field] = e.target.value;
        
        setNewLogs(updatedLogs);
    };

    return (
        <div>
            {/* Other UI elements */}
            <button onClick={handleGetData}>Get Data</button>

            {/* Start Workout button */}
            {!workoutStarted && (
                <button onClick={handleStartWorkout}>Start Workout</button>
            )}

            {/* Muscle selector */}
            <FadeInSection isVisible={workoutStarted}>
                <select onChange={(e) => handleMuscleChange(e.target.value)} value={selectedMuscle}>
                    <option value="">Select Muscle</option>
                    {muscles.map(muscle => (
                        <option key={muscle} value={muscle}>{muscle}</option>
                    ))}
                </select>
            </FadeInSection>

            {/* Latest Logs Table */}
            <FadeInSection isVisible={!!selectedMuscle}>
                <select onChange={(e) => handleExerciseChange(e.target.value)} value={selectedExercise}>
                    <option value="">Select Exercise</option>
                    {exercises.map(exercise => (
                        <option key={exercise} value={exercise}>{exercise}</option>
                    ))}
                </select>
                {/* Add Other Person button */}
                <button onClick={handleAddOtherPerson}>New Person</button>

                {/* New Exercise button */}
                <button onClick={handleAddNewExercise}>New Exercise</button>
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

                        {newLogs.map((log, index) => (
                            <HighlightedRow key={index} highlightColor="lightgreen">
                                <TableCell value={log?.who}>
                                    {/* Who selector */}
                                    <select
                                        value={log.who}
                                        onChange={e => {handleChangeLog(index, 'who', e)}}>
                                        <option value=''>{log.who ? log.who : 'Who?'}</option>
                                        {who.map(person => (
                                            <option key={person} value={person}>{person}</option>
                                        ))}
                                    </select>
                                </TableCell>
                                <TableCell value={log?.date}>{log?.date.toLocaleDateString()}</TableCell>
                                <TableCell value={log?.exercise}>{
                                    <select
                                        value={log.exercise}
                                        onChange={e => {
                                            handleChangeLog(index, 'exercise', e);
                                            setSelectedExercise( e.target.value );
                                            }}>
                                        <option value=''>Select Exercise</option>
                                        {exercises.map(exercise => (
                                            <option key={exercise} value={exercise}>{exercise}</option>
                                        ))}
                                    </select>}
                                </TableCell>
                                {/* Numeric inputs for the remaining columns */}
                                <TableCell value={log?.maxWeight}><NumericInput type="number" min={0} value={log?.maxWeight} onChange={e => {handleChangeLog(index, 'maxWeight', e)}} /></TableCell>
                                <TableCell value={log?.minWeight}><NumericInput type="number" min={0} value={log?.minWeight} onChange={e => {handleChangeLog(index, 'minWeight', e)}} /></TableCell>
                                <TableCell value={log?.maxRep}><NumericInput type="number" min={0} value={log?.maxRep} onChange={e => {handleChangeLog(index, 'maxRep', e)}}  /></TableCell>
                                <TableCell value={log?.minRep}><NumericInput type="number" min={0} value={log?.minRep} onChange={e => {handleChangeLog(index, 'minRep', e)}} /></TableCell>
                            </HighlightedRow>
                        ))}
                    </tbody>
                </StyledTable>
            </FadeInSection>
        </div>
    );
};

export default HomePage;
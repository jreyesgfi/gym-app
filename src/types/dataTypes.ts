export type ExerciseType = string;
export type MuscleNameType = string;
export interface MuscleItf {
    name : MuscleNameType,
    exercises: ExerciseType[],
}
type WeightType = number;
type RepsType = number;
export interface TrainLogItf {
    muscle: MuscleNameType,
    who: string,
    date: Date,
    exercise: ExerciseType,
    maxWeight: WeightType,
    minWeight: WeightType,
    maxRep: RepsType,
    minRep: RepsType,
    series?: [WeightType,RepsType][]
}
import { createContext, ReactNode, useState } from 'react';
import { ChangeLevelsDictType, LevelDictType } from '../../types';

//callbackFunction?: (...args: any[]) => void;
interface Props {
    children?: (ReactNode[] | ReactNode);
    callbackFunction?: () => void;
    changeCurrentLevel?: (next:boolean) => void;
    levelName: string;                                                  // this level identifier
    parentLevels?: LevelDictType;                     // recovers the whole picture of the parents levels
    changeParentLevels?: ChangeLevelsDictType;    // brings one update function for each level
}
export const LevelContext = createContext<any>({});
export const ProcessWizard: React.FC<Props> =
    ({ children:children, levelName, changeParentLevels, parentLevels, changeCurrentLevel, callbackFunction}) => {
        const [currentLevelNum, setCurrentLevelNum] = useState<number>(0);
  
        
        // propose an alternative in case changeCurrentLevel is not set
        changeCurrentLevel = changeCurrentLevel!==undefined?changeCurrentLevel:
        (next:boolean) => {
            setCurrentLevelNum(currentLevelNum + (next===false?-1:1));
            callbackFunction?.();
        };

        const changeLevels: {[level:number]:((next:boolean)=>void)} = {
            ...changeParentLevels,
            [levelName]: (next:boolean) =>changeCurrentLevel?.(next),
        };
        // const changeLevel = (selectedLevel: keyof typeof changeLevels, next: boolean) => {// reducer function           
        //     changeLevels[selectedLevel](next);
        // }
        const levels = {
            ...parentLevels,
            [levelName]: currentLevelNum
        }
        const levelContext = {
            levels: levels,
            changeLevels: changeLevels
        }

        return (
            <LevelContext.Provider value={levelContext}>
                {children||null}
            </LevelContext.Provider>
        )
    }

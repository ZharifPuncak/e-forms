import React, { createContext, useContext, useReducer  } from "react";
import useLocalStorage from "@/hooks/use-local-storage";

let jobStorage = localStorage.getItem('job') ? JSON.parse(localStorage.getItem('job')) : '';

const JobContext = createContext(); 

const initialState = {...jobStorage};

const reducer = (state, action) => {

    switch (action.type) {

      case 'SET_JOB':
       return {
          ...state,
          ...action.payload
        };

      case 'REMOVE_JOB':
        return {};

      default:
        return state;
    }
  };

  
export const  JobProvider = ({ children }) => {

  
    const [state, dispatch] = useReducer(reducer, initialState);
    const { data: job, storeData: setJob } = useLocalStorage("job", state);

    const draftJob = (jobState) => {
      
        dispatch({
            type: 'SET_JOB',
            payload: jobState,
        });

        setJob({  // Store only the updated part of the state
          ...job, // Keep other existing properties
          ...jobState, // Update the info property
      });

    };


    const removeJob = () => {
      
      dispatch({
          type: 'REMOVE_JOB',
      });

      setJob({});
  };

   

    
      
 
  return <JobContext.Provider value={{ state, draftJob,removeJob }}>
              {children}
    </JobContext.Provider>
};

export default JobContext;
  

export function useJobContext(){
    return useContext(JobContext);
}





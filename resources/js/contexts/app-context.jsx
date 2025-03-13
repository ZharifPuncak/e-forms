import React, { createContext, useState, useContext, useReducer  } from "react";

const AppContext = createContext(); 

const initialState = {

    parentDialog: {
      isCloseable : false,
      isDisabled : false,
      maxWidth : 'md',
      confirmText : 'PROCEED',
      isOpen: false,
      title : 'Are you sure ?',
      content : '',
      description : '',
      cancel : '',
      isAction : true,
      action : () => {  },
    },

    dialog: {
      isDisabled : false,
      maxWidth : 'xs',
      confirmText : 'PROCEED',
      isOpen: false,
      title : 'Are you sure ?',
      content : '',
      description : '',
      cancel : '',
      isAction : true,
      action : () => {  },
    },
   
    
    drawer: {
      isOpen: false,
      position : 'right',
      data : null
    },
  };

const reducer = (state, action) => {

    switch (action.type) {
      case 'SET_DRAWER':
        return {
          ...state,
          drawer: {
            ...state.drawer,
            ...action.payload,
          },
        };

        case 'SET_DIALOG':
          return {
            ...state,
            dialog: {
              ...state.dialog,
              ...action.payload,
            },
          };
    


         case 'SET_PARENT_DIALOG':
          return {
            ...state,
            parentDialog: {
              ...state.parentDialog,
              ...action.payload,
            },
          };
         default:

        return state;
    }
  };

  
export const  AppProvider = ({ children }) => {


    const [state, dispatch] = useReducer(reducer, initialState);
     const [needUpdate, setNeedUpdate] = useState(false);

    const setDrawer = (drawerState) => {
        dispatch({
            type: 'SET_DRAWER',
            payload: drawerState,
        });
    };


    const setDialog = (dialogState) => {
      dispatch({
          type: 'SET_DIALOG',
          payload: dialogState,
      });
  };


  const setParentDialog = (dialogState) => {
      dispatch({
          type: 'SET_PARENT_DIALOG',
          payload: dialogState,
      });
 };
  
    
      
 
  return <AppContext.Provider 
          value={{ needUpdate, setNeedUpdate ,state, setDrawer, setDialog, setParentDialog}}>
          {children}
    </AppContext.Provider>;
};

export default AppContext;
  

export function useAppContext(){
    return useContext(AppContext);
}





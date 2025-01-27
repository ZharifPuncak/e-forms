import React, { createContext, useState, useContext, useReducer  } from "react";

const AppContext = createContext(); 

const initialState = {

    dialog: {
      isDisabled : false,
      maxWidth : 'xs',
      confirmText : 'Proceed',
      isOpen: false,
      title : 'Are you sure ?',
      content : '',
      description : '',
      cancel : '',
      action : () => {  },
    },
    
    drawer: {
      isOpen: false,
      position : 'right',
      data : null
    },
    modal:{
      title:'',
      isOpen : false,
      component : '',
    }
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

        case 'SET_MODAL':
            return {
              ...state,
              modal: {
                ...state.modal,
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
         default:

        return state;
    }
  };

  
export const  AppProvider = ({ children }) => {


    const [state, dispatch] = useReducer(reducer, initialState);

     // //Data update
     const [needUpdate, setNeedUpdate] = useState(false);

    const setDrawer = (drawerState) => {
        dispatch({
            type: 'SET_DRAWER',
            payload: drawerState,
        });
    };


    const setModal = (modalState) => {
        dispatch({
            type: 'SET_MODAL',
            payload: modalState,
        });
    };

    const setDialog = (dialogState) => {
      dispatch({
          type: 'SET_DIALOG',
          payload: dialogState,
      });
  };
  
    
      
 
  return <AppContext.Provider value={{ needUpdate, setNeedUpdate ,state, setModal, setDrawer, setDialog}}>
    {children}
    </AppContext.Provider>;
};

export default AppContext;
  

export function useAppContext(){
    return useContext(AppContext);
}





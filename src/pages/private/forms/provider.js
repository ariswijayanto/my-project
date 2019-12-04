import React,{useContext, useState} from 'react';



const FormContext = React.createContext();

export function useForm() {

    return useContext(FormContext);
}


function FormProvider(props) {


    return <FormContext.Provider
    value={{
        
    }}
    >{props.children}</FormContext.Provider>

}



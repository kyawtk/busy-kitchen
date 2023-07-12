
import { createContext, useState } from "react";

export const SearchContext  = createContext()



export const SearchContextProvider = ({children})=>{
    const [data, setData] = useState('')


    return (<SearchContext.Provider value={{data, setData}}>
        {children}
    </SearchContext.Provider>)
}
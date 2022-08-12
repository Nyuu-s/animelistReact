import { appendInfiniteContent } from "@syncfusion/ej2-react-grids";
import React, { createContext, useContext, useState} from "react";

const StateContext = createContext();

const initialState = {
    userProfile: false,
    notification: false

}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState)
    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor, setCurrentColor] = useState( () => (localStorage.getItem('themeColor') ? localStorage.getItem('themeColor') : '#03C9D7' ));
    const [currentMode, setCurrentMode] = useState(() => (localStorage.getItem('themeMode') ? localStorage.getItem('themeMode') : 'Light'));
    const [themeSettings, setThemeSettings] = useState(false);
    const [AnimesData, setAnimesData] = useState({})


    const setMode = (e) => {
        setCurrentMode(e.target.value)
        localStorage.setItem('themeMode', e.target.value)
      
    }

    const setColor = (color) => {
        setCurrentColor(color)
        localStorage.setItem('themeColor', color)
      
    }



    const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true})

    return (
        <StateContext.Provider
        value={{
            activeMenu,
            setActiveMenu,
            isClicked,
            setIsClicked,
            handleClick,
            screenSize,
            setScreenSize,
            currentMode,
            currentColor,
            themeSettings, setThemeSettings,
            setMode, setColor,
            AnimesData, setAnimesData
            
        }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
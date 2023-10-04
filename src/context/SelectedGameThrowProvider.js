import { createContext, useState } from "react";

const SelectedGameThrowContext = createContext({});

export const SelectedGameThrowProvider = ({ children }) => {
    const [info, setInfo] = useState({});

    return (
        <SelectedGameThrowContext.Provider value={{ info, setInfo }}>
            {children}
        </SelectedGameThrowContext.Provider>
    );
}

export default SelectedGameThrowContext;
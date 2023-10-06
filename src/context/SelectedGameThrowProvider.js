import { createContext, useState } from "react";

const SelectedGameThrowContext = createContext({});

export const SelectedGameThrowProvider = ({ children }) => {
    const [selectedGameThrow, setSelectedGameThrow] = useState({});

    return (
        <SelectedGameThrowContext.Provider value={{ selectedGameThrow, setSelectedGameThrow }}>
            {children}
        </SelectedGameThrowContext.Provider>
    );
}

export default SelectedGameThrowContext;
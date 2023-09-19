import { createContext, useState } from "react";

const WatlGameFilterContext = createContext({});

export const WatlGameFilterProvider = ({ children }) => {
    const [filter, setFilter] = useState({});

    return (
        <WatlGameFilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </WatlGameFilterContext.Provider>
    );
}

export default WatlGameFilterContext;
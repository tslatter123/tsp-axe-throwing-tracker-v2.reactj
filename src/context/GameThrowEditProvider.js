import { createContext, useState } from "react";

const GameThrowEditContext = createContext({});

export const GameThrowEditProvider = (children) => {
    const [info, setInfo] = useState({});

    return (
        <GameThrowEditContext.Provider value={{ info, setInfo }}>
            {children}
        </GameThrowEditContext.Provider>
    );
}

export default GameThrowEditContext;
import { useContext } from "react";
import GameThrowEditContext from "../context/GameThrowEditProvider";

const useGameThrowEditInfo = () => {
    return useContext(GameThrowEditContext);
}

export default useGameThrowEditInfo;
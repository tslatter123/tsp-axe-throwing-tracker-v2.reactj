import { useContext } from "react";
import SelectedGameThrowContext from "../context/SelectedGameThrowProvider";

const useSelectedGameThrow = () => {
    return useContext(SelectedGameThrowContext);
}

export default useSelectedGameThrow;
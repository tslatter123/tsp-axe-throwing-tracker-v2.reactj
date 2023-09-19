import { useContext } from "react"
import WatlGameFilterContext from '../context/WatlGameFilterProvider';

const useWatlGameFilter = () => {
    return useContext(WatlGameFilterContext);
}

export default useWatlGameFilter;
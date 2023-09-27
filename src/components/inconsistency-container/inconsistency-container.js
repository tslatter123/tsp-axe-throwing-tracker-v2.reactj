import './inconsistency-container.css';
import Inconsistency from "../inconsistencies/inconsistency";

const InconsistencyContainer = (props) => {
    return (
        <div className="game-inconsistency-container flex-row align-center flex-wrap-content">
            {props.inconsistencies.map(inconsistency => {
                return (
                    <Inconsistency inconsistency={inconsistency} />
                );
            })}
        </div>
    );
}

export default InconsistencyContainer;
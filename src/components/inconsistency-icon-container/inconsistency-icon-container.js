import './inconsistency-icon-container.css';
import InconsistencyIcon from '../inconsistency-icon/inconsistency-icon';

const InconsistencyIconContainer = (props) => {
    return (
        <div className="inconsistency-icon-container flex-row align-center flex-wrap-content">
            {props.inconsistencies.map(inconsistency => {
                return (
                    <InconsistencyIcon inconsistency={inconsistency} />
                );
            })}
        </div>
    );
}

export default InconsistencyIconContainer;
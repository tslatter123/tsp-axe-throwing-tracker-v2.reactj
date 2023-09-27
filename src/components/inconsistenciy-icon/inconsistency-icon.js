import './inconsistency-icon.css';
import '../../assets/css/inconsistencies/global-inconsistencies.css';

const InconsistencyIcon = (props) => {
    const className = props.inconsistency.className ?
        "inconsistency-icon " + props.inconsistency.className :
        "inconsistency-icon";

    return (
        <div key={props.inconsistency.id} className={className}></div>
    );
}

export default InconsistencyIcon;
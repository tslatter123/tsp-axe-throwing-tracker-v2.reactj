import '../../assets/css/gameScore/globalScore.css';
import '../../assets/css/gameScore/watlScore.css';

const WatlScore = (props) => {
    const className = props.className ?
        "game-score watl flex-row " + props.className + " align-center justify-center" :
        "game-score watl flex-row align-center justify-center";

    return (
        <div className={className}>
            {props.displayName}
        </div>
    );
}

export default WatlScore;
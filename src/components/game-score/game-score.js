import './game-score.css';
import './game-score-watl.css';

const GameScore = (props) => {
    const className = props.className ?
        "game-score watl " + props.className + " flex-row align-center justify-center" :
        "game-score watl flex-row align-center justify-center";

    return (
        <div className={className}>
            {props.displayName}
        </div>
    );
}

export default GameScore;
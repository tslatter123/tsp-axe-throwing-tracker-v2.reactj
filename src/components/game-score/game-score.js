import './game-score.css';
import './game-score-watl.css';

const GameScore = (props) => {
    const className = "game-score" +
        (props.gameType ? " " + props.gameType : "") +
        (props.className ? " " + props.className : "") +
        " flex-row align-center justify-center";

    return (
        <div className={className}>
            {props.displayName}
        </div>
    );
}

export default GameScore;
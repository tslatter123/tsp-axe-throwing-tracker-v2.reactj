import './game-throw-item.css';
import GameScore from "../game-score/game-score";
import InconsistencyIconContainer from "../inconsistency-icon-container/inconsistency-icon-container";
import GameThrowEvaluationButtons from '../game-throw-evaluation-buttons/game-throw-evaluation-buttons';

const GameThrowItem = (props) => {
    const className = props.isSelected ?
        "game-throw-item flex-row align-center flex-wrap-content selected" :
        "game-throw-item flex-row align-center flex-wrap-content";

    return (
        <div key={props.key} onClick={props.onClick} className={className}>
            {props.gameThrow.index || props.gameThrow.index === 0 ? (
                <div className="index">{props.gameThrow.index}</div>
            ) : (<></>)}

            <GameScore gameType={props.gameType} className={props.gameThrow.className} displayName={props.gameThrow.shortName} />

            {props.gameThrow.potentialScore ? (
                <GameScore className="potential-score" displayName={props.gameThrow.potentialScore} />
            ) : (<></>)}

            {props.showInconsistencies ? (
                <InconsistencyIconContainer inconsistencies={props.gameThrow.inconsistencies} />
            ) : (<></>)}

            {props.showEvaluationOptions ? (
                <GameThrowEvaluationButtons id={props.gameThrow.id} templateId={props.templateId} />
            ) : (<></>)}
        </div>
    );
}

export default GameThrowItem;
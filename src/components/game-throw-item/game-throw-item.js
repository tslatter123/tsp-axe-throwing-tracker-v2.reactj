import './game-throw-item.css';
import GameScore from "../game-score/game-score";
import InconsistencyIconContainer from "../inconsistency-icon-container/inconsistency-icon-container";

const GameThrowItem = (props) => {
    return (
        <div key={props.gameThrow.id} className="game-throw-item flex-row align-center flex-wrap-content">
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
                <>
                    <button disabled>Set inconsistencies</button>
                    <button disabled>Set potential score</button>
                </>
            ) : (<></>)}
        </div>
    );
}

export default GameThrowItem;
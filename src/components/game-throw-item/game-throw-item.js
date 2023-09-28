import './game-throw-item.css';
import GameScore from "../game-score/game-score";
import InconsistencyIconContainer from "../inconsistency-icon-container/inconsistency-icon-container";

const GameThrowItem = (props) => {
    const incrementGameTypeClass = () => {
        return props.gameType ? props.gameType : "";
    }
    const incrementClassName = () => {
        return props.gameThrow.className ? " " + props.gameThrow.className : "";
    }

    const gameThrowClassName = incrementGameTypeClass() + incrementClassName();

    return (
        <div key={props.gameThrow.id} className="game-throw-item flex-row align-center flex-wrap-content">
            {props.gameThrow.index || props.gameThrow.index === 0 ? (
                <div className="index">{props.gameThrow.index}</div>
            ) : (<></>)}

            <GameScore className={gameThrowClassName} displayName={props.gameThrow.shortName} />

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
                    {/* <button onClick={() => openCloseInconsistencies(gameThrow.id)}>Set inconsistencies</button>
                    <button onClick={() => openClosePotentialScore(gameThrow.id)}>Set potential score</button> */}
                </>
            ) : (<></>)}
        </div>
    );
}

export default GameThrowItem;
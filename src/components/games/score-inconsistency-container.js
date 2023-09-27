import ScoreInconsistency from "./score-inconsistency";


const ScoreInconsistencyContainer = (props) => {
    return (
        <div className="game-inconsistency-container flex-row wrap-content">
            {props.inconsistencies.map(inconsistency => {
                return (
                    <ScoreInconsistency inconsistency={inconsistency} />
                );
            })}
        </div>
    );
}

export default ScoreInconsistencyContainer;
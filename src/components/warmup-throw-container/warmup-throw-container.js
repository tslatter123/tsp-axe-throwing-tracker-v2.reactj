import '../game-throw-item/game-throw-item.css';
import './warmup-throw-container.css';
import GameScore from "../game-score/game-score";

const WarmupThrowContainer = (props) => {
    return (
        <div className="game-throw-item warmup-throw-item flex-row align-center flex-wrap-content">
            <span className="warmup-title">Warmup:</span>
            {props.warmupThrows.map(warmupThrow => {
                return (
                    <GameScore gameType={props.gameType} className={warmupThrow.className} displayName={warmupThrow.shortName} />
                );
            })}
        </div>
    )
}

export default WarmupThrowContainer;
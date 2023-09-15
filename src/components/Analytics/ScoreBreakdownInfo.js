const ScoreBreakdownInfo = (props) => {
    const scores = props.scoreBreakdown;
    const mostCommonScore = props.mostCommonScore;

    return (
        <div className="analytics-item">
            <h2>Scoring breakdown</h2>
            {scores?.length ? (
                scores.map(score => {
                    return (
                        <div className="score-breakdown-item">
                            <span>{score.score}</span>
                            <span>{score.info.count} / {score.info.total}</span>
                            <span>{score.info.percentageStr}</span>
                        </div>
                    );
                })
            ) : (<></>)}
            {mostCommonScore ? (
                <h3>Most common throw score: {mostCommonScore}</h3>
            ) : (<></>)}
        </div>
    )
}

export default ScoreBreakdownInfo
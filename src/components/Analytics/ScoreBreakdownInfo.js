const ScoreBreakdownInfo = (props) => {
    const scores = props.scoreBreakdown;
    const mostCommonScore = props.mostCommonScore;

    return (
        <div className="analytics-item half-width">
            <h2>Scoring breakdown</h2>
            {scores?.length ? (
                scores.map(score => {
                    return (
                        <div className="score-breakdown-item">
                            <span className="identifier">{score.score}:</span>
                            <span className="calculation">{score.info.count} / {score.info.total}</span>
                            <span className="percentage">{score.info.percentageStr}</span>
                        </div>
                    );
                })
            ) : (<></>)}
            {mostCommonScore ? (
                <div className="score-breakdown-item flex-col" style={{ "padding": "5px 0" }}>
                    <b>Most common throw score:</b>
                    <h3>{mostCommonScore}</h3>
                </div>
            ) : (<></>)}
        </div>
    )
}

export default ScoreBreakdownInfo
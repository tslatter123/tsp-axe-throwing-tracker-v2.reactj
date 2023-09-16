const InconsistencyInfo = (props) => {

    const inconsistencies = props.inconsistencies;
    const consistentCount = props.consistentThrowCount;
    const total = props.totalThrows;
    const consistentPercentage = props.consistentThrowsPercentage;

    return (
        <div className="analytics-item half-width">
            <h2>Inconsistencies</h2>
            {inconsistencies ? (
                inconsistencies.map(inconsistencyInfo => {
                    return (
                        <div className="inconsistency-item">
                            <div className={inconsistencyInfo.className ? "game-inconsistency " + inconsistencyInfo.className : "game-inconsistency"}></div>
                            <span className="inconsistency-calculation">{inconsistencyInfo.info.count} / {inconsistencyInfo.info.total}</span>
                            <span className="inconsistency-percentage">{inconsistencyInfo.info.percentageStr}</span>
                        </div>
                    );
                })
            ) : (<></>)}
            {total ? (
                <>
                    <b className="bottom">Consistent throws:</b>
                    <div className="inconsistency-item">
                        <div className="game-inconsistency placeholder"></div>
                        <span className="inconsistency-calculation">{consistentCount} / {total}</span>
                        <span className="inconsistency-percentage">{consistentPercentage}</span>
                    </div>
                </>
            ) : (<></>)}
        </div >
    );
}

export default InconsistencyInfo;
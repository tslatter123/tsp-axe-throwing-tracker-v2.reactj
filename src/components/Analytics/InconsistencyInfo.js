const InconsistencyInfo = (props) => {

    const inconsistencies = props.inconsistencies;
    const consistentCount = props.consistentThrowCount;
    const total = props.totalThrows;
    const consistentPercentage = props.consistentThrowsPercentage;

    return (
        <div className="analytics-item">
            <h2>Inconsistencies</h2>
            {inconsistencies ? (
                inconsistencies.map(inconsistencyInfo => {
                    return (
                        <div className="inconsistency-item">
                            <div className={inconsistencyInfo.className ? "game-inconsistency " + inconsistencyInfo.className : "game-inconsistency"}></div>
                            <span>{inconsistencyInfo.info.count} / {inconsistencyInfo.info.total}</span>
                            <span>{inconsistencyInfo.info.percentageStr}</span>
                        </div>
                    );
                })
            ) : (<></>)}
            {total ? (
                <>
                    <h3>Consistent throws</h3>
                    <div className="inconsistency-item">
                        <div className="game-inconsistency placeholder"></div>
                        <span>{consistentCount} / {total}</span>
                        <span>{consistentPercentage}</span>
                    </div>
                </>
            ) : (<></>)}
        </div >
    );
}

export default InconsistencyInfo;
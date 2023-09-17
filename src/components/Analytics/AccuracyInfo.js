const AccuracyInfo = (props) => {
    const accuracyInfo = props.accuracyInfo;

    return (
        <div className={accuracyInfo.className ? "analytics-item " + accuracyInfo.className : "analytics-item"}>
            {/* <div> */}
            <h2>{accuracyInfo.displayName}</h2>
            {accuracyInfo?.onWarmUp ? (
                <div className="accuracy-item">
                    <span className="identifier">On warmup throws:</span>
                    <span className="calculation">{accuracyInfo.onWarmUp.count} / {accuracyInfo.onWarmUp.total}</span>
                    <span className="percentage">{accuracyInfo.onWarmUp.percentageStr}</span>
                </div>
            ) : (<></>)}
            {accuracyInfo?.onGames ? (
                <div className="accuracy-item">
                    <span className="identifier">On game throws:</span>
                    <span className="calculation">{accuracyInfo.onGames.count} / {accuracyInfo.onGames.total}</span>
                    <span className="percentage">{accuracyInfo.onGames.percentageStr}</span>
                </div>
            ) : (<></>)}
            {accuracyInfo?.onSpecificPractice ? (
                <div className="accuracy-item">
                    <span className="identifier">On specific practice:</span>
                    <span className="calculation">{accuracyInfo.onSpecificPractice.count} / {accuracyInfo.onSpecificPractice.total}</span>
                    <span className="percentage">{accuracyInfo.onSpecificPractice.percentageStr}</span>
                </div>
            ) : (<></>)}
            {accuracyInfo?.overall ? (
                <div className="accuracy-item">
                    <span className="identifier">Overall accuracy:</span>
                    <span className="calculation">{accuracyInfo.overall.count} / {accuracyInfo.overall.total}</span>
                    <span className="percentage">{accuracyInfo.overall.percentageStr}</span>
                </div>
            ) : (<></>)}
        </div>
    )
}

export default AccuracyInfo;
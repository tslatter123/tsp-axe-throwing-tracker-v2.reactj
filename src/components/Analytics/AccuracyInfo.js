const AccuracyInfo = (props) => {
    const accuracyInfo = props.accuracyInfo;

    return (
        <div className={accuracyInfo.className ? "analytics-item " + accuracyInfo.className : "analytics-item"}>
            {/* <div> */}
            <h2>{accuracyInfo.displayName}</h2>
            {accuracyInfo?.onWarmUp ? (
                <div className="accuracy-item">
                    <h3>On warmup throws:</h3>
                    <span>{accuracyInfo.onWarmUp.count} / {accuracyInfo.onWarmUp.total}</span>
                    <span><b>{accuracyInfo.onWarmUp.percentageStr}</b></span>
                </div>
            ) : (<></>)}
            {accuracyInfo?.onGames ? (
                <div className="accuracy-item">
                    <h3>On game throws:</h3>
                    <span>{accuracyInfo.onGames.count} / {accuracyInfo.onGames.total}</span>
                    <span><b>{accuracyInfo.onGames.percentageStr}</b></span>
                </div>
            ) : (<></>)}
            {accuracyInfo?.onSpecificPractice ? (
                <div className="accuracy-item">
                    <h3>On specific practice:</h3>
                    <span>{accuracyInfo.onSpecificPractice.count} / {accuracyInfo.onSpecificPractice.total}</span>
                    <span><b>{accuracyInfo.onSpecificPractice.percentageStr}</b></span>
                </div>
            ) : (<></>)}
            {accuracyInfo?.overall ? (
                <div className="accuracy-item">
                    <h3>Overall accuracy:</h3>
                    <span>{accuracyInfo.overall.count} / {accuracyInfo.overall.total}</span>
                    <span><b>{accuracyInfo.overall.percentageStr}</b></span>
                </div>
            ) : (<></>)}
        </div>
    )
}

export default AccuracyInfo;
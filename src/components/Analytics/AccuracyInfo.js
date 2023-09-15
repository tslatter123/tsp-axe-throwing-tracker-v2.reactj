import { useState } from "react";

const AccuracyInfo = (props) => {
    const [accuracyInfo, setAccuracyInfo] = useState(props.accuracyInfo);

    return (
        <div className={"analytics-item " + accuracyInfo.className}>
            <h2>{accuracyInfo.displayName}</h2>
            {accuracyInfo?.onWarmUp ? (
                <div className="accuracy-item">
                    <h3>On warmup throws:</h3>
                    <p>{accuracyInfo.onWarmUp.count} / {accuracyInfo.onWarmUp.total}</p>
                    <p><b>{accuracyInfo.onWarmUp.percentageStr}</b></p>
                </div>
            ) : (<></>)}
            {accuracyInfo?.onGames ? (
                <div className="accuracy-item">
                    <h3>On game throws:</h3>
                    <p>{accuracyInfo.onGames.count} / {accuracyInfo.onGames.total}</p>
                    <p><b>{accuracyInfo.onGames.percentageStr}</b></p>
                </div>
            ) : (<></>)}
            {accuracyInfo?.onSpecificPractice ? (
                <div className="accuracy-item">
                    <h3>On specific practice:</h3>
                    <p>{accuracyInfo.onSpecificPractice.count} / {accuracyInfo.onSpecificPractice.total}</p>
                    <p><b>{accuracyInfo.onSpecificPractice.percentageStr}</b></p>
                </div>
            ) : (<></>)}
            {accuracyInfo?.overall ? (
                <div className="accuracy-item">
                    <h3>Overall accuracy:</h3>
                    <p>{accuracyInfo.overall.count} / {accuracyInfo.overall.total}</p>
                    <p><b>{accuracyInfo.overall.percentageStr}</b></p>
                </div>
            ) : (<></>)}
        </div>
    )
}

export default AccuracyInfo;
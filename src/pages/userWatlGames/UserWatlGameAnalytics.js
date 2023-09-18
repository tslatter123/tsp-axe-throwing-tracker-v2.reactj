import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AccuracyInfo from "../../components/Analytics/AccuracyInfo";
import InconsistencyInfo from "../../components/Analytics/InconsistencyInfo";
import ScoreBreakdownInfo from "../../components/Analytics/ScoreBreakdownInfo";
import GlobalUserGameFilters from "../../components/globalUserGames/GlobalUserGameFilters";

const userWatlGameAnalyticsUrl = 'UserWatlGameAnalytics';

const UserWatlGameAnalytics = () => {
    const errorMsgRef = useRef();

    const [gameCount, setGameCount] = useState(0);
    const [averageScore, setAverageScore] = useState(0);
    const [scoreBreakdown, setScoreBreakdown] = useState([]);
    const [mostCommonScore, setMostCommonScore] = useState(0);
    const [inconsistencies, setInconsistencies] = useState([]);
    const [consistentThrowCount, setConsistentThrowCount] = useState(0);
    const [totalThrowCount, setTotalThrowCount] = useState(0);
    const [consistentThrowPercentage, setConsistentThrowPercentage] = useState(0);
    const [accuracies, setAccuracies] = useState([]);

    const [errorMsg, setErrorMsg] = useState('');

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAnalyticsInfo = async () => {
            try {
                const response = await axiosPrivate.get(userWatlGameAnalyticsUrl, {
                    signal: controller.signal
                });

                if (isMounted) {
                    setGameCount(response.data.analyticsInfo.gameCount);
                    if (response.data.analyticsInfo.gameCount) {
                        setAverageScore(response.data.analyticsInfo.averages?.averageStr);
                        setScoreBreakdown(response.data.analyticsInfo.scoreBreakdown?.scoreBreakdownItems);
                        setMostCommonScore(response.data.analyticsInfo.scoreBreakdown?.mostCommonScore);
                        setInconsistencies(response.data.analyticsInfo.inconsistencies?.inconsistencies);
                        setConsistentThrowCount(response.data.analyticsInfo.inconsistencies?.consistentThrows?.count);
                        setTotalThrowCount(response.data.analyticsInfo.inconsistencies?.consistentThrows?.total);
                        setConsistentThrowPercentage(response.data.analyticsInfo.inconsistencies?.consistentThrows?.percentageStr);
                        setAccuracies(response.data.analyticsInfo.accuracies);
                    }
                }
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No server response.");
                }
                else {
                    setErrorMsg(err.response.data.error);
                }
            }
        }

        getAnalyticsInfo();
    }, [axiosPrivate]);

    const getData = (analyticsInfo) => {
        setGameCount(analyticsInfo.gameCount);
        if (gameCount) {
            setAverageScore(analyticsInfo.averages?.averageStr);
            setScoreBreakdown(analyticsInfo.scoreBreakdown?.scoreBreakdownItems);
            setMostCommonScore(analyticsInfo.scoreBreakdown?.mostCommonScore);
            setInconsistencies(analyticsInfo.inconsistencies?.inconsistencies);
            setConsistentThrowCount(analyticsInfo.inconsistencies?.consistentThrows?.count);
            setTotalThrowCount(analyticsInfo.inconsistencies?.consistentThrows?.total);
            setConsistentThrowPercentage(analyticsInfo.inconsistencies?.consistentThrows?.percentageStr);
            setAccuracies(analyticsInfo.accuracies);
        }
    }

    return (
        <div className="page-content">
            <section>
                <h1>World Axe Throwing League game analytics</h1>
                <GlobalUserGameFilters targetUrl={userWatlGameAnalyticsUrl} filterType="analytics" onSubmit={getData}></GlobalUserGameFilters>
                {errorMsg ? (
                    <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
                ) : (
                    <>
                        {gameCount ? (
                            <div className="analytics-container">
                                {averageScore ? (
                                    <h2>Average score: {averageScore}</h2>
                                ) : (<></>)}
                                {scoreBreakdown?.length || mostCommonScore ? (
                                    <ScoreBreakdownInfo
                                        scoreBreakdown={scoreBreakdown}
                                        mostCommonScore={mostCommonScore}
                                    />
                                ) : (<></>)}
                                {inconsistencies?.length || totalThrowCount ? (
                                    <InconsistencyInfo
                                        inconsistencies={inconsistencies}
                                        consistentThrowCount={consistentThrowCount}
                                        totalThrows={totalThrowCount}
                                        consistentThrowsPercentage={consistentThrowPercentage}
                                    />
                                ) : (<></>)}
                                {accuracies ? accuracies.map(
                                    accuracyItem => <AccuracyInfo accuracyInfo={accuracyItem} />
                                ) : (<></>)}
                            </div>
                        ) : (<p>You have no World Axe Throwing League games saved.</p>)}
                    </>
                )}

            </section >
        </div >
    );
}

export default UserWatlGameAnalytics;
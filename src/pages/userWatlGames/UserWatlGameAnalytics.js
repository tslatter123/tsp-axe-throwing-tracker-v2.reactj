import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AccuracyInfo from "../../components/Analytics/AccuracyInfo";

const userWatlGameAnalyticsUrl = 'UserWatlGameAnalytics';

const UserWatlGameAnalytics = () => {
    const errorMsgRef = useRef();

    const [averageScore, setAverageScore] = useState(0);
    const [scoreBreakdown, setScoreBreakdown] = useState([]);
    const [mostCommonScore, setMostCommonScore] = useState(0);
    const [inconsistencies, setInconsistencies] = useState([]);
    const [consistenctThrowCount, setConsistentThrowCount] = useState(0);
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
                    setAverageScore(response.data.analyticsInfo.averages?.averageStr);
                    setScoreBreakdown(response.data.analyticsInfo.scoreBreakdown?.scoreBreakdownItems);
                    setMostCommonScore(response.data.analyticsInfo.scoreBreakdown?.mostCommonScore);
                    setInconsistencies(response.data.analyticsInfo.inconsistencies?.inconsistencies);
                    setConsistentThrowCount(response.data.analyticsInfo.inconsistencies?.consistentThrows?.count);
                    setTotalThrowCount(response.data.analyticsInfo.inconsistencies?.consistentThrows?.total);
                    setConsistentThrowPercentage(response.data.analyticsInfo.inconsistencies?.consistentThrows?.percentageStr);
                    setAccuracies(response.data.analyticsInfo.accuracies);
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

    return (
        <div className="page-content">
            <section>
                <h1>World Axe Throwing League game analytics</h1>
                {errorMsg ? (
                    <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
                ) : (
                    <>
                        {averageScore ? (
                            <h2>Average score: {averageScore}</h2>
                        ) : (<></>)}
                        {scoreBreakdown ? (
                            <></>
                        ) : (<></>)}

                        {accuracies ? (
                            <div className="analytics-container">
                                {accuracies.map(accuracyItem => <AccuracyInfo accuracyInfo={accuracyItem} />)}
                            </div>) : (<></>)
                        }
                    </>
                )}
            </section >
        </div >
    );
}

export default UserWatlGameAnalytics;
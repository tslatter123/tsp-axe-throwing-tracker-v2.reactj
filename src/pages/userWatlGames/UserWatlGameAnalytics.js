import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AccuracyInfo from "../../components/Analytics/AccuracyInfo";

const userWatlGameAnalyticsUrl = 'UserWatlGameAnalytics';

const UserWatlGameAnalytics = () => {
    const errorMsgRef = useRef();

    const [average, setAverage] = useState(0);
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
                    <div className="analytics-container">
                        {/* {analyticsInfo.accuracies.Map(accuracyItem => <AccuracyInfo accuracyInfo={accuracyItem} />)} */}
                    </div>
                )}
            </section>
        </div>
    );
}

export default UserWatlGameAnalytics;
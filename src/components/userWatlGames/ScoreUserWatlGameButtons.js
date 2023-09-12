import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const watlGameThrowOptionsUrl = 'WatlGameThrowOptions';

const ScoreUserWatlGameButtons = (props) => {
    const errorMsgRef = useRef();

    const [bullseyeAttemptThrowOptions, setBullseyeAttemptThrowOptions] = useState([]);
    const [killshotAttemptThrowOptions, setKillshotAttemptThrowOptions] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getWatlGameThrowOptions = async () => {
            try {
                const response = await axiosPrivate.get(watlGameThrowOptionsUrl + "?templateId=" + props.templateId,
                    {
                        signal: controller.signal
                    });

                if (isMounted) {
                    setBullseyeAttemptThrowOptions(response.data.gameThrowOptionInfoList.bullseyeAttemptThrows);
                    setKillshotAttemptThrowOptions(response.data.gameThrowOptionInfoList.killshotAttemptThrows);
                }
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No server response.");
                }
                else {
                    setErrorMsg(err.repsponse.data.error);
                }
            }
        }

        getWatlGameThrowOptions();
    }, [axiosPrivate, props.templateId]);

    return (
        <>
            {errorMsg ? (
                <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
            ) : (
                <>
                    {bullseyeAttemptThrowOptions.length ? (
                        <div className="popout-content flex-row wrap-content">
                            {bullseyeAttemptThrowOptions.map((gameThrowOption) => {
                                return (
                                    <button key={gameThrowOption.id} className={"watl-game-throw-option-btn" + gameThrowOption.className}>{gameThrowOption.name}</button>
                                );
                            })}
                        </div>) : (<></>)}
                    {killshotAttemptThrowOptions.length ? (
                        <div className="popout-content flex-row wrap-content">
                            {killshotAttemptThrowOptions.map((gameThrowOption) => {
                                return (
                                    <button key={gameThrowOption.id} className={"watl-game-throw-option-btn" + gameThrowOption.className}>{gameThrowOption.name}</button>
                                )
                            })}
                        </div>) : (<></>)}
                </>
            )}
        </>
    );
}

export default ScoreUserWatlGameButtons;
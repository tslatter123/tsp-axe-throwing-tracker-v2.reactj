import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const watlGameThrowOptionsUrl = 'WatlGameThrowOptions';
const watlGameThrowUrl = 'UserWatlGameThrow';

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

    const handleButtonClick = async (throwOptionId) => {
        const addWatlGameThrow = async () => {
            try {
                const response = await axiosPrivate.post(watlGameThrowUrl,
                    {
                        "watlGameID": props.watlGameId,
                        "watlGameThrowID": throwOptionId
                    });

                props.onSubmit(response.data.watlGameInfo);
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No server response.");
                }
                else {
                    setErrorMsg(err.response.data.error);
                }
            }
        }

        const updateWatlGameThrow = async () => {
            try {
                const response = await axiosPrivate.put(watlGameThrowUrl,
                    {
                        "id": props.watlGameThrowId,
                        "watlGameID": props.watlGameId,
                        "watlGameThrowID": throwOptionId
                    });

                props.onSubmit(response.data.watlGameInfo);
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No server response.");
                }
                else {
                    setErrorMsg(err.response.data.error);
                }
            }
        }

        if (props.watlGameThrowId === 0 || props.watlGameThrowId) {
            updateWatlGameThrow();
        }
        else {
            addWatlGameThrow();
        }
    }

    return (
        <>
            {errorMsg ? (
                <div className="popout-content">
                    <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
                </div>
            ) : (
                <>
                    {bullseyeAttemptThrowOptions.length ? (
                        <div id="bullseye-attempt-options" className="popout-content flex-row flex-wrap-content">
                            {bullseyeAttemptThrowOptions.map((gameThrowOption) => {
                                return (
                                    <button
                                        key={gameThrowOption.id}
                                        className={"watl-game-throw-option-btn " + gameThrowOption.className}
                                        onClick={() => handleButtonClick(gameThrowOption.id)}
                                    >
                                        {gameThrowOption.name}
                                    </button>
                                );
                            })}
                        </div>) : (<></>)}
                    {killshotAttemptThrowOptions.length ? (
                        <div id="killshot-attempt-options" className="popout-content flex-row flex-wrap-content">
                            {killshotAttemptThrowOptions.map((gameThrowOption) => {
                                return (
                                    <button
                                        key={gameThrowOption.id}
                                        className={"watl-game-throw-option-btn " + gameThrowOption.className}
                                        onClick={() => handleButtonClick(gameThrowOption.id)}
                                    >
                                        {gameThrowOption.name}
                                    </button>
                                )
                            })}
                        </div>) : (<></>)}
                </>
            )}
        </>
    );
}

export default ScoreUserWatlGameButtons;
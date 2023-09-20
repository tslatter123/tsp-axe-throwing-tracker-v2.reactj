import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const watlGameThrowOptionsUrl = 'WatlGameThrowOptions';
const watlWarmupThrowUrl = 'UserWatlGameWarmupThrow';

const UserWatlGameWarmupButtons = (props) => {
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
        const addWatlWarmupThrow = async () => {
            try {
                const response = await axiosPrivate.post(watlWarmupThrowUrl,
                    {
                        "gameID": props.watlGameId,
                        "warmupThrowID": throwOptionId
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

        const updateWatlWarmupThrow = async () => {
            try {
                const response = await axiosPrivate.put(watlWarmupThrowUrl,
                    {
                        "id": props.warmupThrowId,
                        "gameID": props.watlGameId,
                        "warmupThrowID": throwOptionId
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

        if (props.warmupThrowId === 0 || props.warmupThrowId) {
            updateWatlWarmupThrow();
        }
        else {
            addWatlWarmupThrow();
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
                        <div id="bullseye-attempt-options" className="popout-content flex-row wrap-content">
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
                        <div id="killshot-attempt-options" className="popout-content flex-row wrap-content">
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

export default UserWatlGameWarmupButtons;
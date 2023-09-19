import { useRef, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const userWatlGameAxeUrl = "UserWatlGameAxe";

const UserWatlGameAxeButtons = (props) => {
    const errorMsgRef = useRef();

    const [axes, setAxes] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getGameAxes = async () => {
            try {
                const response = await axiosPrivate.get(userWatlGameAxeUrl + "?gameId=" + props.gameId,
                    {
                        signal: controller.signal
                    });

                isMounted && setAxes(response.data.axeInfoList);
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No server response.");
                }
                else {
                    setErrorMsg(err.response.data.error);
                }
            }
        }

        getGameAxes();
    }, [axiosPrivate, props.gameId]);

    const handleButtonClick = (id, isPresent) => {
        const addAxeToGame = async () => {
            try {
                const response = await axiosPrivate.post(userWatlGameAxeUrl,
                    {
                        "gameID": props.gameId,
                        "axeID": id
                    });

                setAxes(response.data.axeInfoList);
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No server response.");
                }
                else {
                    setErrorMsg(err.response.data.error);
                }
            }
        }

        const deletAxeFromGame = async () => {
            try {
                const response = await axiosPrivate.delete(userWatlGameAxeUrl + "?gameId=" + props.gameId + "&axeId=" + id);

                setAxes(response.data.axeInfoList);
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No server response.");
                }
                else {
                    setErrorMsg(err.response.data.error);
                }
            }
        }

        if (isPresent) {
            deletAxeFromGame();
        }
        else {
            addAxeToGame();
        }
    }

    return (
        <>
            <h2>Axes used in this game</h2>
            {errorMsg ? (
                <div className="popout-content">
                    <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
                </div>
            ) : (
                <>
                    {axes.map(axe => {
                        return (
                            <>
                                <button
                                    type="button"
                                    style={axe.isPresent ? { "background": "lightblue" } : {}}
                                    onClick={() => handleButtonClick(axe.id, axe.isPresent)}
                                >
                                    {axe.name}
                                </button>
                            </>
                        );
                    })}
                </>
            )}
        </>
    )
}

export default UserWatlGameAxeButtons;
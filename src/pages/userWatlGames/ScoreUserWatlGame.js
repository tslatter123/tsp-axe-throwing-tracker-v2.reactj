import { useParams } from "react-router-dom";

const { useState, useEffect, useRef } = require("react");
const { default: useAxiosPrivate } = require("../../hooks/useAxiosPrivate");

const watlGameUrl = 'UserWatlGame';

const ScoreUserWatlGame = () => {
    let params = useParams();

    const errorMsgRef = useRef();

    const [name, setName] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [score, setScore] = useState(0);
    const [gameThrows, setGameThrows] = useState([]);
    const [maxThrowCount, setMaxThrowCount] = useState(0);

    const [scoreBtnsOpen, setScoreBtnsOpen] = useState(false);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getWatlGameInfo = async () => {
            try {
                const response = await axiosPrivate.get(watlGameUrl + "?id=" + params.id,
                    {
                        signal: controller.signal
                    });

                if (isMounted) {
                    setName(response.data.watlGameInfo.name);
                    setTemplateName(response.data.watlGameInfo.templateName);
                    setDate(response.data.watlGameInfo.dateStr);
                    setDescription(response.data.watlGameInfo.description);
                    setScore(response.data.watlGameInfo.score);
                    setGameThrows(response.data.watlGameInfo.gameThrows);
                    setMaxThrowCount(response.data.watlGameInfo.maxThrowCount);

                    setScoreBtnsOpen(gameThrows.length < maxThrowCount);
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

        getWatlGameInfo();
    }, [axiosPrivate, params.id, gameThrows.length, maxThrowCount]);

    return (
        <div className="page-content">
            <section>
                <h1>Scoring {name}</h1>
                <p>Template: {templateName}</p>
                <p>On {date}</p>
                {description ? (
                    <p>{description}</p>
                ) : (<></>)}
                {errorMsg ? (
                    <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
                ) : (<></>)}

                <div className="watl-game-header">
                    <h2>{score}</h2>
                </div>
                <div className="watl-game-throws-container">
                    {gameThrows.length ?
                        gameThrows.map(gameThrow => {
                            return (
                                <div key={gameThrow.id} className={"watl-game-throw-item"}>
                                    <div className={"watl-game-throw-score " + gameThrow.className}>{gameThrow.shortName}</div>
                                </div>
                            );
                        }) : (<></>)
                    }
                </div>
            </section>
        </div>
    )
}

export default ScoreUserWatlGame;
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const watlGameUrl = 'UserWatlGame';

const EvaluateUserWatlGame = () => {
    let params = useParams();

    const errorMsgRef = useRef();

    const [name, setName] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [score, setScore] = useState(0);
    const [gameThrows, setGameThrows] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

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
    }, [axiosPrivate, params.id]);
    return (
        <div className="page-content">
            <section className="flex-col">
                <div className="header-row">
                    <h1>Scoring {name}</h1>
                    <p>Template: <b>{templateName}</b></p>
                    <p>Date: <b>{date}</b></p>
                </div>
                {description ? (
                    <p>{description}</p>
                ) : (<></>)}
                {errorMsg ? (
                    <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
                ) : (<></>)}
                <div className="score-watl-game-container">
                    <div className="watl-game-score">
                        <div className="watl-game-header">
                            <h2>Score: {score}</h2>
                        </div>
                        <div className="watl-game-throws-container">
                            {gameThrows.length ?
                                gameThrows.map(gameThrow => {
                                    return (
                                        <div
                                            key={gameThrow.id}
                                            className="watl-game-throw-item"
                                        //className={watlGameThrowId === gameThrow.id ? "watl-game-throw-item selected" : "watl-game-throw-item"}
                                        //onClick={() => openCloseScoreButtons(gameThrow.id)}
                                        >
                                            <div className="watl-game-throw-index">{gameThrow.index}</div>
                                            <div className={"watl-game-throw-score " + gameThrow.className}>{gameThrow.shortName}</div>
                                            <button disabled>Set inconsistencies</button>
                                            <button disabled>Set potential score</button>
                                        </div>
                                    );
                                }) : (<></>)
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EvaluateUserWatlGame;
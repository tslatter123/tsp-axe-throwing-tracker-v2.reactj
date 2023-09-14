import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserWatlGameInconsistencyButtons from "../../components/userWatlGames/UserWatlGameInconsistencyButtons";

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

    const [editGameThrowId, setEditGameThrowId] = useState(null);
    const [inconsistenciesOpen, setInconsistenciesOpen] = useState(false);
    const [potentialScoreOpen, setPotentialScoreOpen] = useState(false);

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

    const openCloseInconsistencies = (id) => {
        if (!inconsistenciesOpen || potentialScoreOpen) {
            setEditGameThrowId(id);
            setInconsistenciesOpen(true);
        }
        else if (inconsistenciesOpen) {
            setInconsistenciesOpen(id !== editGameThrowId)
            setEditGameThrowId(id === editGameThrowId ? null : id);
        }

        setPotentialScoreOpen(false);
    }

    const getData = (watlGameInfo) => {
        setName(watlGameInfo.name);
        setTemplateName(watlGameInfo.templateName);
        setDate(watlGameInfo.dateStr);
        setDescription(watlGameInfo.description);
        setScore(watlGameInfo.score);
        setGameThrows(watlGameInfo.gameThrows);
    }

    return (
        <div className="page-content">
            <section className="flex-col">
                <div className="header-row">
                    <h1>Evaluating {name}</h1>
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
                    <div className={inconsistenciesOpen || potentialScoreOpen ? "popout popout-extended popout-open" : "popout popout-extended"}>
                        {inconsistenciesOpen ? (<UserWatlGameInconsistencyButtons watlGameId={params.id} gameThrowId={editGameThrowId} onSubmit={getData} />) : (<></>)}
                    </div>
                    <div className="watl-game-score">
                        <div className="watl-game-header">
                            <h2>Score: {score}</h2>
                        </div>
                        <div className="watl-game-throws-container">
                            {gameThrows.length ?
                                gameThrows.map(gameThrow => {
                                    return (
                                        <div key={gameThrow.id} className="watl-game-throw-item">
                                            <div className="watl-game-throw-index">{gameThrow.index}</div>
                                            <div className={"watl-game-throw-score " + gameThrow.className}>{gameThrow.shortName}</div>
                                            {gameThrow.inconsistencies.map(inconsistency => {
                                                return (<div key={inconsistency.id} className={"game-inconsistency " + inconsistency.className}></div>);
                                            })}
                                            <button onClick={() => openCloseInconsistencies(gameThrow.id)}>Set inconsistencies</button>
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
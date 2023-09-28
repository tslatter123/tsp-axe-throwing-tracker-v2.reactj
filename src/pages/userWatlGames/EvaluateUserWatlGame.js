import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserWatlGameInconsistencyButtons from "../../components/userWatlGames/UserWatlGameInconsistencyButtons";
import UserWatlGameAxeButtons from "../../components/userWatlGames/UserWatlGameAxeButtons";
import UserWatlGamePotentialScoreButtons from "../../components/userWatlGames/UserWatlGamePotentialScoreButtons";
import InconsistencyIconContainer from "../../components/inconsistency-icon-container/inconsistency-icon-container";
import GameScore from "../../components/game-score/game-score";
import WarmupThrowContainer from "../../components/warmup-throw-container/warmup-throw-container";

const watlGameUrl = 'UserWatlGame';

const EvaluateUserWatlGame = () => {
    let params = useParams();

    const errorMsgRef = useRef();

    const [name, setName] = useState("");
    const [templateId, setTemplateId] = useState(0);
    const [templateName, setTemplateName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [score, setScore] = useState(0);
    const [potentialScore, setPotentialScore] = useState(0);
    const [warmupThrows, setWarmupThrows] = useState([]);
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
                    setTemplateId(response.data.watlGameInfo.templateID);
                    setTemplateName(response.data.watlGameInfo.templateName);
                    setDate(response.data.watlGameInfo.dateStr);
                    setDescription(response.data.watlGameInfo.description);
                    setScore(response.data.watlGameInfo.score);
                    setPotentialScore(response.data.watlGameInfo.potentialScore);
                    setWarmupThrows(response.data.watlGameInfo.warmupThrows);
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
            setInconsistenciesOpen(id !== editGameThrowId);
            setEditGameThrowId(id === editGameThrowId ? null : id);
        }

        setPotentialScoreOpen(false);
    }

    const openClosePotentialScore = (id) => {
        if (!potentialScoreOpen || inconsistenciesOpen) {
            setEditGameThrowId(id);
            setPotentialScoreOpen(true);
        }
        else if (potentialScoreOpen) {
            setPotentialScoreOpen(id !== editGameThrowId);
            setEditGameThrowId(id === editGameThrowId ? null : id);
        }

        setInconsistenciesOpen(false);
    }

    const getData = (watlGameInfo) => {
        setName(watlGameInfo.name);
        setTemplateId(watlGameInfo.templateID);
        setTemplateName(watlGameInfo.templateName);
        setDate(watlGameInfo.dateStr);
        setDescription(watlGameInfo.description);
        setScore(watlGameInfo.score);
        setPotentialScore(watlGameInfo.potentialScore);
        setWarmupThrows(watlGameInfo.warmupThrows);
        setGameThrows(watlGameInfo.gameThrows);

        if (potentialScoreOpen) {
            openClosePotentialScore(editGameThrowId);
        }
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
                        {inconsistenciesOpen ? (<UserWatlGameInconsistencyButtons watlGameId={params.id} gameThrowId={editGameThrowId} onSubmit={getData} />) :
                            potentialScoreOpen ? (<UserWatlGamePotentialScoreButtons templateId={templateId} gameId={params.id} gameThrowId={editGameThrowId} onSubmit={getData} />) : (<></>)}
                    </div>
                    <div className="watl-game-score">
                        <div className="watl-game-header">
                            <h2>Score: {score}</h2>
                            {score !== potentialScore ? (
                                <b className="potential-score">Potential score: {potentialScore}</b>
                            ) : (<></>)}
                        </div>
                        {warmupThrows?.length ? (
                            <div className="watl-game-throws-container">
                                <WarmupThrowContainer gameType="watl" warmupThrows={warmupThrows} />
                            </div>
                        ) : (<p>No warmup throws added</p>)}
                        <div className="watl-game-throws-container">
                            {gameThrows.length ?
                                gameThrows.map(gameThrow => {
                                    return (
                                        <div key={gameThrow.id} className="watl-game-throw-item">
                                            <div className="watl-game-throw-index">{gameThrow.index}</div>
                                            <GameScore className={"watl " + gameThrow.className} displayName={gameThrow.shortName} />
                                            {gameThrow.potentialScore ? (
                                                <div className="watl-game-throw-score potential-score">{gameThrow.potentialScore}</div>
                                            ) : (<></>)}
                                            <InconsistencyIconContainer inconsistencies={gameThrow.inconsistencies} />
                                            <button onClick={() => openCloseInconsistencies(gameThrow.id)}>Set inconsistencies</button>
                                            <button onClick={() => openClosePotentialScore(gameThrow.id)}>Set potential score</button>
                                        </div>
                                    );
                                }) : (<></>)
                            }
                        </div>
                        <div style={{ "flex": "1 auto" }}>
                            <UserWatlGameAxeButtons gameId={params.id} />
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}

export default EvaluateUserWatlGame;
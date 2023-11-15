import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserWatlGameAxeButtons from "../../components/userWatlGames/UserWatlGameAxeButtons";
import WarmupThrowContainer from "../../components/warmup-throw-container/warmup-throw-container";
import useSelectedGameThrow from "../../hooks/useSelectedGameThrow";
import RenderWatlGameButtons from "../../components/render-watl-game-buttons/render-watl-game-buttons";
import GameThrowItem from "../../components/game-throw-item/game-throw-item";

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
    const { selectedGameThrow, setSelectedGameThrow } = useSelectedGameThrow();

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

                    setSelectedGameThrow({});
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
    }, [axiosPrivate, params.id, setSelectedGameThrow]);

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

        if (selectedGameThrow?.type === "potential-score") {
            setSelectedGameThrow({});
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
                    <RenderWatlGameButtons onSubmit={getData} />
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
                                        <GameThrowItem
                                            key={"game-throw-" + gameThrow.id}
                                            gameThrow={gameThrow}
                                            gameType="watl"
                                            templateId={templateId}
                                            isSelected={selectedGameThrow?.id === gameThrow.id}
                                            showInconsistencies={true}
                                            showEvaluationOptions={true}
                                        />
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
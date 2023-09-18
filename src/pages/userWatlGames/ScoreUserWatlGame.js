import { useNavigate, useParams } from "react-router-dom";
import ScoreUserWatlGameButtons from "../../components/userWatlGames/ScoreUserWatlGameButtons";
import UserWatlGameAxeButtons from "../../components/userWatlGames/UserWatlGameAxeButtons";

const { useState, useEffect, useRef } = require("react");
const { default: useAxiosPrivate } = require("../../hooks/useAxiosPrivate");

const watlGameUrl = 'UserWatlGame';

const ScoreUserWatlGame = () => {
    let params = useParams();

    const errorMsgRef = useRef();

    const [name, setName] = useState("");
    const [templateId, setTemplateId] = useState(0);
    const [templateName, setTemplateName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [score, setScore] = useState(0);
    const [gameThrows, setGameThrows] = useState([]);
    const [maxThrowCount, setMaxThrowCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');

    const axiosPrivate = useAxiosPrivate();

    const [watlGameThrowId, setWatlGameThrowId] = useState();
    const [scoreBtnsOpen, setScoreBtnsOpen] = useState(false);

    const navigate = useNavigate();

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

    const openCloseScoreButtons = (id) => {
        setScoreBtnsOpen(gameThrows.length < maxThrowCount || watlGameThrowId !== id || !scoreBtnsOpen);
        setWatlGameThrowId(watlGameThrowId === id ? null : id);
    }

    const getData = (watlGameInfo) => {
        setName(watlGameInfo.name);
        setTemplateId(watlGameInfo.templateID);
        setTemplateName(watlGameInfo.templateName);
        setDate(watlGameInfo.dateStr);
        setDescription(watlGameInfo.description);
        setScore(watlGameInfo.score);
        setGameThrows(watlGameInfo.gameThrows);
        setMaxThrowCount(watlGameInfo.maxThrowCount);

        openCloseScoreButtons(watlGameThrowId);
    }

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
                    <div className={scoreBtnsOpen ? "popout popout-extended popout-open" : "popout popout-extended"}>
                        {scoreBtnsOpen ? (
                            <ScoreUserWatlGameButtons templateId={templateId} watlGameId={params.id} watlGameThrowId={watlGameThrowId} onSubmit={getData} />
                        ) : (<></>)}
                    </div>
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
                                            className={watlGameThrowId === gameThrow.id ? "watl-game-throw-item selected" : "watl-game-throw-item"}
                                            onClick={() => openCloseScoreButtons(gameThrow.id)}
                                        >
                                            <div className="watl-game-throw-index">{gameThrow.index}</div>
                                            <div className={"watl-game-throw-score " + gameThrow.className}>{gameThrow.shortName}</div>
                                        </div>
                                    );
                                }) : (<></>)
                            }
                        </div>
                    </div>
                    <div style={{ "flex": "1 auto" }}>
                        <UserWatlGameAxeButtons gameId={params.id} />
                        {gameThrows.length >= maxThrowCount ? (
                            <>
                                <h2>What's Next?</h2>
                                <button onClick={() => navigate('/user-watl-games/evaluate-watl-game/' + params.id)}>Evaluate your game!</button>
                            </>
                        ) : (<></>)}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ScoreUserWatlGame;
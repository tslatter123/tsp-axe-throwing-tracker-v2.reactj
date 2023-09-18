import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AddUserWatlGame from "../../components/userWatlGames/AddUserWatlGame";
import EditUserWatlGame from "../../components/userWatlGames/EditUserWatlGame";
import DeleteUserWatlGame from "../../components/userWatlGames/DeleteUserWatlGame";
import { useNavigate } from "react-router-dom";
import GlobalUserGameFilters from "../../components/globalUserGames/GlobalUserGameFilters";


const userWatlGamesUrl = '/UserWatlGames';

const UserWatlGames = () => {
    const [userWatlGames, setUserWatlGames] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const [addWatlGameOpen, setAddWatlGameOpen] = useState(false);
    const [editWatlGameOpen, setEditWatlGameOpen] = useState(false);
    const [deleteWatlGameOpen, setDeleteWatlGameOpen] = useState(false);
    const [editWatlGameId, setEditWatlGameId] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUserWatlGames = async () => {
            try {
                const response = await axiosPrivate.get(userWatlGamesUrl + "?dateFrom=&dateTo=", {
                    signal: controller.signal
                });

                isMounted && setUserWatlGames(response.data.watlGameInfoList);
            } catch (err) {
                if (!err?.response) {
                    console.error("No server response.");
                }
                else {
                    console.error(err.response.data.error);
                }
            }
        }

        getUserWatlGames();
    }, [axiosPrivate]);

    const openAddWatlGame = () => {
        setAddWatlGameOpen(!addWatlGameOpen);
        setEditWatlGameOpen(false);
        setDeleteWatlGameOpen(false);
        setEditWatlGameId(null);
    }

    const openEditWatlGame = (id) => {
        setEditWatlGameId(editWatlGameOpen ? null : id);
        setEditWatlGameOpen(!editWatlGameOpen);
        setDeleteWatlGameOpen(false);
        setAddWatlGameOpen(false);
    }

    const openDeleteWatlGame = (id) => {
        setEditWatlGameId(deleteWatlGameOpen ? null : id);
        setDeleteWatlGameOpen(!deleteWatlGameOpen);
        setAddWatlGameOpen(false);
        setEditWatlGameOpen(false);
    }

    const getData = (watlGameInfoList) => {
        setUserWatlGames(watlGameInfoList);

        setAddWatlGameOpen(false);
        setEditWatlGameOpen(false);
        setDeleteWatlGameOpen(false);
        setEditWatlGameId(null);
    }

    return (
        <>
            <div className="page-content">
                <section>
                    <h1>Your World Axe Throwing League Games</h1>
                    <GlobalUserGameFilters dateFrom={null} dateTo={null} axeId={null} />
                    <button onClick={openAddWatlGame}>Add a game</button>
                    <button onClick={() => navigate("analytics")}>Go to analytics</button>
                    {userWatlGames.length ?
                        userWatlGames.map(forDate =>
                            <div key={forDate.date} className="date-item">
                                <div className="date-header">
                                    <h2>{forDate.date}</h2>
                                    <button disabled>Go to analytics</button>
                                </div>
                                <ul className="watl-games-container">
                                    {forDate.watlGames.map(watlGame => {
                                        return (
                                            <li key={watlGame.id} className="watl-game-item">
                                                <div className="watl-game-header">
                                                    <h3>{watlGame.name}</h3>
                                                    <h4>Score: {watlGame.score}</h4>
                                                </div>
                                                <div className="watl-game-throws-container">
                                                    {watlGame.gameThrows.length ?
                                                        watlGame.gameThrows.map(gameThrow => {
                                                            return (
                                                                <div key={gameThrow.id} className={"watl-game-throw-item"}>
                                                                    <div className={"watl-game-throw-score " + gameThrow.className}>{gameThrow.shortName}</div>
                                                                    {gameThrow.inconsistencies.map(inconsistency => {
                                                                        return (<div key={inconsistency.id} className={"game-inconsistency " + inconsistency.className}></div>);
                                                                    })}
                                                                </div>
                                                            );
                                                        }) : (<p>No game throws added</p>)
                                                    }
                                                </div>
                                                <div className="watl-game-actions">
                                                    <button className="watl-game-action-btn score-game" type="button" onClick={() => navigate('score-watl-game/' + watlGame.id)}>Score</button>
                                                    <button className="watl-game-action-btn evaluate-game" type="button" onClick={() => navigate('evaluate-watl-game/' + watlGame.id)}>Evaluate</button>
                                                    <button className="watl-game-action-btn" type="button" onClick={() => { openEditWatlGame(watlGame.id) }}>Edit</button>
                                                    <button className="watl-game-action-btn delete-game" type="button" onClick={() => { openDeleteWatlGame(watlGame.id) }}>Delete</button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : (
                            <p>You have no World Axe Throwing League games saved.</p>
                        )}
                </section>
            </div>
            <div className={addWatlGameOpen || editWatlGameOpen || deleteWatlGameOpen ? "popout popout-open" : "popout"}>
                {addWatlGameOpen ? (<AddUserWatlGame />) :
                    editWatlGameOpen ? (<EditUserWatlGame id={editWatlGameId} onSubmit={getData} />) :
                        deleteWatlGameOpen ? (<DeleteUserWatlGame id={editWatlGameId} onSubmit={getData} />) : (<></>)}
            </div>
        </>
    );
}

export default UserWatlGames;
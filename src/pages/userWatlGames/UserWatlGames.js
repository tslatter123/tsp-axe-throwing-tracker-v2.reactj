import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AddUserWatlGame from "../../components/userWatlGames/AddUserWatlGame";
import EditUserWatlGame from "../../components/userWatlGames/EditUserWatlGame";


const userWatlGamesUrl = '/UserWatlGames';

const UserWatlGames = () => {
    const [userWatlGames, setUserWatlGames] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const [addWatlGameOpen, setAddWatlGameOpen] = useState(false);
    const [editWatlGameOpen, setEditWatlGameOpen] = useState(false);
    const [editWatlGameId, setEditWatlGameId] = useState(0);

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

        setEditWatlGameId(null);
    }

    const openEditWatlGame = (id) => {
        setEditWatlGameId(editWatlGameOpen ? null : id);
        setEditWatlGameOpen(!editWatlGameOpen);

        setAddWatlGameOpen(false);
    }

    const getData = (watlGameInfoList) => {
        setUserWatlGames(watlGameInfoList);

        setAddWatlGameOpen(false);
        setEditWatlGameOpen(false);
        setEditWatlGameId(null);
    }

    return (
        <>
            <div className="page-content">
                <section>
                    <h1>Your World Axe Throwing League Games</h1>
                    <button onClick={openAddWatlGame}>Add a game</button>
                    <button disabled>Go to analytics</button>
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
                                                                </div>
                                                            );
                                                        }) : (<p>No game throws added</p>)
                                                    }
                                                </div>
                                                <div className="watl-game-actions">
                                                    <button type="button" disabled>Score</button>
                                                    <button type="button" disabled>Evaluate</button>
                                                    <button type="button" onClick={() => { openEditWatlGame(watlGame.id) }}>Edit</button>
                                                    <button type="button" disabled>Delete</button>
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
            <div className={addWatlGameOpen || editWatlGameOpen ? "popout popout-open" : "popout"}>
                {addWatlGameOpen ? (<AddUserWatlGame onSubmit={getData} />) :
                    editWatlGameOpen ? (<EditUserWatlGame id={editWatlGameId} onSubmit={getData} />) : (<></>)}
            </div>
        </>
    );
}

export default UserWatlGames;
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserWatlGamesExpandedView from "../../components/userWatlGames/UserWatlGamesExpandedView";
import AddUserWatlGame from "../../components/userWatlGames/AddUserWatlGame";


const userWatlGamesUrl = '/UserWatlGames';

const UserWatlGames = () => {
    const [userWatlGames, setUserWatlGames] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const [addWatlGameOpen, setAddWatlGameOpen] = useState(false);

    const openAddWatlGame = () => {
        setAddWatlGameOpen(!addWatlGameOpen);
    }

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

    const getData = (watlGameInfoList) => {
        setUserWatlGames(watlGameInfoList);

        setAddWatlGameOpen(false);
    }

    return (
        <>
            <div className="page-content">
                <section>
                    <h1>Your World Axe Throwing League Games</h1>
                    <button onClick={openAddWatlGame}>Add a game</button>
                    <button>Go to analytics</button>
                    {userWatlGames.length ?
                        userWatlGames.map(forDate => {
                            return (
                                <div className="date-item">
                                    <div className="date-header">
                                        <h2>{forDate.date}</h2>
                                        <button>Go to analytics</button>
                                    </div>
                                    <UserWatlGamesExpandedView watlGames={forDate.watlGames} />
                                </div>
                            );
                        }) : (
                            <p>You have no World Axe Throwing League games saved.</p>
                        )}
                </section>
            </div>
            <div className={addWatlGameOpen ? "popout popout-open" : "popout"}>
                {addWatlGameOpen ? (<AddUserWatlGame onSubmit={getData} />) : (<></>)}
            </div>
        </>
    );
}

export default UserWatlGames;
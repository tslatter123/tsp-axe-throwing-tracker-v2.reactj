import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserWatlGamesExpandedView from "../../components/userWatlGames/UserWatlGamesExpandedView";

const userWatlGamesUrl = '/UserWatlGames';

const UserWatlGames = () => {
    const [userWatlGames, setUserWatlGames] = useState([]);
    //const [errorMsg, setErrorMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUserWatlGames = async () => {
            try {
                const response = await axiosPrivate.get(userWatlGamesUrl + "?dateFrom=&dateTo=", {
                    signal: controller.signal
                });
                console.log(response.data.watlGameInfoList);
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

    return (
        <div className="page-content">
            <section>
                <h1>Your World Axe Throwing League Games</h1>
                <button>Add a game</button>
                {userWatlGames.length ?
                    userWatlGames.map(forDate => {
                        return (
                            <div className="date-item">
                                <div className="date-header">
                                    <h2>{forDate.date}</h2>
                                </div>
                                <UserWatlGamesExpandedView watlGames={forDate.watlGames} />
                            </div>
                        );
                    }) : (
                        <p>You have no World Axe Throwing League games saved.</p>
                    )}
            </section>
        </div>
    );
}

export default UserWatlGames;
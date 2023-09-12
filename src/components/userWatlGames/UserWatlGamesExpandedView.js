import UserWatlGameExpandedView from "./UserWatlGameExpandedView";

const UserWatlGamesExpandedView = (props) => {
    const watlGames = props.watlGames;

    return (
        <ul className="watl-games-container">
            {watlGames.map(watlGame => {
                return (
                    <li className="watl-game-item">
                        <UserWatlGameExpandedView watlGame={watlGame} />
                    </li>
                );
            })}
        </ul>
    );
}
export default UserWatlGamesExpandedView;
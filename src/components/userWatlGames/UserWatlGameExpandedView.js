const UserWatlGameExpandedView = (props) => {
    const watlGame = props.watlGame;

    return (
        <>
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
        </>
    );
}

export default UserWatlGameExpandedView;
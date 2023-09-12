const UserWatlGameExpandedView = (props) => {
    const watlGame = props.watlGame;

    return (
        <>
            <div className="watl-game-header">
                <h3>{watlGame.name}</h3>
                <h4>Score: {watlGame.score}</h4>
            </div>
            <div>
                {watlGame.gameThrows.length ?
                    (watlGame.gameThrows.map(gameThrow => {
                        return (
                            <div className={"watl-game-throw" + gameThrow.className}>{gameThrow.shortName}</div>
                        );
                    })) : (<p>No game throws added</p>)
                }
            </div>
        </>
    );
}

export default UserWatlGameExpandedView;
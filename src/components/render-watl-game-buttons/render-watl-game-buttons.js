import { useParams } from "react-router-dom";
import useSelectedGameThrow from "../../hooks/useSelectedGameThrow";
import ScoreUserWatlGameButtons from "../userWatlGames/ScoreUserWatlGameButtons";
import UserWatlGameWarmupButtons from "../userWatlGames/UserWatlGameWarmupButtons";
import UserWatlGameInconsistencyButtons from "../userWatlGames/UserWatlGameInconsistencyButtons";
import UserWatlGamePotentialScoreButtons from "../userWatlGames/UserWatlGamePotentialScoreButtons";

const RenderWatlGameButtons = (props) => {
    const params = useParams();
    const { selectedGameThrow } = useSelectedGameThrow();

    const isOpen = selectedGameThrow?.id ||
        selectedGameThrow?.id === 0 ||
        selectedGameThrow?.type === "warmup-throw" ||
        props.gameThrowsCount < props.maxThrowCount;

    const getChildComponent = () => {
        switch (selectedGameThrow?.type) {
            case "game-throw": return (
                <ScoreUserWatlGameButtons
                    templateId={selectedGameThrow?.templateId}
                    watlGameId={params.id}
                    watlGameThrowId={selectedGameThrow?.id}
                    onSubmit={getData}
                />
            );
            case "warmup-throw": return (
                <UserWatlGameWarmupButtons
                    templateId={selectedGameThrow?.templateId}
                    watlGameId={params.id}
                    warmupThrowId={selectedGameThrow?.id}
                    onSubmit={getData}
                />
            );
            case "inconsistencies": return (
                <UserWatlGameInconsistencyButtons
                    watlGameId={params.id}
                    gameThrowId={selectedGameThrow?.id}
                    onSubmit={getData}
                />
            );
            case "potential-score": return (
                <UserWatlGamePotentialScoreButtons
                    templateId={selectedGameThrow?.templateId}
                    gameId={params.id}
                    gameThrowId={selectedGameThrow?.id}
                    onSubmit={getData}
                />
            );
            default: return (<></>);
        }
    }

    const getData = (watlGameInfo) => {
        props.onSubmit(watlGameInfo);
    }

    return (
        <div className={isOpen ? "popout popout-extended popout-open" : "popout popout-extended"}>
            {getChildComponent()}
        </div>
    )
}

export default RenderWatlGameButtons;
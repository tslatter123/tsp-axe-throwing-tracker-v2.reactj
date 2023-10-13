import useSelectedGameThrow from "../../hooks/useSelectedGameThrow";

const GameThrowEvaluationButtons = (props) => {
    const { selectedGameThrow, setSelectedGameThrow } = useSelectedGameThrow();

    const selectGameThrow = (id, type) => {
        setSelectedGameThrow(selectedGameThrow?.id === id && selectedGameThrow?.type === type ?
            {} : { id, type, "templateId": props.templateId });
    }

    return (
        <>
            <button onClick={() => selectGameThrow(props.id, "inconsistencies")}>Set inconsistencies</button>
            <button onClick={() => selectGameThrow(props.id, "potential-score")}>Set potential score</button>
        </>
    )
}

export default GameThrowEvaluationButtons;
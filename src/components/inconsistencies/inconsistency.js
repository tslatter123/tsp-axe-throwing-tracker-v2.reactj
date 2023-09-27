const Inconsistency = (props) => {
    return (
        <div key={props.inconsistency.id} className={"game-inconsistency " + props.inconsistency.className}></div>
    );
}

export default Inconsistency;
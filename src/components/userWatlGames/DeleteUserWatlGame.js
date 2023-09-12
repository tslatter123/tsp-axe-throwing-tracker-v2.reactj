import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const watlGameUrl = 'UserWatlGame';

const DeleteUserWatlGame = (props) => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getWatlGameInfo = async () => {
            try {
                const response = await axiosPrivate.get(watlGameUrl + "?id=" + props.id,
                    {
                        signal: controller.signal
                    });

                if (isMounted) {
                    setName(response.data.watlGameInfo.name);
                    setDate(response.data.watlGameInfo.dateStr);
                    setDescription(response.data.watlGameInfo.description);
                }
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No server response.");
                }
                else {
                    setErrorMsg(err.response.data.error);
                }
            }
        }

        getWatlGameInfo();
    }, [axiosPrivate, props.id])

    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.delete(watlGameUrl + "?id=" + props.id);

            props.onSubmit(response.data.watlGameInfoList);
        } catch (err) {
            if (!err?.response) {
                setErrorMsg("No server response.");
            }
            else {
                setErrorMsg(err.response.data.error);
            }
        }
    }

    return (
        <>
            <div className="popout-header">
                <h2>Delete WATL Game</h2>
            </div>
            <div className="popout-content">
                {errorMsg ? (
                    <p aria-live="assertive" className="error-msg">{errorMsg}</p>
                ) : (<></>)}
                <p> Are you sure you want to delete {name}?</p>
                <p>{date}</p>
                <p>{description}</p>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </>
    );
}

export default DeleteUserWatlGame;
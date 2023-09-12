import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const watlGameUrl = "UserWatlGame";

const EditUserWatlGame = (props) => {
    const nameRef = useRef();
    const dateRef = useRef();
    const descriptionRef = useRef();
    const errorMsgRef = useRef();

    const [id, setId] = useState(0);
    const [index, setIndex] = useState(0);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState("");
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
                    setId(response.data.watlGameInfo.id);
                    setIndex(response.data.watlGameInfo.index);
                    setName(response.data.watlGameInfo.name);
                    setDate(response.data.watlGameInfo.dateStr);
                    setDescription(response.data.watlGameInfo.description);
                    setUserId(response.data.watlGameInfo.userID);
                }
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No servre response.");
                }
                else {
                    setErrorMsg(err.response.data.error);
                }
            }
        }

        getWatlGameInfo();
    }, [axiosPrivate, props.id]);

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [name, date, description]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.put(
                watlGameUrl,
                {
                    "id": id,
                    "index": index,
                    "name": name,
                    "date": date,
                    "description": description,
                    "userID": userId
                });

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
                <h2>Edit WATL Game</h2>
            </div>
            <div className="popout-content">
                {errorMsg ? (
                    <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
                ) : (<></>)}
                <form id="editWatlGameForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            id="name"
                            type="text"
                            placeholder="WATL game name"
                            ref={nameRef}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            id="date"
                            type="date"
                            placeholder="WATL game date"
                            ref={dateRef}
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            id="description"
                            placeholder="Axe description"
                            ref={descriptionRef}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <div className="form-group">
                        <button id="saveBtn" type="submit">Save</button>
                    </div>
                    <input
                        id="id"
                        type="hidden"
                        value={id}
                        required
                    />
                    <input
                        id="index"
                        type="hidden"
                        value={index}
                        required
                    />
                    <input
                        id="userId"
                        type="hidden"
                        value={userId}
                        required
                    />
                </form>
            </div>
        </>
    )
}

export default EditUserWatlGame; 
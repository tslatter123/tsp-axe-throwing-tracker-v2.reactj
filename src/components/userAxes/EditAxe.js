import { useEffect, useRef, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const userAxeUrl = "UserAxe";

const EditAxe = (props) => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const errorMsgRef = useRef();

    const [id, setId] = useState(0);
    const [index, setIndex] = useState(0)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAxeInfo = async () => {
            try {
                const response = await axiosPrivate.get(userAxeUrl + "?id=" + props.id, {
                    signal: controller.signal
                });
                console.log(response.data);
                if (isMounted) {
                    setId(response.data.axeInfo.id);
                    setIndex(response.data.axeInfo.index);
                    setName(response.data.axeInfo.name);
                    setDescription(response.data.axeInfo.description);
                    setUserId(response.data.axeInfo.userID);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getAxeInfo();
    }, [axiosPrivate, props.id]);

    useEffect(() => {
        nameRef.current.focus();
        descriptionRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [name, description]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosPrivate.put(
                userAxeUrl,
                {
                    "id": id,
                    "index": index,
                    "name": name,
                    "description": description,
                    "userID": userId
                });

            window.location.reload();
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
        <div className="popout-content">
            <h2>Edit Axe</h2>
            <form id="editAxeForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        id="name"
                        type="text"
                        placeholder="Axe name"
                        ref={nameRef}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
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
                <p ref={errorMsgRef} aria-live="assertive">{errorMsg}</p>
                <div className="form-group">
                    <button id="saveBtn">Save</button>
                    {/* <button id="cancelBtn">Cancel</button> */}
                </div>
            </form>
        </div>
    );
}

export default EditAxe;
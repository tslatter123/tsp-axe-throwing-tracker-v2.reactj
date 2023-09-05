import { useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const userAxeUrl = "UserAxe";

const CreateAxe = () => {

    const nameRef = useRef();
    const descriptionRef = useRef();
    const errorMsgRef = useRef();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosPrivate.post(
                userAxeUrl,
                {
                    "name": name,
                    "description": description
                });

            window.location.reload();
        } catch (err) {
            if (!err?.response) {
                setErrorMsg("No server response.")
            }
            else {
                setErrorMsg(err.response.data.error);
            }
        }
    }

    return (
        <>
            <div className="popout-header">
                <h2>Add an Axe</h2>
            </div>
            <div className="popout-content">
                <form id="createAxeForm" onSubmit={handleSubmit}>
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
                    <p ref={errorMsgRef} aria-live="assertive">{errorMsg}</p>
                    <div className="form-group">
                        <button id="saveBtn">Add axe</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateAxe;
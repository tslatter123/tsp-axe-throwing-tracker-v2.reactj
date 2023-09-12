import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const watlGameTemplatesUrl = 'WatlGameTemplates';
const watlGameUrl = "UserWatlGame";

const AddUserWatlGame = () => {
    const nameRef = useRef();
    const dateRef = useRef();
    const descriptionRef = useRef();
    const templateIdRef = useRef();
    const errorMsgRef = useRef();

    const [watlGameTemplates, setWatlGameTemlplates] = useState([]);

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [templateId, setTemplateId] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getWatlTemplates = async () => {
            try {
                const response = await axiosPrivate.get(watlGameTemplatesUrl, {
                    signal: controller.signal
                });

                isMounted && setWatlGameTemlplates(response.data.templateInfoList);
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg('No server response.');
                }
                else {
                    setErrorMsg(err.response.data.error);
                }
                errorMsgRef.current.focus();
            }
        }

        getWatlTemplates();
    }, [axiosPrivate]);

    useEffect(() => {
        nameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [name, date, description, templateId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post(
                watlGameUrl,
                {
                    "name": name,
                    "date": date,
                    "description": description,
                    "templateID": templateId
                }
            );

            navigate('score-watl-game/' + response.data.watlGameId);
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
                <h2>Add a WATL Game</h2>
            </div>
            <div className="popout-content">
                {errorMsg ? (
                    <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
                ) : (<></>)}
                <form id="addWatlGameForm" onSubmit={handleSubmit}>
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
                            placeholder="WATL game description"
                            ref={descriptionRef}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <div className="form-group">
                        <select
                            id="templateId"
                            ref={templateIdRef}
                            onChange={(e) => setTemplateId(e.target.value)}
                            value={templateId}
                            required
                        >
                            <option value="">Select WATL game template...</option>
                            {watlGameTemplates.map(template => {
                                return (<option key={template.id} value={template.id}>{template.name}</option>);
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" id="saveBtn">Add WATL game</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddUserWatlGame;
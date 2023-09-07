import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const userAxeUrl = "UserAxe";

const DeleteAxe = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAxeInfo = async () => {
            try {
                const response = await axiosPrivate.get(userAxeUrl + "?id=" + props.id, {
                    signal: controller.signal
                });

                if (isMounted) {
                    setName(response.data.axeInfo.name);
                    setDescription(response.data.axeInfo.description);
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

        getAxeInfo();
    }, [axiosPrivate, props.id]);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete(userAxeUrl + "?id=" + props.id);

            props.onSubmit(response.data.axeInfoList);
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
                <h2>Delete Axe</h2>
            </div>
            <div className="popout-content">
                {errorMsg ? (
                    <p aria-live="assertive" className="error-msg">{errorMsg}</p>
                ) : (<></>)}
                <p> Are you sure you want to delete {name}?</p>
                <p>{description}</p>
                <button onClick={handleDelete}>Delete</button>
            </div >
        </>
    );
}

export default DeleteAxe;
import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const userAxeUrl = "UserAxe";

const DeleteAxe = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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
                    setName(response.data.axeInfo.name);
                    setDescription(response.data.axeInfo.description);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getAxeInfo();
    }, [axiosPrivate, props.id]);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await axiosPrivate.delete(userAxeUrl + "?id=" + props.id);

            window.location.reload();
        } catch (err) {
            if (!err?.response) {
                console.error("No server response.");
            }
            else {
                console.error(err.response);
            }
        }
    }

    return (
        <div className="popout popout-right">
            <h2>Are you sure you want to delete {name}?</h2>
            <p>{description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default DeleteAxe;
import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const inconsistencyUrl = "UserWatlGameThrowInconsistency";

const UserWatlGameInconsistencyButtons = (props) => {
    const errorMsgRef = useRef();

    const [inconsistencyOptions, setInconsistencyOptions] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getInconsistencies = async () => {
            try {
                const response = await axiosPrivate.get(inconsistencyUrl + "?gameId=" + props.watlGameId + "&gameThrowId=" + props.gameThrowId,
                    {
                        signal: controller.signal
                    });

                isMounted && setInconsistencyOptions(response.data.watlInconsistencyInfoList);
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No server response.");
                }
                else {
                    setErrorMsg(err.response.data.error);
                }
            }
        }

        getInconsistencies();
    }, [axiosPrivate, props.watlGameId, props.gameThrowId]);

    return (
        <div className="popout-content flex-row wrap-content">
            {inconsistencyOptions.map((inconsistencyOption) => {
                return (<button key={inconsistencyOption.id} className={inconsistencyOption.isPresent ? "game-inconsistency-btn " + inconsistencyOption.className : "game-inconsistency-btn"}>{inconsistencyOption.name}</button>);
            })}
        </div>
    )
}

export default UserWatlGameInconsistencyButtons;
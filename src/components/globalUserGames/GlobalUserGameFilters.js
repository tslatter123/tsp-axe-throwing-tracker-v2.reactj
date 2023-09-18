import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const userAxesUrl = 'UserAxes';

const GlobalUserGameFilters = (props) => {
    const errorMsgRef = useRef();

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [axeId, setAxeId] = useState('');
    const [userAxes, setUserAxes] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUserAxes = async () => {
            try {
                const response = await axiosPrivate.get(userAxesUrl, {
                    signal: controller.signal
                });

                isMounted && setUserAxes(response.data.axeInfoList);
            } catch (err) {
                if (!err?.response) {
                    setErrorMsg("No server response")
                }
                else {
                    setErrorMsg(err);
                }
            }
        };

        getUserAxes();
    }, [axiosPrivate]);

    const handleFilterDateFrom = async (date) => {
        setDateFrom(date);

        try {
            var result = await axiosPrivate.get(props.targetUrl + "?dateFrom=" + date + "&dateTo=" + dateTo + "&axeId=" + axeId);

            props.onSubmit(result.data.watlGameInfoList);
        } catch (err) {
            if (!err?.response) {
                setErrorMsg("No server response.");
            }
            else {
                setErrorMsg(err.responsee.data.error);
            }
        }
    }

    const handleFilterDateTo = async (date) => {
        setDateTo(date);

        try {
            var result = await axiosPrivate.get(props.targetUrl + "?dateFrom=" + dateFrom + "&dateTo=" + date + "&axeId=" + axeId);

            props.onSubmit(result.data.watlGameInfoList);
        } catch (err) {
            if (!err?.response) {
                setErrorMsg("No server response.");
            }
            else {
                setErrorMsg(err.responsee.data.error);
            }
        }
    }

    const handleFilterAxeId = async (id) => {
        setAxeId(id);

        try {
            var result = await axiosPrivate.get(props.targetUrl + "?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&axeId=" + id);

            props.onSubmit(result.data.watlGameInfoList);
        } catch (err) {
            if (!err?.response) {
                setErrorMsg("No server response.");
            }
            else {
                setErrorMsg(err.responsee.data.error);
            }
        }
    }

    return (
        <>
            {errorMsg ? (
                <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
            ) : (
                <div className="games-index-filters">
                    <label>Filters:</label>
                    <div className="games-index-filter-item">
                        <label>Date from:</label>
                        <input
                            id="date-from"
                            type="date"
                            value={dateFrom}
                            onChange={(e) => handleFilterDateFrom(e.target.value)}
                        />
                    </div>
                    <div className="games-index-filter-item">
                        <label>Date to:</label>
                        <input
                            id="date-to"
                            type="date"
                            value={dateTo}
                            onChange={(e) => handleFilterDateTo(e.target.value)}
                        />
                    </div>
                    {userAxes ? (
                        <div className="games-index-filter-item">
                            <label>Axe:</label>
                            <select
                                id="axe"
                                value={axeId}
                                onChange={(e) => handleFilterAxeId(e.target.value)}
                            >
                                <option value="">All axes...</option>
                                {userAxes.map(axe => {
                                    return (
                                        <option key={axe.id} value={axe.id} selected={axe.id === axeId}>{axe.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    ) : (<></>)}
                </div>
            )}
        </>
    )
}

export default GlobalUserGameFilters;
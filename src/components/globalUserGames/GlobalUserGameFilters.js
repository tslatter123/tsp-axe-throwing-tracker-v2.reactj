import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const userAxesUrl = 'UserAxes';
const GlobalUserGameFilters = (props) => {
    const errorMsgRef = useRef();

    const [dateFrom, setDateFrom] = useState(props.dateFrom && typeof props.dateFrom !== 'undefined' ? props.dateFrom : '');
    const [dateTo, setDateTo] = useState(props.dateTo && typeof props.dateTo !== 'undefined' ? props.dateTo : '');
    const [axeId, setAxeId] = useState(props.axeId && typeof props.axeId !== 'undefined' ? props.axeId : '');
    const [userAxes, setUserAxes] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

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

    const handleApplyFilters = () => {
        let path = window.location.pathname.split('?')[0];

        navigate(path + "?dateFrom=" + dateFrom + "&dateTo=" + dateTo + "&axeId=" + axeId);
    }

    return (
        <>
            {errorMsg ? (
                <p ref={errorMsgRef} aria-live="assertive" className="error-msg">{errorMsg}</p>
            ) : (
                <form className="games-index-filters">
                    <label>Filters:</label>
                    <div className="games-index-filter-item">
                        <label>Date from:</label>
                        <input
                            id="date-from"
                            type="date"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                    </div>
                    <div className="games-index-filter-item">
                        <label>Date to:</label>
                        <input
                            id="date-to"
                            type="date"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                    </div>
                    {userAxes ? (
                        <div className="games-index-filter-item">
                            <label>Axe:</label>
                            <select
                                id="axe"
                                value={axeId}
                                onChange={(e) => setAxeId(e.target.value)}
                            >
                                <option value="">Select an axe...</option>
                                {userAxes.map(axe => {
                                    return (
                                        <option key={axe.id} value={axe.id} selected={axe.id === axeId}>{axe.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    ) : (<></>)}
                    <div className="games-index-filter-submit">
                        <button
                            type="button"
                            onClick={handleApplyFilters}
                        >Apply filters</button>
                    </div>
                </form>
            )}
        </>
    )
}

export default GlobalUserGameFilters;
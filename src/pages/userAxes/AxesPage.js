import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EditAxe from "../../components/userAxes/EditAxe";
import CreateAxe from "../../components/userAxes/CreateAxe";
import DeleteAxe from "../../components/userAxes/DeleteAxe";

const userAxesUrl = 'UserAxes';

const UserAxes = () => {
    const [userAxes, setUserAxes] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const [editAxeId, setEditAxeId] = useState(0);
    const [createAxeOpen, setCreateAxeOpen] = useState(false);
    const [editAxeOpen, setEditAxeOpen] = useState(false);
    const [deleteAxeOpen, setDeleteAxeOpen] = useState(false);

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
                    console.error("No server response")
                }
                else {
                    console.error(err);
                }
            }
        };

        getUserAxes();
    }, [axiosPrivate]);

    const getData = (axeInfoList) => {
        setUserAxes(axeInfoList);

        setEditAxeId(null);
        setCreateAxeOpen(false);
        setEditAxeOpen(false);
        setDeleteAxeOpen(false);
    }

    const openCreateAxe = () => {
        setEditAxeId(null);
        setEditAxeOpen(false);
        setDeleteAxeOpen(false);
        setCreateAxeOpen(true);
    }

    const openCloseEditAxe = (axeId) => {
        setCreateAxeOpen(false);
        setDeleteAxeOpen(false);
        setEditAxeId(editAxeOpen ? null : axeId);
        setEditAxeOpen(!editAxeOpen);
    }

    const openCloseDeleteAxe = (e, axeId) => {
        e.stopPropagation();

        setCreateAxeOpen(false);
        setEditAxeOpen(false);
        setEditAxeId(editAxeOpen ? null : axeId);
        setDeleteAxeOpen(!deleteAxeOpen);
    }

    return (
        <>
            <div className="page-content">
                <section>
                    <h1>Your Saved Axes</h1>
                    <button onClick={openCreateAxe}>Add an axe</button>
                    {userAxes.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Index</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userAxes.map(item => {
                                    return (
                                        <tr id={item.id} key={item.id} onClick={() => openCloseEditAxe(item.id)}>
                                            <td>{item.id}</td>
                                            <td>{item.index}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td><button onClick={(e) => openCloseDeleteAxe(e, item.id)}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>) : (
                        <p>You don't have any axes saved.</p>
                    )}
                </section>
            </div>
            <div className={createAxeOpen || editAxeOpen || deleteAxeOpen ? "popout popout-open" : "popout"}>
                {createAxeOpen ? <CreateAxe onSubmit={getData} /> :
                    editAxeOpen ? <EditAxe id={editAxeId} onSubmit={getData} /> :
                        deleteAxeOpen && <DeleteAxe id={editAxeId} />}
            </div>
        </>
    )
}

export default UserAxes;
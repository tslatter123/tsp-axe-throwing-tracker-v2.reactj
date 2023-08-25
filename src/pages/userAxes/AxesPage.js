import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const userAxesUrl = 'UserAxes';

const UserAxes = () => {
    const axiosPrivate = useAxiosPrivate();

    var userAxes = [];

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUserAxes = async () => {
            try {
                const response = await axiosPrivate.get(userAxesUrl, {
                    signal: controller.signal
                });

                console.log(response.data);
                isMounted && (userAxes = response.data.axeInfoList);
            } catch (err) {
                console.error(err);
            }
        };

        getUserAxes();
    }, []);

    return (
        <section>
            <h1>Your Saved Axes</h1>
            {userAxes}
        </section>
    )
}

export default UserAxes;
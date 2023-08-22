import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const signOutUrl = 'UserLogOut';

const SignOutPage = () => {
    const controller = new AbortController();
    const axiosPrivate = useAxiosPrivate();
    const { setAuth } = useAuth();

    const signOutUser = async () => {
        try {
            await axiosPrivate.delete(signOutUrl, {
                signal: controller.signal
            });

            setAuth({});
        } catch (err) {
            console.error(err);
        }
    };

    signOutUser();

    return (
        <section>
            <p>You have successfully signed out.</p>
            <Link to='/'>Back to home</Link>
        </section>
    )
}

export default SignOutPage;
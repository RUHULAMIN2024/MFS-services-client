

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Login = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target;
        const phone = form.phone.value;
        const pin = form.pin.value;

        const userInfo = { phone, pin };
        console.log(userInfo)

        if (!pin || !phone) {
            return toast.error("please fillup all input field");
        }

        if (pin.length !== 5) {
            return toast.error("Invalid Credential");
        }

        const data = await axiosPublic.post('/login', userInfo)
        console.log(data?.data?.status)
        if (data?.data?.status === 200) {
            toast.success("Successfully Login");
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            // current user thakle token generate korbo

            const currentUser = JSON.parse(localStorage.getItem('userInfo'));
            console.log(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token)
                        }
                    })
            }


            return navigate("/")
        }
        else {
            return toast.error("Wrong Credentials");
        }


    }
    return (
        <div>
            <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
                <h1 className="text-3xl font-semibold tracking-tight">Login</h1>

                <form onSubmit={handleSubmit} className="space-y-6">


                    <div className="space-y-2 text-sm">
                        <label htmlFor="phone" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Phone or Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="phone"
                            placeholder="Enter Your Phone/Email"
                            name="phone"
                            type="text"

                        />
                    </div>

                    <div className="space-y-2 text-sm">
                        <label htmlFor="password" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Your PIN
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="pin"
                            placeholder="Enter New PIN"
                            name="pin"
                            type="number"

                        />
                        <div className="flex justify-end text-xs">
                            <a href="#" className="text-zinc-700 hover:underline dark:text-zinc-300">
                                Forget PIN?
                            </a>
                        </div>
                    </div>
                    <button className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">Login</button>
                </form>
                <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
                    Don&apos;t have an account?
                    <a href="/register" className="font-semibold underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;



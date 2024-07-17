import toast, { Toaster } from 'react-hot-toast';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target;
        const name = form.username.value;
        const role = form.role.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const pin = form.pin.value;

        const userInfo = { name, email, phone, pin, role, photo, status: "pending", balance: 0 };
        console.log(userInfo)

        if(!name || !pin || !role || !email || !phone){
            return toast.error("please fillup all input field");
        }

        if(pin.length !== 5){
            return toast.error("PIN Must be 5 digit");
        }

       const data = await axiosPublic.post('/users', userInfo)
       if(data.data.insertedId){
        toast.success("Successfully Registered");
        localStorage.setItem('userInfo', JSON.stringify(userInfo))


         const currentUser = JSON.parse(localStorage.getItem('userInfo'));
         console.log(currentUser)
         if(currentUser){
            const userInfo= {email: currentUser.email};
            axiosPublic.post("/jwt", userInfo)
            .then(res => {
                if(res.data.token){
                    localStorage.setItem("access-token", res.data.token)
                }
            })
        }
       


        return navigate("/")
       }
       else{
        return toast.error("This Email or Phone already have an exist");
       }
    }
    return (
        <div>
            <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
                <h1 className="text-3xl font-semibold tracking-tight">Register</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 text-sm">
                        <label htmlFor="username" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Username
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="username"
                            placeholder="Enter username"
                            name="username"
                            type="text"
                            
                        />
                    </div>

                    <select name="role" className="select select-bordered w-full max-w-xs">
                        <option value="user" selected>User</option>
                        <option value="agent">Agent</option>
                        <option value="admin">Admin</option>
                    </select>

                    <div className="space-y-2 text-sm">
                        <label htmlFor="phone" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Phone Number
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="phone"
                            placeholder="Enter Your Phone"
                            name="phone"
                            type="number"
                            
                        />
                    </div>
                    <div className="space-y-2 text-sm">
                        <label htmlFor="photo" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Profile Photo
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="photo"
                            placeholder="Profile Photo"
                            name="photo"
                            type="text"
                            
                        />
                    </div>
                    <div className="space-y-2 text-sm">
                        <label htmlFor="email" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            type="email"
                            
                        />
                    </div>
                    <div className="space-y-2 text-sm">
                        <label htmlFor="password" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Secrete PIN
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
                    <button className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">Register</button>
                </form>
                <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
                    Already&apos; have an account?
                    <a href="/login" className="font-semibold underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;



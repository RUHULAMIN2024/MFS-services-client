

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SendMoney = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { data:user } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${userInfo?.phone}`)
            return res.data;
        }
    })
console.log(user)

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault()
        const form = e.target;
        const phone = form.phone.value;
        const balance = form.amount.value;
        const pin = form.pin.value;

        const senderData = { phone, pin, balance, senderEmail: user?.email };
        console.log(senderData)

        if (!pin || !phone || !balance) {
            return toast.error("please fillup all input field");
        }

        if (pin.length !== 5) {
            return toast.error("Invalid Credential");
        }
        if (balance < 50) {
            return toast.error("Minimum send money 50 taka");
        }

           const data = await axiosPublic.post(`/sendmoney`, senderData)
           console.log(data?.data)
           if(data?.data?.status == 404){
            toast.error("Reciver Phone Number Not Found");
           
           }
           else{
            toast.success("Successfully Sendmoney");
           }
         

        
    }
    return (
        <div>
            <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 dark:border-zinc-700 dark:bg-zinc-900">
                <h1 className="text-3xl font-semibold tracking-tight">Send Money</h1>

                <form onSubmit={handleSubmit} className="space-y-6">


                    <div className="space-y-2 text-sm">
                        <label htmlFor="phone" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Sender Phone Number
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="phone"
                            placeholder="Enter Sender Phone Number"
                            name="phone"
                            type="number"

                        />
                    </div>

                    <div className="space-y-2 text-sm">
                        <label htmlFor="amount" className="block text-zinc-700 dark:text-zinc-300 font-medium">
                            Amount
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
                            id="amount"
                            placeholder="Enter Amount"
                            name="amount"
                            type="number"

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
                     
                    </div>
                    <button className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">Send Money</button>
                </form>
               
            </div>
        </div>
    );
};

export default SendMoney;



import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UserProfile = () => {
const axiosPublic = useAxiosPublic();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const { data:user } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${userInfo?.phone}`)
            return res.data;
        }
    })
console.log(user)
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="max-w-[350px] space-y-8 rounded-2xl bg-white px-6 py-8 shadow-md dark:bg-[#18181B] md:max-w-[350px]" >
                {/* profile image & bg  */}
                <div className="relative ">
                    <img width={350} height={150} className="h-[150px] w-[350px] rounded-2xl bg-gray-500" src="https://wallpapercave.com/wp/wp10007620.jpg" alt="card navigate ui" />
                    <img width={100} height={100} className="absolute -bottom-12 left-1/2 h-[100px] w-[100px] -translate-x-1/2 rounded-full border-4 border-white bg-gray-400 dark:border-[#18181B]" src={user?.photo || "https://tse2.mm.bing.net/th?id=OIP.NDsekgZCeB-BkRqXm88aNAHaHR&pid=Api&P=0&h=220"} alt="card navigate ui" />
                </div>
                {/* profile name & role */}
                <div className="space-y-1 pt-8 text-center">
                    <h1 className="text-xl md:text-2xl">{user?.name}</h1>
                    <p className="text-sm text-gray-400">Role: {user?.role}</p>
                    <p className="text-sm text-gray-400">Phone: {user?.phone}</p>
                    <p className="text-sm text-gray-400">Email: {user?.email}</p>
                    <p className="text-sm text-gray-400">Status: {user?.status}</p>
                </div>
                
                <div className="flex justify-center">
                    <button className="w-[80%] rounded-full py-2 font-medium text-gray-400 shadow-[0px_0px_10px_#E2DADA] duration-500  hover:scale-95 hover:bg-[#0095FF] hover:text-white hover:shadow-xl dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]">See More</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
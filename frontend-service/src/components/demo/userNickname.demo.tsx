import {useUserData} from "@/hooks/useUserData.ts";

const UserInfo = () => {
    const userId = Number(localStorage.getItem("userId"));
    const { user, loading } = useUserData(userId);
    if (loading) return <p>Loading user...</p>;
  return (
    <div className="bg-white shadow-lg w-80 max-w-sm p-6 rounded-xl flex justify-center items-center">
      <p className="text-lg font-semibold text-gray-800">
        Logged in as: <span className="text-primary">{user?.nickname}</span>
      </p>
    </div>
  );
};

export default UserInfo;

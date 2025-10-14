import { useLoaderData } from "react-router-dom";

const UserDetail = () => {
    const user = useLoaderData();
    console.log(user);
    return (
        <div>
            <p>User Name : {user.name}</p>
            <p>User Email : {user.email}</p>
        </div>
    );
};

export default UserDetail;
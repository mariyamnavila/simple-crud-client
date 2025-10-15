import { useLoaderData } from "react-router-dom";

const UpdateUser = () => {
    const user = useLoaderData();

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = { name, email }
        console.log(updatedUser);

        fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after update', data);
            })
    }

    return (
        <div>
            <div>
                <form onSubmit={handleUpdateUser}>
                    <input type="text" name="name" id="" defaultValue={user.name} /><br />
                    <input type="email" name="email" id="" defaultValue={user.email} /><br />
                    <input type="submit" value={'Update User'} name="" id="" />
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
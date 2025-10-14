import { use, useState } from "react";

const Users = ({ usersPromise }) => {
    const usersData = use(usersPromise)
    const [users, setUsers] = useState(usersData)

    const handleAddUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = { name, email }
        console.log(newUser);
        //create user in db
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('data after creating user in the db', data)
                if (data.insertedId) {
                    newUser._id = data.insertedId;
                    const newUsers = [...users, newUser];
                    console.log(data,'dta',newUsers);
                    setUsers(newUsers)
                    alert('user added')
                }
                // e.target.reset()
            })
    }
    return (
        <div>
            <div>
                <form onSubmit={handleAddUser}>
                    <input type="text" name="name" id="" /><br />
                    <input type="email" name="email" id="" /><br />
                    <input type="submit" value={'Add Value'} name="" id="" />
                </form>
            </div>
            {
                users.map(user=> <p key={user._id}>{user.name} : {user.email}</p>)
            }
        </div>
    );
};

export default Users;
import { use, useState } from "react";
import { Link } from "react-router-dom";

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
                    console.log(data, 'dta', newUsers);
                    setUsers(newUsers)
                    alert('user added')
                }
                // e.target.reset()
            })
    }

    const handleUserDelete = (id) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers)
                    console.log('after delete', data)
                }
            })
    }

    return (
        <div>
            <div>
                <h2>Users : {users.length}</h2>
                <form onSubmit={handleAddUser}>
                    <input type="text" name="name" id="" /><br />
                    <input type="email" name="email" id="" /><br />
                    <input type="submit" value={'Add Value'} name="" id="" />
                </form>
            </div>
            {
                users.map(user => <div style={{border : '2px solid #646cff',borderRadius: '14px', margin:'6px',padding:'10px'}}
                    key={user._id}>
                    {user.name} : {user.email} <br />
                    <Link to={`/users/${user._id}`}>Details</Link> <br />
                    <Link to={`/update/${user._id}`}>Edit</Link> <br />
                    <button onClick={() => handleUserDelete(user._id)}>X</button>
                </div>)
            }
        </div>
    );
};

export default Users;
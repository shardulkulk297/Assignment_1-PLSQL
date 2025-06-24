import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [addUser, setAddUser] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    useEffect(() => {

        const getUsers = async () => {

            try {
                const response = await axios.get("https://gorest.co.in/public/v2/users")
                console.log(response.data);
                setUsers(response.data);
            } catch (error) {
                console.log(error.message);
                toast.error("Something went wrong getching the users")
            }
        }
        getUsers();

    }, [])

    const handleDelete = async (userId) => {
        const token = "1a95423a657068aba778bbc19a466daa909297d5ddd26ab67ab99fe8dc701d73"
        try {
            await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
                headers: { 'Authorization': "Bearer " + token }
            })
            setUsers((u) => u.filter((us) => us.id !== userId));
            toast.success("User Deleted Successfully");

        } catch (error) {
            console.log(error);
        }

    }

    const handleUpdate = async (e, userId) => {
        e.preventDefault();
        const answer = window.confirm("Do you want to save the changes?");

        if (!answer) {
            return;
        }

        try {
            const token = "1a95423a657068aba778bbc19a466daa909297d5ddd26ab67ab99fe8dc701d73";

            await axios.put(`https://gorest.co.in/public/v2/users/${userId}`, {
                name: editingUser.name,
                email: editingUser.email,
                status: editingUser.status,
                gender: editingUser.gender
            }, {
                headers: { Authorization: "Bearer " + token }
            });


            setUsers(prev => prev.map
                (u => u.id === userId ? editingUser : u));
            setEditingUser(null);
            toast.success("User Updated Successfully");

        } catch (error) {
            console.log(error);
            toast.error("Failed to update user");
        }

    }

    const postUser = async (e) => {
        e.preventDefault();
        try {
            if (!name || !email || !gender || !status) {
                toast.error("Please fill all fields");
                return;
            }
            const token = "1a95423a657068aba778bbc19a466daa909297d5ddd26ab67ab99fe8dc701d73";
            const response = await axios.post("https://gorest.co.in/public/v2/users", {
                "name": name,
                "email": email + Date.now() + "@test.com",
                "gender": gender,
                "status": status
            }, {
                headers: { Authorization: "Bearer " + token }
            })
            console.log(response.data);
            toast.success("User Added Successfully!!")
        } catch (error) {
            console.log(error.message)
            toast.error("Error Adding User");

        }

    }



    return (
        <div className='container-fluid py-5 d-flex justify-content-center align-items-center'>

            <div className='row g-3 '>

                <h1>User List</h1>

                <div className='col-lg-12'>
                    <button className='btn btn-primary' onClick={() => setAddUser(prev => !prev)} >Add User</button>
                    <table className="table w-300">
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Status</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((u, index) => (
                                    <tr key={u.id}>
                                        <th scope="row">{u.id}</th>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.gender}</td>
                                        <td>{u.status}</td>
                                        <td><button onClick={() => handleDelete(u.id)} className='btn btn-danger'>Delete</button></td>
                                        <td><button className="btn btn-primary"
                                            onClick={() => {
                                                setEditingUser(u)
                                            }}
                                        >Update</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    {
                        editingUser ? (
                            <div className='container d-flex justify-content-center align-items-center'>

                                <form >
                                    <div className='card' style={{ width: '35rem' }}>
                                        <div className='card-header'>
                                            <h4>Edit User</h4>
                                        </div>
                                        <div className='card-body'>

                                            <div className='mb-3'>

                                                <label htmlFor="" className='form-label'>Enter Name:</label>
                                                <input type="text" className='form-control' value={editingUser.name} onChange={(e) => setEditingUser({
                                                    ...editingUser,
                                                    'name': e.target.value
                                                })} />

                                            </div>
                                            <div className='mb-3'>
                                                <label htmlFor="" className='form-label'>Enter Email</label>
                                                <input type="text" className='form-control' value={editingUser.email} onChange={(e) => setEditingUser({
                                                    ...editingUser,
                                                    'email': e.target.value
                                                })} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="status" className="form-label">
                                                    Status
                                                </label>
                                                <select
                                                    id="status"
                                                    className="form-control"
                                                    value={editingUser.status}
                                                    onChange={(e) => setEditingUser({
                                                        ...editingUser,
                                                        'status': e.target.value
                                                    })}

                                                >
                                                    <option value="">— Select status —</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="gender" className="form-label">
                                                    Gender
                                                </label>
                                                <select
                                                    id="gender"
                                                    className="form-control"
                                                    value={editingUser.gender}
                                                    onChange={(e) => setEditingUser({
                                                        ...editingUser,
                                                        'gender': e.target.value
                                                    })}

                                                >
                                                    <option value="">— Select gender —</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                            <div className='m-5 justify-content-center'>
                                                <button type='button' onClick={(e) => handleUpdate(e, editingUser.id)} className='btn btn-primary' >Update</button>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        ) : ""
                    }

                    {
                        addUser ? (
                            <div className='container d-flex justify-content-center align-items-center'>

                                <form >
                                    <div className='card' style={{ width: '35rem' }}>
                                        <div className='card-header'>
                                            <h4>Add User</h4>
                                        </div>
                                        <div className='card-body'>

                                            <div className='mb-3'>

                                                <label htmlFor="" className='form-label'>Enter Name:</label>
                                                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} required
                                                    value={name} />

                                            </div>
                                            <div className='mb-3'>
                                                <label htmlFor="" className='form-label'>Enter Email</label>
                                                <input type="text" className='form-control' onChange={(e) => setEmail(e.target.value)} required
                                                    value={email} />

                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="status" className="form-label">
                                                    Status
                                                </label>
                                                <select
                                                    id="status"
                                                    className="form-control"
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    value={status}
                                                    required
                                                >
                                                    <option value="">— Select status —</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="gender" className="form-label">
                                                    Gender
                                                </label>
                                                <select
                                                    id="gender"
                                                    className="form-control"
                                                    required
                                                    onChange={(e) => setGender(e.target.value)}
                                                    value={gender}

                                                >
                                                    <option value="">— Select gender —</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                            <div className='m-5 justify-content-center'>
                                                <button type='button' onClick={(e) => postUser(e)} className='btn btn-primary' >Add User</button>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                            </div>

                        ) : ""
                    }


                </div>

            </div>


        </div>
    )
}

export default UserList
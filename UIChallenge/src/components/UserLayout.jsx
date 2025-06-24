import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const UserLayout = () => {
    const navigate = useNavigate();
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand"><strong>User Management Portal</strong></span>
                    <div className="d-flex ms-auto">
                        <button onClick={()=> navigate("/add-user")} className="btn btn-primary" type="button">Add User</button>
                    </div>
                </div>
            </nav>

            <Outlet />

        </div>
    )
}

export default UserLayout
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const UserLayout = () => {
    const navigate = useNavigate();
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand text-center"><strong>User Management Portal</strong></span>
                </div>
            </nav>

            <Outlet />

        </div>
    )
}

export default UserLayout
import React, { useContext } from "react";
import { withRouter, NavLink } from 'react-router-dom'
import { FirebaseContext } from '../firebase'

function Header() {
  const { user, firebase } = useContext(FirebaseContext)
  return (
    <div className="header">
      <div className="flex">
        <img src="/logo.png" alt="Hooks News Logo" className="logo" />
        <NavLink to="/" className="header-title">Hooks News</NavLink>
        <NavLink to="/" className="header-link">New</NavLink>
        <div className="divider">|</div>
        <NavLink to="/top" className="header-link">Top</NavLink>
        <div className="divider">|</div>
        <NavLink to="/search" className="header-link">Search</NavLink>
        <div className="divider">|</div>
        <NavLink to="/create" className="header-link">Submit</NavLink>
      </div>
      <div className="flex">
        {!user ? <NavLink to="/login" className="header-link">Login</NavLink> : (
          <>
            <span className="header-name">{user.displayName}</span>
            <span className="divider">|</span>
            <span className="header-button">Logout</span>
          </>
        )}
      </div>
    </div>
  )
}

export default withRouter(Header)

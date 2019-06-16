import React, { useContext } from "react";
import { withRouter, NavLink } from 'react-router-dom'
import { FirebaseContext } from '../firebase'

function Header() {
  const { user, firebase } = useContext(FirebaseContext)
  return (
    <div className="header">
      <div className="left">
        <ul className="flex" style={{listStyle: 'none', marginLeft: '18px', paddingLeft: 0}}>
          <img src="/logo.png" alt="Hooks News Logo" className="logo" />
          <li><NavLink to="/" className="header-title">Hooks News</NavLink></li>
          <li><NavLink to="/" className="header-link">New</NavLink></li>
          <li className="divider">|</li>
          <li><NavLink to="/top" className="header-link">Top</NavLink></li>
          <li><div className="divider">|</div></li>
          <li><NavLink to="/search" className="header-link">Search</NavLink></li>
          <li><div className="divider">|</div></li>
          <li><NavLink to="/create" className="header-link">Submit</NavLink></li>
        </ul>
      </div>
      
      <div className="right">
        <ul className="flex" style={{listStyle: 'none', marginRight: '18px'}}>
          {!user ? <li><NavLink to="/login" className="header-link">Login</NavLink></li> : (
            <>
            <li className="header-name">{user.displayName}</li>
            <li className="divider">|</li>
            <li className="header-button" onClick={() => firebase.logout()}>Logout</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)

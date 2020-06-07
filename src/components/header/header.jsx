import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { logout } from '../../core/api/users.api';
import { useState } from 'react';

const logoutStyle = {
  cursor: 'pointer'
};

const backgroundNav = {
  background: '#1E5631'
};

export const Header = withRouter((props) => {

  console.log('Header props+>', props)

  const [isLoggedOut, setLogoutFlag] = useState(false);
  const [searchParam, setSearchParam] = useState('');

  const onLogout = (event) => {
    logout();
    setLogoutFlag(true);
  }

  const onSearchChange = (event) => {
    event.persist();
    setSearchParam(event.target.value);

  }

  const onSearchClick = (event) => {

    event.preventDefault(); //za da ne se izpulnqwa native operaciqta

    const pathNameUrl = props.location.pathname.substr(1);

    const historyObj = { pathname: `/${pathNameUrl}` };
    if(searchParam) {
      historyObj['search'] = `?q=${searchParam}`;
    }

    props.history.push(historyObj);

  }

    return(
      <>

      { isLoggedOut && <Redirect to="/login" /> }

      <nav class="navbar navbar-expand-lg navbar-dark" style={backgroundNav}>
        
      <a class="navbar-brand mb-0 h1" href="#">
      <img src="https://icons.iconarchive.com/icons/alex-t/splash-of-fruit/512/button-lemon-icon.png" width="30" height="30" class="d-inline-block align-top mr-3" alt=""></img>
        User Manager
        </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link to="/" class="nav-link">Home</Link>
          </li>
          <li class="nav-item">
          <Link to="/users" class="nav-link">Users</Link>
          </li>
          <li class="nav-item">
          <Link to="/users/create" class="nav-link">Create User</Link>
          </li>
          <li class="nav-item">
          <Link to="/tasks" class="nav-link">All Tasks</Link>
          </li>
          <li class="nav-item">
          <Link to="/tasks/my-tasks" class="nav-link">My tasks</Link>
          </li>
          <li class="nav-item">
          <Link to="/tasks/create" class="nav-link">Create task</Link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>

        
        <form class="form-inline my-2 my-lg-0" onSubmit={onSearchClick}>
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearchChange}></input>
          <button class="btn btn-danger my-2 my-sm-0" type="submit">Search</button>
        </form>
        
        <span className="btn logout-btn btn-info ml-2" style={logoutStyle} onClick={onLogout}>Logout</span>
      </div>
    </nav>

    </>
    );
})
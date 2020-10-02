import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Budget Application</h1>
        <NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink>
        <br />
        <NavLink to='/create' activeClassName='is-active'>Create Expense</NavLink>
        <br />
    </header>
);

export default Header;



// <NavLink to='/help' activeClassName='is-active'>Help Page</NavLink>
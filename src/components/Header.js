import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = ({startLogout}) => (
    <header>
        <h1>Budget Application</h1>
        <NavLink to='/dashboard' activeClassName='is-active' exact={true}>Home</NavLink>
        <br />
        <NavLink to='/create' activeClassName='is-active'>Create Expense</NavLink>
        <br />
        <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) =>({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);



// <NavLink to='/help' activeClassName='is-active'>Help Page</NavLink>
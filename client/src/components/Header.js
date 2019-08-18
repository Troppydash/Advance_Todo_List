import React , { Component } from 'react';

const Header = ( {state} ) => (
    <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <span>
                { state.isFetching ? "yes" : "no" }
                { state.alreadyRefreshed ? "yes" : "no"}
                { JSON.stringify(state.weekTwoData) }
            </span>
        </div>
    </div>
);

export default Header;

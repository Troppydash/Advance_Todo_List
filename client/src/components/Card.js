import React from 'react';

// Passed Props:
// value: ["Khan"], index: 2, onChange = Func
const Card = ( { value , index , onChange } ) => (
    <div className="card Card-Container">
        <div className="card-body">
            <input value={ value } onChange={ onChange } id={ index } className="Card-Input"/>
        </div>
    </div>
);



export default Card;

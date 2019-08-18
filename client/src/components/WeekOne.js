import React from 'react';
import Reorder from 'react-reorder';
import Card from "./Card";

// Passed Props:
// Keys: ["Monday", "Tuesday"], Values: ["Khan", "Sleep"], onReorder: Func, onChange: Func
const WeekOne = ( { keys , values , onReorder , onChange } ) => (
    <div style={ { width: "1500px" } } className="bg-light">
        THIS WEEK
        <table className="table" style={ { tableLayout: "fixed" } }>
            <thead>
            <tr className="text-center">
                {
                    keys.map((item, index) => {
                        return <th key={ item } className={getDate(index)}>{ item }</th>
                    })
                }
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colSpan={ keys.length } className="px-0">
                    <Reorder
                        colSpan="10"
                        reorderId="weekOne" // Unique ID that is used internally to track this list (required)
                        reorderGroup="weekOneGroup" // A group ID that allows items to be dragged between lists of the same group (optional)
                        component="div" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
                        draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
                        onReorder={ onReorder } // Callback when an item is dropped (you will need this to update your state)
                        autoScroll={ true } // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
                        disabled={ false } // Disable reordering (optional), defaults to false
                        disableContextMenus={ true } // Disable context menus when holding on touch devices (optional), defaults to true
                    >

                        {
                            values.map(( value , index ) => (
                                <div style={ { width: [100 / values.length + "%"] , display: "inline-block" } }
                                     className="px-2" key={ index }>
                                    <Card value={ value } index={ index } onChange={ onChange } />
                                </div>
                            ))
                        }

                    </Reorder>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
);

function getDate(i) {
    let d = new Date();
    d = d.getDay() - 1;
    if (d === -1) {
        d = 6;
    }

    return i == d ? "Today" : "";
}

export default WeekOne;

import React , { Component } from 'react';
import Header from "../components/Header";
import WeekOne from "../components/WeekOne";
import WeekTwo from "../components/WeekTwo";

import Reorder , {
    reorder
} from 'react-reorder';


class Root extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            isFetching: false ,
            weekOneData: {},
            weekOneDataKeys: [] ,
            weekOneDataValues: [] ,
            weekTwoData: {} ,
            weekTwoDataKeys: [] ,
            weekTwoDataValues: [] ,
            error: '' ,
            alreadyRefreshed: false
        };
        this.onReorderWeekOne = this.onReorderWeekOne.bind(this);
        this.handleChangeWeekOne = this.handleChangeWeekOne.bind(this);
        this.onReorderWeekTwo = this.onReorderWeekTwo.bind(this);
        this.handleChangeWeekTwo = this.handleChangeWeekTwo.bind(this);
    }

    componentWillMount() {
        // Api Fetching
        this.getWeekOneData();
    }

    shouldRefresh( data ) {
        const oldDate = new Date(data.Date);
        const newDate = new Date();

        const days_Passed = (newDate.getTime() - oldDate.getTime()) / 1000 / 3600 / 24;
        const is_monday = newDate.getDay() === 1;

        if (days_Passed >= 7) {
            return true;
        } else return is_monday && days_Passed > 1;
    }

    refresh() {
        fetch(`http://localhost:8080/deleteDatabase`, {
            method: "Delete"
        })
            .then(res => {
                this.setState({
                    alreadyRefreshed: true
                }, () => {
                    this.getWeekOneData();
                });
            })
    }

    getWeekOneData() {
        // Get Week Data
        fetch(`http://localhost:8080/weekOne`)
            .then(res => res.json())
            .then(weekData => {
                const { weekOneData, weekTwoData } = weekData;

                if (this.shouldRefresh(weekOneData[0]) && !this.state.alreadyRefreshed) {
                    this.refresh();
                } else {
                    this.setState({
                        weekOneData: weekOneData[0],
                        weekTwoData: weekTwoData[0],
                        alreadyRefreshed: false
                    }, () => {
                        this.splitObjectData();
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    // weekOneData, weekOne
    splitObjectData(  ) {
        // Splite Object into Two Arrays
        const { weekOneData, weekTwoData } = this.state;
        this.setState({
            weekOneDataKeys: Object.keys(weekOneData).filter(d => d !== "_id") ,
            weekOneDataValues: Object.values(weekOneData).filter(d => d !== weekOneData._id) ,
            weekTwoDataKeys: Object.keys(weekTwoData).filter(d => d !== "_id") ,
            weekTwoDataValues: Object.values(weekTwoData).filter(d => d !== weekTwoData._id)
        })
    }

    combineArrayDataWeekOne() {
        // Combine Two Arrays into Object
        const { weekOneDataKeys , weekOneDataValues , weekOneData } = this.state;

        const newObj = {};
        weekOneDataKeys.forEach(( key , index ) => {
            newObj[key] = weekOneDataValues[index];
        });
        newObj["_id"] = weekOneData._id;
        this.setState({
            weekOneData: newObj
        });
    }

    combineArrayDataWeekTwo() {
        // Combine Two Arrays into Object
        const { weekTwoDataKeys , weekTwoDataValues , weekTwoData } = this.state;

        const newObj = {};
        weekTwoDataKeys.forEach(( key , index ) => {
            newObj[key] = weekTwoDataValues[index];
        });
        newObj["_id"] = weekTwoData._id;
        this.setState({
            weekTwoData: newObj
        });
    }

    saveWeekOneData() {
        // Post Data
        fetch(`http://localhost:8080/weekOne/save` ,
            {
                headers: {
                    'Accept': 'application/json' ,
                    'Content-Type': 'application/json'
                } ,
                method: "POST" ,
                body: JSON.stringify(this.state.weekOneData)
            })
    }

    saveWeekTwoData() {
        // Post Data
        fetch(`http://localhost:8080/weekTwo/save` ,
            {
                headers: {
                    'Accept': 'application/json' ,
                    'Content-Type': 'application/json'
                } ,
                method: "POST" ,
                body: JSON.stringify(this.state.weekTwoData)
            })
    }

    onReorderWeekOne( event , previousIndex , nextIndex , fromId , toId ) {
        // Rearrange
        this.setState({
            weekOneDataValues: reorder(this.state.weekOneDataValues , previousIndex , nextIndex)
        } , async () => {
            // Combine Two Arrays into Object
            await this.combineArrayDataWeekOne();
            await this.saveWeekOneData();
        });
    }

    onReorderWeekTwo( event , previousIndex , nextIndex , fromId , toId ) {
        // Rearrange
        this.setState({
            weekTwoDataValues: reorder(this.state.weekTwoDataValues , previousIndex , nextIndex)
        } , async () => {
            // Combine Two Arrays into Object
            await this.combineArrayDataWeekTwo();
            await this.saveWeekTwoData();
        });
    }

    handleChangeWeekOne( e ) {
        // Get input id and Value
        const inputValue = e.currentTarget.value;
        const id = e.currentTarget.id;

        // Modify Value Array
        let currentValue = [...this.state.weekOneDataValues];
        currentValue[id] = inputValue;

        this.setState({
            weekOneDataValues: currentValue
        }, async () => {
            await this.combineArrayDataWeekOne();
            await this.saveWeekOneData();
        });
    }

    handleChangeWeekTwo( e ) {
        // Get input id and Value
        const inputValue = e.currentTarget.value;
        const id = e.currentTarget.id;

        // Modify Value Array
        let currentValue = [...this.state.weekTwoDataValues];
        currentValue[id] = inputValue;

        this.setState({
            weekTwoDataValues: currentValue
        }, async () => {
            await this.combineArrayDataWeekTwo();
            await this.saveWeekTwoData();
        });
    }

    render() {
        let { weekOneDataKeys , weekOneDataValues, weekTwoDataKeys, weekTwoDataValues } = this.state;
        return (
            <div>
                <Header state={this.state}/>
                <div className="d-flex justify-content-center">
                    <WeekOne keys={ weekOneDataKeys ? weekOneDataKeys : [] }
                             values={ weekOneDataValues ? weekOneDataValues : [] }
                             onReorder={ this.onReorderWeekOne }
                             onChange={ this.handleChangeWeekOne } />
                </div>
                <div className="d-flex justify-content-center">
                    <WeekTwo keys={ weekTwoDataKeys ? weekTwoDataKeys : [] }
                             values={ weekTwoDataValues ? weekTwoDataValues : [] }
                             onReorder={ this.onReorderWeekTwo }
                             onChange={ this.handleChangeWeekTwo } />
                </div>

            </div>
        );
    }
}

export default Root;

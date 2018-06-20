import React from 'react';
import axios from 'axios';

class School extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            schools: []
        }
    }
    
    componentDidMount() {
        axios.get("http://ffrkapi.azurewebsites.net/api/v1.0/TypeLists/SchoolType")
        .then((result) => {
            this.setState({
                schools: result.data
            });
        });
    }

    render(){
        const { schools } = this.state;
        const { findSchool } = this.props;
        let correspondSchool = returnElement(schools, findSchool);
        return (
        <div>
            { correspondSchool }
        </div>
        );
    }
};

function returnElement(schoolArray, schoolID){
    for(let i = 0; i < schoolArray.length; i++){
        if(schoolArray[i].key === schoolID){
            return schoolArray[i].value
        }
    }
}

export default School
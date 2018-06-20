import React from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

class Element extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            elements: [{
                key: '',
                value: ''
            }]
        }
    }
    
    componentDidMount() {
        axios.get("http://ffrkapi.azurewebsites.net/api/v1.0/TypeLists/ElementType")
        .then((result) => {
            this.setState({
                loading: false,
                elements: result.data
            });
        });
    }
    
    returnElement(elementArray, elementID){
        for(let i = 0; i < elementArray.length; i++){
            if(elementArray[i].key == elementID){
                return elementArray[i].value
            }
        }
    }

    render(){
        const { elements } = this.state;
        const { findElement } = this.props;
        let correspondElement = this.returnElement(elements, findElement);
        return (
        <div>
            <BeatLoader
                size={10}
                color={'#123abc'} 
                loading={this.state.loading} />
            { correspondElement }
        </div>
        );
    }
};

export default Element
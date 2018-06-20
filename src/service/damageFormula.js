import React from 'react';
import axios from 'axios';

class DamageFormula extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            damageFormula: []
        }
    }
    
    componentDidMount() {
        axios.get("http://ffrkapi.azurewebsites.net/api/v1.0/TypeLists/DamageFormulaType")
        .then((result) => {
            this.setState({
                damageFormula: result.data
            });
        });
    }

    render(){
        const { damageFormula } = this.state;
        const { findDamageFormula } = this.props;
        let correspondDamageFormula = returnDamageFormula(damageFormula, findDamageFormula);
        return (
        <div>
            { correspondDamageFormula }
        </div>
        );
    }
};

function returnDamageFormula(dFArray, dFID){
    for(let i = 0; i < dFArray.length; i++){
        if(dFArray[i].key == dFID){
            return dFArray[i].value
        }
    }
}

export default DamageFormula
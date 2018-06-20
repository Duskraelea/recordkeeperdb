import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

class Ability extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            elements: [],
            schools: [],
            damageFormula: []
        };
    }

    componentDidMount() {
        Promise.all([
            axios.get("http://ffrkapi.azurewebsites.net/api/v1.0/Abilities"),
            axios.get("http://ffrkapi.azurewebsites.net/api/v1.0/TypeLists/ElementType"),
            axios.get("http://ffrkapi.azurewebsites.net/api/v1.0/TypeLists/SchoolType"),
            axios.get("http://ffrkapi.azurewebsites.net/api/v1.0/TypeLists/DamageFormulaType")
        ]).then(([abi, ele, sch, dmg]) => {
            this.setState({
                items: abi.data,
                elements: ele.data,
                schools: sch.data,
                damageFormula: dmg.data
            });
        });
    }

    fetchElement(elementData, elementId){
        if(elementId.length === 1){
            for(let i = 0; i < elementData.length; i++){
                if(elementData[i].key == elementId){
                    return elementData[i].value
                }
            }
        } else if (elementId.length === 2){
            let element1 = elementId[0],
                element2 = elementId[1],
                returnElem1, returnElem2;

            for(let i = 0; i < elementData.length; i++){
                if(elementData[i].key === element1){
                    returnElem1 = elementData[i].value
                } else if (elementData[i].key === element2){
                    returnElem2 = elementData[i].value
                }
            }

            return returnElem1 + " / " + returnElem2;
        } else if (elementId.length === 0){
            return "-"
        } else if (elementId.length === 3){
            let element1 = elementId[0],
                element2 = elementId[1],
                element3 = elementId[2],
                returnElem1, returnElem2, returnElem3;

            for(let i = 0; i < elementData.length; i++){
                if(elementData[i].key === element1){
                    returnElem1 = elementData[i].value
                } else if (elementData[i].key === element2){
                    returnElem2 = elementData[i].value
                } else if (elementData[i].key === element3){
                    returnElem3 = elementData[i].value
                }
            }
            return returnElem1 + " / " + returnElem2 + " / " + returnElem3;
        }
    }

    fetchSchool(schoolData, schoolId){
        for(let i = 0; i < schoolData.length; i++){
            if(schoolData[i].key === schoolId){
                return schoolData[i].value
            }
        }
    }

    fetchDamageFormula(dmgFormData, dmgFormId){
        for(let i = 0; i < dmgFormData.length; i++){
            if(dmgFormData[i].key === dmgFormId){
                return dmgFormData[i].value
            }
        }
    }
    
    render(){
        const { items } = this.state;
        const columns = [
            {
                title: 'Image',
                dataIndex: 'imagePath',
                render: (imagePath) => {
                    return <img className="abilityImage" src={imagePath} alt={items.abilityName} />;
                },
                key: 'imagePath'
            },
            {
                title: 'Name',
                dataIndex: 'abilityName',
                key: 'abilityName'
            },
            {
                title: 'Japanese Name',
                dataIndex: 'japaneseName',
                key: 'japaneseName'
            },
            {
                title: 'Effect',
                dataIndex: 'effects',
                key: 'effects'
            },
            {
                title: 'Cast Time',
                dataIndex: 'castTime',
                key: 'castTime'
            },
            {
                title: 'Multiplier',
                dataIndex: 'multiplier',
                key: 'multiplier'
            },
            {
                title: 'School',
                dataIndex: 'school',
                render: (school) => {
                    let sch = this.fetchSchool(this.state.schools, school)
                    return  `${sch}`;
                },
                key: 'school'
            },
            {
                title: 'Damage Formula',
                dataIndex: 'damageFormulaType',
                render: (df) => {
                    let dmg = this.fetchDamageFormula(this.state.damageFormula, df)
                    return  `${dmg}`;
                },
                key: 'damageFormula'
            },
            {
                title: 'Element',
                dataIndex: 'elements',
                render: (element) => {
                    let elem = this.fetchElement(this.state.elements, element)
                    return `${elem}`;
                },
                key: 'elements'
            }
        ];

        return (
            <div>
                <Table dataSource={items} columns={columns} rowKey={item => item.id} pagination={{ pageSize: 100 }}/>
            </div>
        );
    }
}

export default Ability;
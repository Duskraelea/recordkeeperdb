import React from 'react';
import { Table, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';


const pagination = { position: 'bottom' };

class Character extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            loading: true,
            pagination
        };
    }

    componentDidMount() {
        Promise.all([
            axios.get("http://ffrkapi.azurewebsites.net/api/v1.0/Characters/192")
        ]).then(([chr]) => {
            this.setState({
                items: chr.data,
                loading: false,
                pagination: false
            });
        });
    }
    
    render(){
        const { items, loading } = this.state;
        const stat = items.map(chr => chr.StatsByLevelInfos);
        console.log(stat[0])
        const statColumn = [{
            title: 'Level',
            dataIndex: 'Level',
            key: 'level'
        }, {
            title: 'HP',
            dataIndex: 'HitPoints',
            key: 'hp'
        }, {
            title: 'Attack',
            dataIndex: 'Attack',
            key: 'atk'
        }, {
            title: 'Defense',
            dataIndex: 'Defense',
            key: 'def'
        }, {
            title: 'Magic',
            dataIndex: 'Magic',
            key: 'mag'
        }, {
            title: 'Resistance',
            dataIndex: 'Resistance',
            key: 'res'
        }, {
            title: 'Mind',
            dataIndex: 'Mind',
            key: 'mnd'
        }, {
            title: 'Accuracy',
            dataIndex: 'Accuracy',
            key: 'acc'
        }, {
            title: 'Evasion',
            dataIndex: 'Evasion',
            key: 'eva'
        }, {
            title: 'Speed',
            dataIndex: 'Speed',
            key: 'spd'
        }];
        
        if(loading == true){
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }

        return (
            <div>
                <h1>{items.map(chr => chr.CharacterName)}</h1>

                <h2 align="left">Stats</h2>
                <Row gutter={16}>
                    <Col span={12}><Table {...this.state} dataSource={stat[0]} columns={statColumn} rowKey={item => item.Level} size="small" /></Col>
                </Row>
                

                <br/><br/>
                <h2 align="left">Soul Breaks</h2>
            </div>
        );
    }
}

export default Character;
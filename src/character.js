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
            axios.get("http://ffrkapi.azurewebsites.net/api/v1.0/Characters/74")
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
        const stat = items.map(item => item.StatsByLevelInfos);
        const relic = items.map(item => item.Relics);

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

        const soulBreak = relic[0].map(sb => sb.SoulBreak);
        const soulBreakColumn = [{
            title: 'Image',
            dataIndex: 'ImagePath',
            render: (ImagePath) => {
                let correctUrl = ImagePath.slice(0, ImagePath.indexOf('\"'));

                return <img className="abilityImage" src={correctUrl} alt={soulBreak.SoulBreakName} />;
            },
            key: 'imagePath'
        }, {
            title: 'Soul Break Name',
            dataIndex: 'SoulBreakName',
            key: 'SoulBreakName'
        }, {
            title: 'Japanese Name',
            dataIndex: 'JapaneseName',
            key: 'JapaneseName'
        }, {
            title: 'Effects',
            dataIndex: 'Effects',
            key: 'Effects'
        }, {
            title: 'Multiplier',
            dataIndex: 'Multiplier',
            key: 'Multiplier'
        }];

        // function to clean[delete] data from array
        Array.prototype.clean = function(deleteValue) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == deleteValue) {         
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        };

        // Clean null data from soul break array, since some relic contains Legend Materia data so it is normal that SB should be null
        soulBreak.clean(null)

        return (
            <div>
                <h1>{items.map(chr => chr.CharacterName)}</h1>

                <h2 align="left">Stats</h2>
                <Row gutter={16}>
                    <Col span={12}><Table {...this.state} dataSource={stat[0]} columns={statColumn} rowKey={item => item.Level} size="small" /></Col>
                </Row>
                <br/><br/>
                <h2 align="left">Soul Breaks</h2>
                <Row gutter={16}>
                    <Table {...this.state} dataSource={soulBreak} columns={soulBreakColumn} size="small"/>
                </Row>
            </div>
        );
    }
}

export default Character;
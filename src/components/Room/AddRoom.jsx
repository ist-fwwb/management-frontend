/**
 * Created by 励颖 on 2019/1/16.
 */

import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/es/TextField/TextField";


const allDevices=["AIRCONDITIONER", ]


class AddRoom extends React.Component {
  constructor(props){
    super(props);
    this.state={
        capacity: 5,
        location: "",
        AirConditioner: false,
        BlockBoard: false,
        Table: false,
        Projector: false,
        PowerSupply: false,
        devices:[]
    }
  }


  handleCapacityChange = (e) =>{
    this.setState ({
      capacity: e.target.value
    });
  };

  handleDeviceChange = name => event => {
    this.setState({
        [name]:event.target.checked,
        devices:[]
    },()=>{
    if(this.state.AirConditioner)
        this.state.devices.push("AIRCONDITIONER");
      if(this.state.BlockBoard)
          this.state.devices.push("BLOCKBOARD");
      if(this.state.Table)
          this.state.devices.push("TABLE");
      if(this.state.Projector)
          this.state.devices.push("PROJECTOR");
      if(this.state.PowerSupply)
          this.state.devices.push("POWERSUPPLY");
      for (let i =0; i< this.state.devices.length;i++)
        console.log(this.state.devices[i]);
  })
  };

  render() {
    const {classes} = this.props;
    return (
      <GridContainer xs={20} sm={20} md={12}>
        <GridItem classxs={20} sm={20} md={12}>
          <span style={{ marginLeft: "35%", fontSize: "20px", lineHeight:"100px" }}>房间号：</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField placeholder= "请输入房间号" variant="outlined" style={{width:"20%", fontSize: "20px", lineHeight:"100px"}} />
        </GridItem>

        <GridItem xs={20} sm={20} md={12}>
          <span style={{ marginLeft: "35%", fontSize: "20px", lineHeight:"100px"}}>可容纳人数：</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Select style={{width:"12%", fontSize:"20px", align:"center"}}   value={this.state.capacity} onChange={this.handleCapacityChange}>
              <MenuItem value={5} style={{fontSize:"20px"}}>5</MenuItem>
              <MenuItem value={10} style={{fontSize:"20px"}}>10</MenuItem>
              <MenuItem value={15} style={{fontSize:"20px"}}>15</MenuItem>
              <MenuItem value={20} style={{fontSize:"20px"}}>20</MenuItem>
              <MenuItem value={25} style={{fontSize:"20px"}}>25</MenuItem>
              <MenuItem value={30} style={{fontSize:"20px"}}>30</MenuItem>
          </Select>
        </GridItem>

        <GridItem xs={20} sm={20} md={12}>
            <span style={{ marginLeft: "35%", fontSize: "20px", lineHeight:"100px" }}>设备：</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Checkbox checked={this.state.AirConditioner} onChange={this.handleDeviceChange('AirConditioner')} value="AirConditioner" />
            <span style={{fontSize: "20px" }}>空调</span>
            <Checkbox  style={{ marginLeft: "2%"}} checked={this.state.BlockBoard} onChange={this.handleDeviceChange('BlockBoard')} value="BlockBoard" />
            <span style={{fontSize: "20px" }}>白板</span>
            <Checkbox style={{ marginLeft: "2%"}} checked={this.state.Table} onChange={this.handleDeviceChange('Table')} value="Table"/>
            <span style={{fontSize: "20px" }}>桌子</span>
            <Checkbox style={{ marginLeft: "2%"}} checked={this.state.Projector} onChange={this.handleDeviceChange('Projector')} value="Projector"/>
            <span style={{fontSize: "20px" }}>投影仪</span>
            <Checkbox style={{ marginLeft: "2%"}} checked={this.state.PowerSupply} onChange={this.handleDeviceChange('PowerSupply')} value="PowerSupply"/>
            <span style={{fontSize: "20px" }}>电源</span>
        </GridItem>

        <GridItem xs={20} sm={20} md={12}>
            <span style={{ marginLeft: "35%", fontSize: "20px", lineHeight:"100px" }}>备注：</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField placeholder= "请输入备注信息" variant="outlined" style={{width:"20%"}}/>
        </GridItem>

          <GridItem > &nbsp; </GridItem>
        <GridItem xs={20} sm={20} md={12}>
            <Button style={{marginLeft:"43%", fontSize:"25px", lineHeight:"30px"}}>添加会议室</Button>
        </GridItem>
      </GridContainer>
    );
  }
}


export default AddRoom;

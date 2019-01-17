/**
 * Created by 励颖 on 2019/1/16.
 */

import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "components/CustomButtons/Button.jsx";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";


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
         <GridItem>&nbsp;</GridItem>
          <GridItem>&nbsp;</GridItem>
        <GridItem classxs={20} sm={20} md={12}>
          <span style={{ marginLeft: "33%", fontSize: "20px", lineHeight:"80px" }}>房间号：</span>
          <TextField variant="outlined" label="请输入房间号"
                     style={{width:"20%", fontSize: "20px", lineHeight:"80px", marginLeft:"58px"}} />
        </GridItem>

        <GridItem xs={20} sm={20} md={12}>
          <span style={{ marginLeft: "33%", fontSize: "20px", lineHeight:"70px"}}>可容纳人数：</span>
          <Select
              style={{width:"20%", fontSize:"20px", align:"center", marginLeft:"1%"}}
              value={this.state.capacity}
              onChange={this.handleCapacityChange}
              input={
                  <OutlinedInput  name="capacity" id="outlined-age-simple" />
              }>
              <MenuItem value={5} style={{fontSize:"20px"}}>5</MenuItem>
              <MenuItem value={10} style={{fontSize:"20px"}}>10</MenuItem>
              <MenuItem value={15} style={{fontSize:"20px"}}>15</MenuItem>
              <MenuItem value={20} style={{fontSize:"20px"}}>20</MenuItem>
              <MenuItem value={25} style={{fontSize:"20px"}}>25</MenuItem>
              <MenuItem value={30} style={{fontSize:"20px"}}>30</MenuItem>
          </Select>
        </GridItem>

        <GridItem xs={20} sm={20} md={12}>
            <span style={{ marginLeft: "33%", fontSize: "20px", lineHeight:"70px" }}>设备：</span>
            <Checkbox style={{marginLeft:"3.6%"}} checked={this.state.AirConditioner} onChange={this.handleDeviceChange('AirConditioner')} value="AirConditioner" />
            <span style={{fontSize: "20px" }}>空调</span>
            <Checkbox  style={{ marginLeft: "2.8%"}} checked={this.state.BlockBoard} onChange={this.handleDeviceChange('BlockBoard')} value="BlockBoard" />
            <span style={{fontSize: "20px" }}>白板</span>
            <Checkbox style={{ marginLeft: "2.8%"}} checked={this.state.Table} onChange={this.handleDeviceChange('Table')} value="Table"/>
            <span style={{fontSize: "20px" }}>桌子</span>
            <br/>
            <Checkbox style={{ marginLeft: "40%"}} checked={this.state.Projector} onChange={this.handleDeviceChange('Projector')} value="Projector"/>
            <span style={{fontSize: "20px" }}>投影仪</span>
            <Checkbox style={{ marginLeft: "1.7%"}} checked={this.state.PowerSupply} onChange={this.handleDeviceChange('PowerSupply')} value="PowerSupply"/>
            <span style={{fontSize: "20px" }}>电源</span>
        </GridItem>

        <GridItem xs={20} sm={20} md={12}>
            <span style={{ marginLeft: "33%", fontSize: "20px", lineHeight:"80px" }}>备注：</span>
            <TextField placeholder= "请输入备注信息" variant="outlined"
                       style={{width:"20%", lineHeight:"80px", marginLeft:"73px"}}/>
        </GridItem>

          <GridItem > &nbsp; </GridItem>
        <GridItem xs={20} sm={20} md={12}>
            <Button style={{marginLeft:"43%", fontSize:"25px", lineHeight:"60px", background:"#00bcd4"}}>添加会议室</Button>
        </GridItem>
      </GridContainer>
    );
  }
}


export default AddRoom;

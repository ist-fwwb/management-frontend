import React from "react";
import PropTypes from 'prop-types';
// core components

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import pink from '@material-ui/core/colors/pink';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';

import { Link } from "react-router-dom";
import { idToTime } from "variables/general.jsx";

const occupiedMessage = "会议室被占用";

const colorList = [purple[200], pink[200], orange[300], cyan[200], teal[300]]
let colorMap = {};

const CustomTableCell = withStyles(theme => ({
  head: {
    //backgroundColor: theme.palette.common.black,
    backgroundColor:"#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class RoomSchedule extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      scheduleData: this.props.data,
      chosenDate: null,
      firstChosen: null,
      secondChosen: null,
    };
  }



  markOriginalData = (scheduleData, originalDate, originalStartTime, originalEndTime) => {
    let tempDay = -1;
    for (let i = 0; i < 5; i++){
      if (scheduleData[0][i]["date"] === originalDate){
        tempDay = i;
        break;
      }
    }
    if (tempDay === -1)
      return -1;
    for (let i = originalStartTime; i < originalEndTime; i++){
      scheduleData[i][tempDay]["original"] = true;
      scheduleData[i][tempDay]["occupied"] = false;
    }
    return scheduleData;
  };

  render(){
    let scheduleData = this.state.scheduleData;
    let colorCount = 0;
    let { originalDate, originalStartTime, originalEndTime,} = this.props;
    // change the time of an existing meeting instead of creating one
    if (scheduleData){
      if (Boolean(originalDate) && Boolean(originalStartTime) && Boolean(originalEndTime)){
        scheduleData = this.markOriginalData(scheduleData, originalDate, originalStartTime, originalEndTime);
      }
    }
    return(
      <Table style={{width:"90%", marginLeft:"5%"}}>
        <TableHead >
          {
            ! scheduleData || scheduleData.length === 0 ? 
            <TableRow>
              <CustomTableCell>时间</CustomTableCell>
              <CustomTableCell align="left">星期一</CustomTableCell>
              <CustomTableCell align="left">星期二</CustomTableCell>
              <CustomTableCell align="left">星期三</CustomTableCell>
              <CustomTableCell align="left">星期四</CustomTableCell>
              <CustomTableCell align="left">星期五</CustomTableCell>
            </TableRow>
            :
            <TableRow>
              <CustomTableCell>时间</CustomTableCell>
              <CustomTableCell align="left">{scheduleData[0][0]["date"]}<br/>星期一</CustomTableCell>
              <CustomTableCell align="left">{scheduleData[0][1]["date"]}<br/>星期二</CustomTableCell>
              <CustomTableCell align="left">{scheduleData[0][2]["date"]}<br/>星期三</CustomTableCell>
              <CustomTableCell align="left">{scheduleData[0][3]["date"]}<br/>星期四</CustomTableCell>
              <CustomTableCell align="left">{scheduleData[0][4]["date"]}<br/>星期五</CustomTableCell>
            </TableRow>
          }                        
        </TableHead>
        <TableBody>
          {! scheduleData ? null : scheduleData.map((row, x) => {
            // only display 8:00 ~ 18:00
            if (x < 16 || x >= 36){
              return null;
            }

            return(
              <TableRow key={x}>
                <CustomTableCell component="th" scope="row">
                  {idToTime(x)+"~"+idToTime(x+1)}
                </CustomTableCell>
                {
                  row.map((cell, y) => {
                    let bgcolor = null;
                    if (cell["occupied"]){
                      let currentid = cell.meetingid;
                      if (!colorMap[currentid]){
                        colorMap[currentid] = colorList[colorCount];
                        colorCount += 1;
                        colorCount %= colorList.length;
                      }
                      bgcolor = colorMap[currentid];
                    }
                    else {
                      if (cell["click"] || cell["between"]){
                        bgcolor = green[400];
                      }
                    }
                    return (
                      <CustomTableCell style={{padding:0}} key={y} align="left" >
                      {
                        cell["original"]? ( 
                          cell["click"] || cell["between"] ?
                            <div style={{background:bgcolor, borderRadius:"15px", lineHeight:"45px" ,height:"45px", width:"92%", textAlign:"center"}}>
                              当前会议
                            </div> 
                          :
                            <div style={{ background:green[50], borderRadius:"15px", lineHeight:"45px" ,height:"45px", width:"92%", textAlign:"center"}}>
                              当前会议
                            </div>
                        )
                        : cell["occupied"] ? (
                            <div style={{background:bgcolor ,borderRadius:"15px", lineHeight:"45px" ,height:"45px", width:"92%", textAlign:"center"}}>
                              <Link to={"/meeting/"+cell["meetingid"]+"/profile"}>
                                        {!cell["name"] ? "null" : (cell["name"].length > 5 ? cell["name"].substring(0,5)+".." : cell["name"])}
                              </Link>
                            </div>
                          )
                          :
                          <div style={{background:bgcolor ,borderRadius:"15px", lineHeight:"45px" ,height:"45px", width:"92%", textAlign:"center"}}>
                          </div>
                      }
                      </CustomTableCell>
                    )
                  })
                }
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }
}

RoomSchedule.propTypes = {
  data: PropTypes.array.isRequired,
  roomId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  originalDate: PropTypes.string,
  originalStartTime: PropTypes.number,
  originalEndTime: PropTypes.number,
  urgency: PropTypes.bool,
};

export default RoomSchedule;
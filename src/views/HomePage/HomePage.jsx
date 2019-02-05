import React from "react";
import "App.css";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Snackbar from "components/Snackbar/Snackbar.jsx";
import { meetingController, today } from "variables/general.jsx";

import { idToTime } from "variables/general.jsx";
import Slider from "react-slick";
import { withStyles } from '@material-ui/core/styles';



const slidesSettings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
};

const CustomTableCell = withStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
}))(TableCell);




class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            br: false,
            notificationMessage: "null",
            notificationType: null,
            rows:[],
            meetings: null,
        };
        this.state.rows.push(this.createData("新增会议室6301", "2019-01-28"));
        this.state.rows.push(this.createData("会议室5312的投影仪损坏", "2019-01-21"));
    }

    createData=(heading, date)=>{
        return {heading, date};
    };


    showNotification = (place) => {
        let x = [];
        x[place] = true;
        this.setState(x);
        this.alertTimeout = setTimeout(
            function() {
                x[place] = false;
                this.setState(x);
            }.bind(this),
            6000
        );
    };

    typeToIcon = (type) => {
        if (type === "success")
            return Done;
        if (type === "danger")
            return ErrorOutline;
        return null;
    };

    warning = (msg) => {
        this.setState({
            notificationType: "danger",
            notificationMessage: msg
        });
        this.showNotification("br");
    };

    render(){
        if (this.state.error)
            return <h2>Network Error</h2>

        return(
            <div id="Background">
                <GridContainer xs={12} sm={12} md={12}>
                    <GridItem xs={12} sm={12} md={8}>
                        <Slider {...slidesSettings} style={{width:"50%"}}>
                            <div
                                style={{
                                    maxWidth: "100%",
                                    height: "30%",
                                    paddingBottom: "40%",
                                    overflow: "hidden"
                                }}
                            >
                                <img
                                    width="100%"
                                    alt="img"
                                    style={{height:"400px"}}
                                    src={
                                        "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                    }
                                />
                                <h5 style={{align:"center"}}>{this.state.rows[0].date}  {this.state.rows[0].heading}</h5>
                            </div>
                            <div
                                style={{
                                    maxWidth: "100%",
                                    height: "30%",
                                    paddingBottom: "40%",
                                    overflow: "hidden"
                                }}
                            >
                                <img
                                    width="100%"
                                    style={{height:"400px"}}
                                    alt="img"
                                    src={
                                        "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                    }
                                />
                                <h5 style={{align:"center"}}>{this.state.rows[1].date}  {this.state.rows[1].heading}</h5>
                            </div>
                        </Slider>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Table className="room page" >
                            <TableHead>
                                <TableRow >
                                    <CustomTableCell  style={{width:"70%", color:"#ab47bc", fontSize:"18px"}}>标题</CustomTableCell>
                                    <CustomTableCell  style={{width:"30%", color:"#ab47bc", fontSize:"18px"}}>日期</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map(row => (
                                    <TableRow >
                                        <CustomTableCell style={{width:"70%", fontSize:"16px"}}>{row.heading}</CustomTableCell>
                                        <CustomTableCell style={{width:"30%", fontSize:"15px"}}>{row.date}</CustomTableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </GridItem>
                </GridContainer>

                <Snackbar
                    place="br"
                    color={this.state.notificationType}
                    icon={this.typeToIcon(this.state.notificationType)}
                    message={this.state.notificationMessage}
                    open={this.state.br}
                    closeNotification={() => this.setState({ br: false })}
                    close
                />
            </div>

        )
    }
}
export default HomePage;
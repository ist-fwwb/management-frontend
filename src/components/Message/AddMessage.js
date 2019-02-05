/**
 * Created by 励颖 on 2019/2/5.
 */
import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";

import Radio from '@material-ui/core/Radio';
import TextField from "@material-ui/core/TextField";

import { roomController } from "variables/general.jsx";

class AddMessage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            heading:"" ,
            content:"" ,
            toRemind: false,

        }
    }

    handleChange = (e) =>{
        this.setState({
            toRemind: e.target.value
        },()=>{
            console.log(this.state.toRemind)
        })

    };



    handleAdd = () =>{

        alert("添加成功")
    };


    render() {

        return (
            <GridContainer xs={20} sm={20} md={12}>
                <GridItem>&nbsp;</GridItem>
                <GridItem>&nbsp;</GridItem>
                <GridItem classxs={20} sm={20} md={12}>
                    <span style={{ marginLeft: "26%", fontSize: "20px", lineHeight:"80px" }}>标题：</span>
                    <TextField variant="outlined" label="请输入新闻标题"
                               style={{width:"40%", fontSize: "20px", lineHeight:"80px", marginLeft:"58px"}} />
                </GridItem>
                <GridItem classxs={20} sm={20} md={12}>
                    <span style={{ marginLeft: "26%", fontSize: "20px", lineHeight:"80px" }}>内容：</span>
                    <TextField variant="outlined" label="请输入新闻内容" multiline="true" rows="6"
                               style={{width:"40%", fontSize: "20px", lineHeight:"80px", marginLeft:"58px"}} />
                </GridItem>
                <GridItem xs={20} sm={20} md={12}>
                    <span style={{ marginLeft: "26%", fontSize: "20px", lineHeight:"80px" }}>是否推送?</span>
                    <Radio
                        style={{marginLeft:"1%"}}
                        checked={this.state.toRemind === 'true'}
                        onChange={this.handleChange}
                        value="true"

                    />
                    <span style={{fontSize:"20px"}}>是</span>
                    <Radio
                        style={{marginLeft:"2%"}}
                        checked={this.state.toRemind === 'false'}
                        onChange={this.handleChange}
                        value="false"

                    />
                    <span style={{fontSize:"20px"}}>否</span>

                </GridItem>

                <GridItem > &nbsp; </GridItem>
                <GridItem xs={20} sm={20} md={12}>
                    <Button
                        onClick={this.handleAdd}
                        style={{marginLeft:"47%", fontSize:"25px", lineHeight:"60px", background:"#00bcd4"}}>
                        添加新闻
                    </Button>
                </GridItem>
            </GridContainer>
        );
    }
}


export default AddMessage;
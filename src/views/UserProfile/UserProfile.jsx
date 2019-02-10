import React from "react";
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

import Search from "@material-ui/icons/Search";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import HowToReg from "@material-ui/icons/HowToReg";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ActivateUser from "components/User/ActivateUser.jsx";
import SearchUser from "components/User/SearchUser.jsx";
import ModifyUser from "components/User/ModifyUser.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state={
      first:"用户管理",
      second: "用户激活",
    }
  }

  handleSecondNavbar=(value)=>{
    console.log(value);
    this.setState({
      second: value
    })
  };

  handleExit=()=>{
    this.setState({
      second:"用户激活"
    });
    window.location.reload();
  };

  render(){
    const{first, second} = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10} >
            <Button style={{fontSize:"20px", color:"#878787"}} onClick={this.handleExit}>{first}</Button>
            <span style={{fontSize:"20px", color:"#878787"}}>></span>
            <Button style={{fontSize:"20px", color:"#878787"}}>{second}</Button>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={15}>
            <CustomTabs
              style={{ background: "linear-gradient(45deg, #0277bd 30%, #4fc3f7 90%)"}}
              headerColor="success"
              handleSecondNavbar={this.handleSecondNavbar.bind(this)}
              tabs={[
                {
                  tabName: "用户激活",
                  tabIcon: ConfirmationNumber,
                  tabContent: <ActivateUser/>
                },
                {
                  tabName: "外宾注册",
                  tabIcon: HowToReg
                  //tabContent:

                },
                {
                  tabName: "查询用户",
                  tabIcon: Search,
                  tabContent: <SearchUser/>
                },
                {
                  tabName: "修改用户信息",
                  tabIcon: DeleteOutline,
                  tabContent: <ModifyUser/>
                },

              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);

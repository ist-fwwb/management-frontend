import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Search from "@material-ui/icons/Search";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import HowToReg from "@material-ui/icons/HowToReg";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
import ActivateUser from "components/User/ActivateUser.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

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

  render(){
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={15}>
            <CustomTabs
                title={null}
                style={{ background: "#424242" }}
                headerColor="success"
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
                        //tabContent:
                    },
                    {
                        tabName: "修改用户信息",
                        tabIcon: DeleteOutline,
                        //tabContent:
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

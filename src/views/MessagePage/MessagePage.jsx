/**
 * Created by 励颖 on 2019/1/28.
 */
import React from "react";
import Button from "@material-ui/core/Button";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import PanTool from "@material-ui/icons/PanTool";
import AddMessage from "../../components/Message/AddMessage";

class MessagePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      first:"新闻管理",
      second: "发布新闻",
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
      second:"当前状态"
    });
    window.location.reload();
  };

    render() {
      const{first, second} = this.state;
        return (
            <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10} >
                  <Button style={{fontSize:"20px", color:"#878787", marginLeft:"3%"}} onClick={this.handleExit}>{first}</Button>
                  <span style={{fontSize:"20px", color:"#878787"}}>></span>
                  <Button style={{fontSize:"20px", color:"#878787"}}>{second}</Button>
                </GridItem>
              </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomTabs
                            style={{ background: "#6d4c41"}}
                            headerColor="rose"
                            handleSecondNavbar={this.handleSecondNavbar.bind(this)}
                            tabs={[
                                {
                                    tabName: "发布新闻",
                                    tabIcon: AddCircleOutline,
                                    tabContent: <AddMessage/>
                                },
                                {
                                    tabName: "修改新闻", //状态
                                    tabIcon: PanTool,
                                    //tabContent:
                                },
                            ]}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default MessagePage;
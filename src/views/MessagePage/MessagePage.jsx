/**
 * Created by 励颖 on 2019/1/28.
 */
import React from "react";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import PanTool from "@material-ui/icons/PanTool";
import AddMessage from "../../components/Message/AddMessage";

class MessagePage extends React.Component {
    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomTabs
                            style={{ background: "linear-gradient(45deg, #0277bd 30%, #4fc3f7 90%)"}}
                            headerColor="rose"
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
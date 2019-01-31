/**
 * Created by 励颖 on 2019/1/28.
 */
import React from "react";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import PanTool from "@material-ui/icons/PanTool";

class MessagePage extends React.Component {
    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomTabs
                            style={{background:"#212121"}}
                            headerColor="rose"
                            tabs={[
                                {
                                    tabName: "发布消息",
                                    tabIcon: AddCircleOutline,
                                    //tabContent:
                                },
                                {
                                    tabName: "修改消息", //状态
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
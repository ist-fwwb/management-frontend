import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import Slider from "react-slick";
import Table from "components/Table/Table.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import { meetingController, idToTime, today } from "variables/general.jsx";
import { Link } from "react-router-dom";

const slidesSettings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
};

const news = [
    ["温州皮革厂倒闭了", "2018-01-20"],
    ["温州皮革厂开业了", "2018-01-21"],
];

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            br: false,
            notificationMessage: "null",
            notificationType: null,

            error: false
        };
    }



    showNotification = place => {
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

    typeToIcon = type => {
        if (type === "success") return Done;
        if (type === "danger") return ErrorOutline;
        return null;
    };

    warning = msg => {
        this.setState({
            notificationType: "danger",
            notificationMessage: msg
        });
        this.showNotification("br");
    };

    success = msg => {
        this.setState({
            notificationType: "success",
            notificationMessage: msg
        });
        this.showNotification("br");
    };


    render() {
        if (this.state.error) return <h2>Network Error</h2>;
        return (
            <div>
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
                                <h5 style={{align:"center"}}>{news[0][1]}  {news[0][0]}</h5>
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
                                <h5 style={{align:"center"}}>{news[1][1]}  {news[1][0]}</h5>
                            </div>
                        </Slider>
                    </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["标题", "日期"]}
                                tableData={news}
                            />
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
        );
    }
}
export default HomePage;

/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import PrimarySearchAppBar from "components/AppBar/AppBar.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import Cookies from 'universal-cookie';
import { dashboardRoutes, deepRoutes } from "routes/dashboard.jsx";
import "App.css";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

const cookies = new Cookies();
let ps;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
        login: cookies.get("login"),
        userId: cookies.get("userId"),
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }


  handleDrawerToggle = () => {
      console.log("hello");
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
    pasteFunction = (event) => {
        if(event.clipboardData){
            let text = event.clipboardData.getData('text/plain');
            try {
                let jsonData = JSON.parse(text);
                if (jsonData.date && jsonData.startTime && jsonData.endTime && jsonData.roomId && jsonData.heading){
                    jsonData.startTime = timeToId(jsonData.startTime);
                    jsonData.endTime = timeToId(jsonData.endTime);
                    window.location.href = "/room/"+jsonData.roomId+"/profile/"+jsonData.date+"/"+jsonData.startTime+"/"+jsonData.endTime+"/"+jsonData.heading;
                }
            }
            catch(e){
                console.log(e);
            }
        }

    }

    componentDidMount() {
        window.addEventListener("resize", this.resizeFunction);
        window.addEventListener("paste", this.pasteFunction);
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }

    setPsRef = (element) => {
        this.psRef = element;
        if (navigator.platform.indexOf("Win") > -1  && element){
            ps = new PerfectScrollbar( element, {
                suppressScrollX: true,
                suppressScrollY: false,
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
        window.removeEventListener("paste", this.pasteFunction);
        if (navigator.platform.indexOf("Win") > -1 && ps){
            ps.destroy();
        }
    }

  render() {
    const { classes, ...rest } = this.props;
    const { userId, login } = this.state;
    if (!login){
        return <LoginPage handleLogin={this.handleLogin}/>;
    }
    return (
        <div className={classes.wrapper} ref={this.setPsRef} >
        <Sidebar
          userId={userId}
          routes={dashboardRoutes}
          logoText={"会议室管理"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          //style={{backgroundColor:"#795548"}}
          color="blue"

          {...rest}
        />
        <div className={classes.mainPanel}  >
            <PrimarySearchAppBar  color="transparent"/>

            <div className={classes.content}>
            <div className={classes.container}>
              <Switch >
                  {
                      deepRoutes.map((prop, key) => {
                          if (prop.redirect)
                              return <Redirect from={prop.path} to={prop.to} key={key} />;
                          return <Route exact path={prop.path} key={key} render={ (props) => <prop.component userId={userId} {...props}/> } />;
                      })
                  }
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);

import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import Snackbar from "components/Snackbar/Snackbar.jsx";

import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

import { userController } from "variables/general.jsx";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",

      bc: false,
      notificationMessage: "null",
      notificationType: null
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  handleLogin = e => {
    e.preventDefault();
    console.log("hello");
    console.log(this.state.username);
      console.log(this.state.password);
    if(this.state.username !== "root")
        alert("用户名不正确");
    else if(this.state.password !== "123456")
        alert("密码错误");
    else
    {
      console.log("success");
      alert("登录成功");
      cookies.set("login", true, { path: "/" });
      cookies.set("username", this.state.username, { path: "/" });
      cookies.set("userId", "0001", { path: "/" });
      window.location.href = "/";
    }


  };

  showNotification = () => {
    this.setState({ bc: true });
    this.alertTimeout = setTimeout(
      function() {
        this.setState({ bc: false });
      }.bind(this),
      6000
    );
  };

  typeToIcon = type => {
    if (type === "success") return Done;
    if (type === "danger") return ErrorOutline;
    return null;
  };

  success = msg => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    });
    this.showNotification();
  };

  warning = msg => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification();
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            智能会议室
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">用户名</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="tel-local"
                autoFocus
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">密码</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleLogin}
            >
              登录
            </Button>
          </form>
        </Paper>
        <Snackbar
          place="bc"
          color={this.state.notificationType}
          icon={this.typeToIcon(this.state.notificationType)}
          message={this.state.notificationMessage}
          open={this.state.bc}
          closeNotification={() => this.setState({ bc: false })}
          close
        />
      </main>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);

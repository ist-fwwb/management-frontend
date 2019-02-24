/**
 * Created by 励颖 on 2019/2/24.
 */
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class MeetingInfo extends React.Component{
  constructor(props) {
    super(props);

  }

  render(){
    const { classes } = this.props;
    return (
        <div>
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="会议标题"
                  name="heading"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.heading}
                  margin="normal"
                  variant="outlined"

              />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <TextField
                  label="会议描述"
                  name="description"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.description}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="会议时间"
                  name="time"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.time}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="场所"
                  name="location"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.location}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="发起人"
                  name="hostname"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.hostname}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="会议类型"
                  name="type"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.type}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="会议状态"
                  name="type"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.status}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="是否签到"
                  name="needSignIn"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.needSignIn}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={11}>

            </GridItem>
          </GridContainer>
        </div>
    )
  }
}

export default withStyles(styles)(MeetingInfo);
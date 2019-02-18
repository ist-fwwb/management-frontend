/**
 * Created by 励颖 on 2019/2/18.
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

class DetailInfo extends React.Component{
  constructor(props) {
    super(props);

  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <GridContainer >
          <GridItem xs={12} sm={12} md={8}>
            <TextField
                label="公司"
                name="enterprise"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textField}
                value="上海交通大学"
                margin="normal"
                variant="outlined"
                style={{width:"80%"}}
            />
            <TextField
                label="职员编号"
                name="id"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textField}
                value={this.props.enterpriceId}
                margin="normal"
                variant="outlined"
                style={{width:"80%"}}
            />
            <TextField
                label="姓名"
                name="name"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textField}
                value={this.props.name}
                margin="normal"
                variant="outlined"
                style={{width:"80%"}}
            />
            <TextField
                label="联系电话"
                name="tel"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                className={classes.textField}
                value={this.props.tel}
                margin="normal"
                variant="outlined"
                style={{width:"80%"}}
            />
          </GridItem>
            <GridItem xs={12} sm={12} md={11}>
            <Card>
              <CardHeader style={{fontSize:"16px", color:"#616161"}}>
                人脸图像
              </CardHeader>
              <CardBody>
                <img src={this.props.faceFile}/>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default withStyles(styles)(DetailInfo);
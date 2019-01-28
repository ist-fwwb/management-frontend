/**
 * Created by 励颖 on 2019/1/28.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop:55,
        width: 170,
        height:30,
    },
});

class TimePicker extends React.Component {

    handleChange =(e) => {
        console.log(e.target.value);
        this.props.handleTimeChange(e.target.value);
    };

    render() {
        const {style, classes} = this.props;

        return (
            <form className={classes.container} style={style} noValidate>
                <TextField
                    id="time"
                    type="time"
                    className={classes.textField}
                    style={style}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 1800, // 15 min
                    }}
                    onChange={this.handleChange}
                >
                    选择时间
                </TextField>
            </form>
        );
    }
}


TimePicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimePicker);
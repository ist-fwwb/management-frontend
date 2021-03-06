/**
 * Created by 励颖 on 2019/1/27.
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
        height:30
    },
});


class DatePicker extends React.Component {

    handleChange =(e)=>{
        console.log(e.target.value);
        this.props.handleDateChange(e.target.value);
    };

    render()
    {
        const {style, classes} = this.props;
        return (
            <form className={classes.container} style={style} >
                <TextField
                    id="date"
                    type="date"
                    style={style}
                    placeholder="请选择日期"
                    className={classes.textField}
                    onChange={this.handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin=""
                />
            </form>
        );
    }
}

DatePicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePicker);

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
        marginTop:25,
        width: 200,
        height:25,
        fontSize:"200px"
    },
});


class DatePicker extends React.Component {

    render()
    {
        const {style, classes} = this.props;
        return (
            <form className={classes.container} style={style} noValidate>
                <TextField
                    id="date"
                    type="date"
                    style={{fontSize:"20px"}}
                    placeholder="请选择日期"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        );
    }
}

DatePicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePicker);

import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';


const Filter = (props) => {
    return (
        <form>
            <TextField id="outlined-basic" label="Search from text" variant="outlined"
                onChange={props.changeFilter} />
            <Button id="resetButton" type="reset" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => props.filter('')}>clear text field</Button>
        </form>
    )
}
export default Filter
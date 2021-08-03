import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';


const Filter = ({ changeFilter, filter }) => {
    return (
        <form>
            <TextField id="outlined-basic"
                label="Search from text"
                variant="outlined"
                inputProps={{ maxLength: 16 }}
                onChange={changeFilter}
            />
            <Button id="resetButton"
                type="reset"
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => filter('')}>clear text field
            </Button>
        </form>
    )
}
export default Filter
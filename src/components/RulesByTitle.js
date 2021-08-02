import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const RulesByTitle = (props) => {
    return (
        <div>
            {props.ruleToShow.map(show => (
                <ListItem key={show.id}><ListItemText>{show.content}</ListItemText></ListItem>
            ))}
        </div>
    )
}
export default RulesByTitle
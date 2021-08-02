import React from 'react'
import Highlighter from "react-highlight-words";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const Rules = (props) => {
    props.selected(true)
    return (
        <div>
            {props.arrayOfRules.filter(rule => rule.content.includes(props.filter.toLocaleLowerCase())).map(rule => (
                <ListItem key={rule.id}><ListItemText>
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[props.filter]}
                        autoEscape={true}
                        textToHighlight={rule.content}
                    />
                </ListItemText></ListItem>
            ))}
        </div>
    )
}
export default Rules

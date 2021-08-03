import React, { useEffect } from 'react'
import Highlighter from "react-highlight-words";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const Rules = ({ setIsSelected, filter, arrayOfRules }) => {
    useEffect(() => {
        setIsSelected(true)
    }, [setIsSelected])
    return (
        <div>
            {arrayOfRules.filter(rule =>
                rule.content.includes(filter.toLocaleLowerCase())).map(rule => (
                    <ListItem key={rule.id}><ListItemText>
                        <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={[filter]}
                            autoEscape={true}
                            textToHighlight={rule.content}
                        />
                    </ListItemText></ListItem>
                ))}
        </div>
    )
}
export default Rules

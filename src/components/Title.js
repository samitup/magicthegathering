import React from 'react'
import { useEffect } from 'react'
const Title = ({ filterField, setTitle, title, previousTitle }) => {
    var titleString = ''
    if (filterField !== "") {
        titleString = 'Filtered by word: ' + filterField
    }
    else {
        titleString = previousTitle
    }

    useEffect(() => {
        setTitle(titleString)
    }, [setTitle, titleString])

    return (
        <div>
            <h2><i>{filterField !== "" ? titleString : title}</i></h2>
        </div>
    )
}


export default Title
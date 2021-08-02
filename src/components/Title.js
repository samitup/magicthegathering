import React from 'react'

const Title = (props) => {
    if (props.filterField !== "") {
        props.setTitle(props.filterField)
        return (
            <div>
                <h2>Filtered by word: <i>{props.title}</i></h2>
            </div>
        )
    }
    props.setTitle(props.previousTitle)
    return (
        <div>
            <h2>{props.title}</h2>
        </div>
    )
}
export default Title
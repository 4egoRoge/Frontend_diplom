import React, { Component }  from "react";

const Message = (props) => {
    return (
        <p className={props.class}>{props.text.replace(/\\n/g, '\n')}</p>
    )
}

export default Message;
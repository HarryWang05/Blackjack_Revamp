const Message = (props) => {
    return (
        <div className="message">
            {(props.event !== '') ? (`${props.name} ${props.event}`) : <br/>}
        </div>
    )
}

export default Message;
const Hand = (props) => {
    return (
        <div className="hand">
            {props.name} Hand
            <br/>
            {props.cards.map((it, index) => (
            <span key={index}>{it + ' '}</span>
            ))}
        </div>
    )
}

export default Hand;
let cardStrings = ['1','2','3','4','5','6','7','8','9','10','J','Q','K','X']; // index 13 'X' is used for when a placeholder is desired rather than an actual card

const Hand = (props) => {
    let charHand = [];
    for(let i = 0; i < props.cards.length; i++) {
        charHand.push(cardStrings[props.cards[i][0]]); // Change each card from hand from int to char
    }
    return (
        <div className="hand">
            {props.name} Hand
            <br/>
            {charHand.map((it, index) => (
            <span key={index}>{it + ' '}</span>
            ))}
        </div>
    )
}

export default Hand;
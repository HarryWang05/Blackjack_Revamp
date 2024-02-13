interface Props {
  name: string;
  event: string;
}

const Message = (props: Props) => {
  return (
    <div className="message">
      {props.event !== "" ? `${props.name} ${props.event}` : <br />}
    </div>
  );
};

export default Message;

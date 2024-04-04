import './Message.css'


const Message = ({msg, type}) => {
  return (
    <div className={`mensagem ${type}`}>
        <p>{msg}</p>
    </div>
  )
}

export default Message
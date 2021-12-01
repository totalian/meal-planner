const Button = ({ text, onClick, disabled }) => {
  return (
    <div className="flex flex-col bg-black text-white">
      <button onClick={onClick} disabled={disabled} className="text-center">
        {text}
      </button>
    </div>
  )
}

export default Button

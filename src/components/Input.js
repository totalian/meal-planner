const Input = ({label, type="text", onChange, value}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="">{label}</label>
      <input className="px-4 py-1 border-b-2 outline-none" type={type} onChange={onChange} value={value} />
    </div>
  )
}

export default Input

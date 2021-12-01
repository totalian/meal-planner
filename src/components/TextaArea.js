const TextArea = ({label, type="text", onChange, value}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="">{label}</label>
      <textarea className="px-4 py-1 border-2 outline-none h-64" type={type} onChange={onChange} value={value}>
      </textarea>
    </div>
  )
}

export default TextArea

export default function TombolMeja({ avail, index, tableSelect, setTableSelect }) {
  return (
    <label htmlFor={`meja-${index}`} className={`cursor-pointer w-10 h-10 border-2  font-bold  ${tableSelect == index ? "bg-amber-50 text-amber-500 border-amber-500": avail ? "bg-gray-50 text-gray-400 border-gray-400": "bg-gray-50 text-gray-200 border-gray-200"} flex justify-center items-center rounded`}>
      <input
        type="radio"
        name="meja"
        id={`meja-${index}`}
        disabled={!avail}
        className="hidden"
        onChange={() => setTableSelect(index)}
      />
      {index}
    </label>
  )
}

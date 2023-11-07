
export const Counter = (counter: { label: string, count: number }) => {
  return (
    <div className=" bg-cyan-100 w-max min-w-10 py-4 text-center flex flex-col items-center rounded-md shadow-md">
      <span className="px-8 py-2 text-xs font-bold">{counter.label}</span>
      <div className="py-4 px-10 bg-cyan-50 shadow-inner">
        <span className=" text-4xl font-thin">{counter.count}</span>
      </div>
    </div>
  )
}

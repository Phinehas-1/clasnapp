
export const SummaryFormSection = () => {
  return (
      <div>
          <form action="">
              <div className=" flex flex-col gap-6 items-start w-max text-xs">
                  <input type="text" placeholder='Topic...' className=' border-2 rounded-md border-blue-300 px-3 py-1 w-full'/>
                  <textarea name="" id="" cols={90} rows={8} placeholder='Summary...' className=' border-2 rounded-md border-blue-300 px-3 py-1 resize-none max-w-xs md:max-w-sm'></textarea>
                  <button className='px-4 py-1 rounded-sm bg-blue-800 text-white'>Save</button>
              </div>
          </form>
    </div>
  )
}

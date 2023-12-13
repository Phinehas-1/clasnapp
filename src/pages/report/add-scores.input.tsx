import { useReportPageContext } from "../../hooks";

export const AddScoresInput = () => {
  const { addScoresToReport, setAddScoresToReport } = useReportPageContext();
  return (
    <div className=" bg-cyan-100 py-4 text-center flex gap-4 justify-center rounded-md shadow-md px-8 mt-16 sm:mt-0 text-xs">
      <input type="checkbox" name="" id="addScoresLabel" onChange={() => setAddScoresToReport(!addScoresToReport)} />
      <label htmlFor="addScoresLabel"><span className="font-bold">add test scores</span></label>
    </div>
  )
}

import { useReportPageContext } from '../../hooks';
import { AddScoresInput } from './add-scores.input'
import { ScoresTable } from './scores-table'

export const ScoresSection = () => {
  const {addScoresToReport} = useReportPageContext();
  return (
    <div className='flex flex-col gap-8 items-start mt-24'>
      <section>
        <AddScoresInput/>
      </section>
      <section className='border-blue-300 rounded-md border max-w-xs justify-center flex'>
        {addScoresToReport && <ScoresTable />}
      </section>
    </div>
  )
}

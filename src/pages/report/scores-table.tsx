import { useReportPageContext } from '../../hooks';
import { ScoreTableRow } from './scores-table-row';

export const ScoresTable = () => {
    const reportPageContext = useReportPageContext();
    return (<table className='text-xs'>
        <thead>
            <tr>
                <th className=' bg-blue-600 text-white border-4 border-white'>Student</th>
                <th className=' bg-blue-600 text-white min-w-10 border-4 border-white'>Score</th>
            </tr>
        </thead>
        <tbody>
            {reportPageContext.attendancesData.map((attendance, index) => (<ScoreTableRow key={index} name={attendance.student.name} score={attendance.score} />))}
        </tbody>
    </table>

    )
}

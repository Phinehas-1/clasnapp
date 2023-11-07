
export const ScoreTableRow = (student: { name: string, score: number }) => {
    return (
        <tr className='text-center'>
            <td className=' bg-slate-100 px-8 py-1 border-r-4 border-b-4 border-white'>{student.name}</td>
            <td className='border-r-4 border-b-4 border-slate-100'>{student.score}</td>
        </tr>
    )
}

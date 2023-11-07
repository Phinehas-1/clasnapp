import { FaCalendarAlt } from "react-icons/fa"

export const WeekSection = (calendar:{id:string, week:string}) => {
    return (
        <div>
            <div className="flex gap-4 items-center">
                <span><FaCalendarAlt/></span>
                <span>{calendar.week}</span>
            </div>
        </div>
    )
}

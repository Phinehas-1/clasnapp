import { useEffect, useState } from 'react'
import { fetchAllCalendars, fetchAllUserAttendancesByCalendar } from '../../api'
import { CounterSection } from './counter-section'
import { ScoresSection } from './scores-section'
import { SummaryFormSection } from './summary-form-section'
import { WeekSection } from './week-section'
import { ReportPageContextData } from '../../types'
import { ReportPageContext } from '../../contexts'

export const Reports = () => {
    const [latestCalendar, setLatestCalendar] = useState({ id: "", week: "" });
    const [attendances, setAttendances] = useState([{ id: "", student: { name: "" }, score: 0, laptop: false }]);
    const [counters, setCounters] = useState([{ label: "attendance", count: 2 }, { label: "laptop", count: 5 }]);
    const [addScoresToReport, setAddScoresToReport] = useState(false);
    // on render, display the attendance data associated with the last created calendar. 
    useEffect(() => {
        const getCalendars = async () => {
            const calendars: { id: string, week: string }[] = await fetchAllCalendars();
            if (calendars.length < 1) return;
            calendars?.forEach(calendar => console.log(`${calendar.id}`));
            setLatestCalendar(calendars[0]);
        }
        getCalendars();
        return () => setLatestCalendar({ id: "", week: "" });
    }, [])

    useEffect(() => {
        const getAttendance = async () => {
            const attendances: { id: string, student: { name: string }, score: number, laptop: boolean }[] = await fetchAllUserAttendancesByCalendar(latestCalendar?.id);
            if (!attendances || attendances.length < 1) return;
            attendances?.forEach(attendance => console.log(`${attendance.student.name}`));
            setAttendances(attendances);
        }
        getAttendance()
        return () => setAttendances([{ id: "", student: { name: "" }, score: 0, laptop: false }]);
    }, [latestCalendar]);

    useEffect(() => {
        const laptopCounter = {
            label: "laptop",
            count: attendances.filter(attendance => attendance.laptop).length
        }
        const attendanceCounter = {
            label: "attendance",
            count: attendances.length
        }
        setCounters([laptopCounter, attendanceCounter])
    }, [attendances])

    const reporPageContextData: ReportPageContextData = {
        attendancesData: attendances,
        addScoresToReport,
        setAddScoresToReport
    }
    // display a dropdown select with all the created calendars as options.
    // subsequently, display the attendance data associated with the calendar seleted from the dropdown.
    return (
        <div className='flex gap-x-8 flex-col md:flex-row'>
            <section className='grid gap-16'>
                <WeekSection {...latestCalendar} />
                <CounterSection {...{ counters }} />
                <SummaryFormSection />
            </section>
            <section>
                <ReportPageContext.Provider value={reporPageContextData}>
                    <ScoresSection />
                </ReportPageContext.Provider>
            </section>
        </div>
    )
}

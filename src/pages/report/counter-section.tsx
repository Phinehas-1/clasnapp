import { Counter } from './counter';

export const CounterSection = (countersProp: { counters: {label:string, count:number}[] }) => {
    return (
        <div className='flex flex-wrap gap-8'>
            {countersProp.counters.map((counter, index) => (<Counter key={index} label={counter.label} count={counter.count} />))}
        </div>
    )
}

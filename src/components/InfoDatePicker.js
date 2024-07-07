import React, { useState } from 'react'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'
import { FaCalendarAlt} from 'react-icons/fa'


const DateContainer = ({ className, children }) => {
    return (
        <div style={{ padding: '4px', background: '#333', color: '#000' }}>
            <CalendarContainer className={className}>
                <div style={{ background: '#f0f0f0' }}>시작하는 날</div>
                <div style={{ position: 'relative' }}>{children}</div>
            </CalendarContainer>
        </div>
    );
};

const InfoDatePicker = () => {

    const [startDate, setStartDate] = useState(null)

    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <div className="customInput" onClick={onClick} ref={ref}>
            <FaCalendarAlt className="iconCalendar" />
            <input type="text" value={value || ''} placeholder="시작하는 날" readOnly />
        </div>
    ));


  return (
    <div>

        <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                calendarContainer={DateContainer}
                customInput={<CustomInput />}

            />
    
    </div>
  )

  
}

export default InfoDatePicker
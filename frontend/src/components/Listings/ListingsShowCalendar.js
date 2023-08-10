import './ListingsShowCalendar.css';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, DateRange } from 'react-date-range';

import { addDays } from 'date-fns';

import { useState, useEffect, useRef } from 'react';

const ListingsShowCalendar = () => {

	const [datesState, setDatesState] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: 'selection',
		}
	])

	const handleSelect = (item) => {
		setDatesState([item.selection])
	}

	// Calendar will only display 1 month if container is < 606.5px, akin to airbnb
	const calRef = useRef(null);
	const [numMonths, setNumMonths] = useState(2);
	const [containerSize, setContainerSize] = useState(undefined);

	const handleResize = () => {
		// setContainerSize(calRef.current.offsetWidth);
		// console.log("calRef", calRef);
		// console.log("calRef.current", calRef.current);
		// console.log("containerSize", containerSize);
		// console.log("calRef.current.offsetWidth", calRef.current.offsetWidth);
		if(calRef.current.offsetWidth < 606.5) {
			setNumMonths(1)
		} else {
			setNumMonths(2)
		}
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [])

	return (
		<div ref={calRef} className='listings-show-calendar-inner-container'>
			<DateRange
				preventSnapRefocus={true}
				direction="horizontal"
				months={numMonths}
				ranges={datesState}
				onChange={handleSelect}
				showDateDisplay={false}
				fixedHeight={false} //airbnb has this behavior - if a month needs 6 lines for a month it will change height.

				// showPreview={false}
			/>
		</div>
	)
}

export default ListingsShowCalendar;
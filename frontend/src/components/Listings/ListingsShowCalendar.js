import './ListingsShowCalendar.css';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, DateRange } from 'react-date-range';

import { addDays } from 'date-fns';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const ListingsShowCalendar = () => {

	const reservations = Object.values(useSelector(state => state.entities.reservations ? state.entities.reservations : {}))

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
	const [blockedDates, setBlockedDates] = useState([]);

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

	const listBlockedDates = () => {
		const blockedDates = [];
		// console.log("reservations",reservations);
		reservations.forEach(reservation => {
			// const startDate = new Date(reservation.startDate)
			let currentDate = new Date(reservation.startDate)
			const endDate = new Date(reservation.endDate)
			while(currentDate <= endDate) {
				// console.log("currentDate", currentDate)
				// console.log("endDate", endDate)
				blockedDates.push(currentDate)
				currentDate.setDate(currentDate.getDate() + 1) //cannot just do currentDate = new Date(currentDate.getDate() + 1) ... 
			}
		})
		setBlockedDates(blockedDates);
		// return blockedDates;
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [])

	useEffect(() => {
		// console.log("blocked dates:",listBlockedDates())
		listBlockedDates();
	}, []) // run this useEffect once reservations gets populated
	// }, [reservations]) // run this useEffect once reservations gets populated

	useEffect(() => {
		console.log("blocked dates should be set", blockedDates)
	}, [blockedDates])

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
				// blockedDates={listBlockedDates()}
				blockedDates={blockedDates}

				// showPreview={false}
			/>
		</div>
	)
}

export default ListingsShowCalendar;
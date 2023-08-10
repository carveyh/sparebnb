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
			// endDate: addDays(new Date(), 7),
			endDate: new Date(),
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
	// const [blockedDates, setBlockedDates] = useState([]); // better not using useState
	let blockedDates = [];

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
		const blockedDatesArr = [];
		reservations.forEach(reservation => {
			// By changing the separator characters, this will force browser to not convert the user entered input to local time,
			// thus avoiding need to worry about timezone conversion.
			const startDateString = reservation.startDate.split('-').join("/")
			const endDateString = reservation.endDate.split('-').join("/")
			let currentDate = new Date(startDateString)
			const endDate = new Date(endDateString)
			while(currentDate < endDate) { //NOT inclusive of endDate, because should be able to book the endDate?
				// console.log("reservation.startDate", reservation.startDate)
				// console.log("currentDate", currentDate)
				blockedDatesArr.push(new Date(currentDate)) // if not new Date, it will be the same date object pushed onto array multiple times with same final value
				currentDate.setDate(currentDate.getDate() + 1) //cannot just do currentDate = new Date(currentDate.getDate() + 1) ... 
			}
		})
		// setBlockedDates(blockedDates);
		// return blockedDates;
		blockedDates = blockedDatesArr;
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [])

	listBlockedDates();

	useEffect(() => {
		// console.log("blocked dates:",listBlockedDates())
		// listBlockedDates();
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
				disabledDates={blockedDates}

				// showPreview={false}
			/>
		</div>
	)
}

export default ListingsShowCalendar;
import './ListingsShowCalendar.css';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, DateRange } from 'react-date-range';

import { addDays } from 'date-fns';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const ListingsShowCalendar = ({checkIn, setCheckIn, checkOut, setCheckOut}) => {

	const reservations = Object.values(useSelector(state => state.entities.reservations ? state.entities.reservations : {}))

	const [datesState, setDatesState] = useState([
		{
			// startDate: new Date(),
			// endDate: new Date(),
			// // endDate: addDays(new Date(), 7),
			// key: 'selection',

			// startDate: checkIn,
			// endDate: checkOut,
			// // endDate: addDays(new Date(), 7),
			// key: 'selection',
			
			startDate: null,
			endDate: null,
			// endDate: addDays(new Date(), 7),
			key: 'selection',

		}
	])

	useEffect(() => {
		if(checkIn < checkOut) {
			setDatesState(
				[{
					startDate: checkIn,
					endDate: checkOut,
					key: 'selection',
				}]
			)
		} else {
			setDatesState(
				[{
					startDate: checkIn,
					endDate: checkIn,
					key: 'selection',
				}]
			)
		}
		
	}, [checkIn, checkOut])

	const handleSelect = (item) => {
		setDatesState([item.selection])
		setCheckIn(item.selection.startDate)
		setCheckOut(item.selection.endDate)
		console.log(item.selection)
	}

	// Calendar will only display 1 month if container is < 606.5px, akin to airbnb
	const calRef = useRef(null);
	const [numMonths, setNumMonths] = useState(2);
	const [containerSize, setContainerSize] = useState(undefined);
	// const [blockedDates, setBlockedDates] = useState([]); // better not using useState
	let blockedDates = [];
	let maxDate;

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

	const getMaxDate = () => { // airbnb roughly allows you to browse 24 months for booking, not including current month.
		const tempDate = new Date();
		// tempDate.setDate(tempDate.getDate() + 730)
		tempDate.setMonth(tempDate.getMonth() + 24)
		tempDate.setDate(1)
		tempDate.setDate(tempDate.getDate() - 1)

		maxDate = tempDate;
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [])

	// useEffect(() => {
	// 	setDatesState({
	// 		// startDate: new Date(),
	// 		// endDate: new Date(),
	// 		// // endDate: addDays(new Date(), 7),
	// 		// key: 'selection',
	// 		startDate: checkIn,
	// 		endDate: checkOut,
	// 		// endDate: addDays(new Date(), 7),
	// 		key: 'selection',
	// 	})
	// }, [checkIn, checkOut])

	listBlockedDates();
	getMaxDate();

	

	// useEffect(() => {
	// 	console.log("blocked dates should be set", blockedDates)
	// }, [blockedDates])

	return (
		<div ref={calRef} className='listings-show-calendar-inner-container'>
			<DateRange
				preventSnapRefocus={true}
				direction="horizontal"
				months={numMonths}
				ranges={datesState}
				// ranges={(checkIn && checkOut) ? datesState : undefined}
				// ranges={undefined} // if we want to "clear dates"
				onChange={handleSelect}
				showDateDisplay={false} // Don't need this for on page
				editableDateInputs={true} // if showDateDisplay={true}
				fixedHeight={false} //airbnb has this behavior - if a month needs 6 lines for a month it will change height.
				// blockedDates={listBlockedDates()}
				disabledDates={blockedDates}
				minDate={new Date()}
				maxDate={maxDate}
				rangeColors={["#3e3e3e","#717171", "#FF0000"]}
				color="FF0000"
				weekdayDisplayFormat='EEEEEE'
				// initialFocusedRange={[]}

				// scroll={{enabled: true}} // calendar turns gray and empty...not needed
				// showMonthAndYearPickers={false} // not as clean, can omit as airbnb forces you to use showMonthArrow or type in dates
				// showMonthArrow={true} // needed to select from different future months
				// showSelectionPreview={false} // no apparent change
				// showPreview={false} //no apparent change
			/>
		</div>
	)
}

export default ListingsShowCalendar;
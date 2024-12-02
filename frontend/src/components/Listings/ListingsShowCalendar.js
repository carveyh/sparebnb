import './ListingsShowCalendar.css';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, DateRange } from 'react-date-range';

import { addDays } from 'date-fns';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const ListingsShowCalendar = ({checkIn, setCheckIn, checkOut, setCheckOut, modal, calModalRef, showDateModal, setShowDateModal, handleClearDates, reserveBtn}) => {

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
			
			// startDate: null,
			// endDate: null,
			// key: 'selection',

			startDate: checkIn,
			endDate: checkOut,
			key: 'selection',

		}
	])

	useEffect(() => {
		if(checkIn <= checkOut) {
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
	}

	// Calendar will only display 1 month if container is < 606.5px, akin to airbnb
	const calRef = useRef(null);
	const [numMonths, setNumMonths] = useState(2);
	const [containerSize, setContainerSize] = useState(undefined);
	// const [blockedDates, setBlockedDates] = useState([]); // better not using useState
	let blockedDates = [];
	let maxDate;

	const handleResize = () => {
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
		tempDate.setMonth(tempDate.getMonth() + 24)
		tempDate.setDate(1)
		tempDate.setDate(tempDate.getDate() - 1)

		maxDate = tempDate;
	}

	const clickOutsideClose = (e) => {
		// need calModalRef.current bc if close button is clicked, the ref will no longer be available to check
		if(calModalRef.current &&  !reserveBtn.current.contains(e.target) && !calModalRef.current.contains(e.target) && showDateModal) {
			setShowDateModal(false)
			document.removeEventListener("click",clickOutsideClose)
		}
	}

	useEffect(() => {
		if(modal) document.addEventListener("click",clickOutsideClose)
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
			document.removeEventListener("click",clickOutsideClose)
		}
	}, [])

	listBlockedDates();
	getMaxDate();

	return (
		<>
			<div ref={calRef} className='listings-show-calendar-inner-container'>
				<DateRange
					preventSnapRefocus={true}
					direction="horizontal"
					months={numMonths}
					ranges={datesState}
					// initialFocusedRange={datesState}
					// ranges={(checkIn && checkOut) ? datesState : undefined}
					// ranges={undefined} // if we want to "clear dates"
					onChange={handleSelect}
					showDateDisplay={true} // Shows picker for ability to update end date while keeping selected start date
					dateDisplayFormat={"P"} // This sets date format for `showDateDisplay` start/end date buttons to 'MM-DD-YYYY'
					editableDateInputs={true} // if showDateDisplay={true}
					fixedHeight={false} //airbnb has this behavior - if a month needs 6 lines for a month it will change height.
					disabledDates={blockedDates}
					minDate={new Date()}
					maxDate={maxDate}
					rangeColors={["#3e3e3e","#717171", "#FF0000"]}
					color="FF0000"
					weekdayDisplayFormat='EEEEEE'
					// retainEndDateOnFirstSelection={true}
					
					// initialFocusedRange={[]}

					// scroll={{enabled: true}} // calendar turns gray and empty...not needed
					// showMonthAndYearPickers={false} // not as clean, can omit as airbnb forces you to use showMonthArrow or type in dates
					// showMonthArrow={true} // needed to select from different future months
					// showSelectionPreview={false} // no apparent change
					// showPreview={false} //no apparent change
				/>
			</div>
			{modal && 
				<div className='date-modal-controls'>
					<div onClick={handleClearDates} className='date-modal-btn date-modal-clear-btn'>Clear Dates</div>
					<div onClick={e => setShowDateModal(false)} className='date-modal-btn date-modal-close-btn'>Close</div>
				</div>
			}
		</>
	)
}

export default ListingsShowCalendar;
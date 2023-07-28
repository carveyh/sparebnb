export const baseServiceFee = (baseNightlyRate) => 14;

export const cleaningFee = (baseNightlyRate) => parseInt(baseNightlyRate / 4);

export const numNights = (checkIn, checkOut) => {
	if(!checkIn || !checkOut) return null;
	const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays;
}
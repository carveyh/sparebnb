export const formatTwoDigitNumberString = (unformattedNum) => {
	const formattedNum = unformattedNum.toString();
	return formattedNum.length < 2 ? "0".concat(formattedNum) : formattedNum;
}
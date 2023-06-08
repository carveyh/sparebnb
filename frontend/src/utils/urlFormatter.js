export const formatTwoDigitNumberString = (unformattedNum) => {
	if(!unformattedNum) return "01";
	const formattedNum = unformattedNum.toString();
	return formattedNum.length < 2 ? "0".concat(formattedNum) : formattedNum;
}

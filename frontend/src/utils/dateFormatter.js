export function formatDateForInputElement(rawDate) {
  let parts = rawDate.toLocaleDateString().split('/');
  let month = parts[0].length === 1 ? '0' + parts[0] : parts[0];
  let date = parts[1].length === 1 ? '0' + parts[1] : parts[1];
  let year = parts[2];
  return [year,month,date].join('-');
}
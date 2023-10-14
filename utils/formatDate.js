

export  const formatDateToUI = (dateString) => {
  const options = {day: '2-digit', month:'2-digit', year: 'numeric'};
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const formatDateToISO = (dateString) => {
  const parsedDate = new Date(dateString)
  return parsedDate.toISOString();
}
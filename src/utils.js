export const COUNTRY_CODE_MAPPING = {
    "UK": "GB"
}

export const calculateDaysLeft = (dateOfEnforcementArray) => {

    const dates = dateOfEnforcementArray.map(entry => new Date(entry.date));
    const earliestDate = new Date(Math.min(...dates));
    const currentDate = new Date();
    const timeDifference = earliestDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft;
}

export const convertUTCToLocalDate = (utcTimestamp) => {
    const utcDate = new Date(utcTimestamp); // Parse the UTC timestamp
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: Intl.DateTimeFormat()?.resolvedOptions()?.timeZone };
    const formattedDate = utcDate.toLocaleDateString('en-IN', options); // Convert to user's local time zone
    return formattedDate;
}

export const formatDateToString = (dateString, onlyMonthYear=false) =>  {
    if(!dateString) return ""
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const [year, month, day] = dateString.split('-').map(Number);
    const monthName = months[month - 1];
    
    return onlyMonthYear ? `${monthName} ${year}` : `${day} ${monthName} ${year}`;
  }

export const isDateGreaterThanToday = (dateString) => {
    if (!dateString) return false;
  
    const today = new Date();
    const [year, month, day] = dateString.split('-').map(Number);
    const dateToCompare = new Date(year, month - 1, day); // month is zero-based in JavaScript
  
    return dateToCompare > today;
  };
  
const date2ISOString = (date) => {

  return date.getFullYear().toString() + "-" +
        (date.getMonth() + 1).toString().padStart(2, '0') + "-" +
        date.getDate().toString().padStart(2, '0') + " " +
        date.getHours().toString().padStart(2, '0') + ":" +
        date.getMinutes().toString().padStart(2, '0') + ":" +
        date.getSeconds().toString().padStart(2, '0') + "." +
        date.getMilliseconds().toString().padStart(3, '0');
}

export default {
    date2ISOString: date2ISOString
}
function formatSeconds(seconds) {
    if(!seconds||seconds===Infinity) return "00:00";
    let date = new Date(null);
    date.setSeconds(seconds);
    let timeString = date.toISOString().substring(14, 19);
    return timeString;
}
export default formatSeconds;
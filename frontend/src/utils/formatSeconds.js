/**
 * 将秒数格式化为 mm:ss 的形式
 * @param {number} seconds - 需要格式化的秒数
 * @returns {string} 格式化后的时间字符串mm:ss
 */
function formatSeconds(seconds) {
    if(!seconds||seconds===Infinity) return "00:00";
    let date = new Date(null);
    date.setSeconds(seconds);
    let timeString = date.toISOString().substring(14, 19);
    return timeString;
}
export default formatSeconds;
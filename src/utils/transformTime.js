/**
 * 将时间戳转换为格式化的时间字符串
 * @param {number} timestamp - 时间戳
 * @returns {string} 格式化的时间字符串，格式为：yyyy-MM-dd HH:mm:ss
 */
function transformTime(timestamp) {
  const date = new Date(Number(timestamp));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
export default transformTime;

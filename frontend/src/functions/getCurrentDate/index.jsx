export default function getCurentDate() {
  var date = new Date()
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  console.log(
    "Data e hora atual: " +
      day +
      "/" +
      month +
      "/" +
      year +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second
  );

  console.log(date);
  // return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  return `${day}/${month}/${year}`;
}

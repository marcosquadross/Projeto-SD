export default function getCurentDate() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  var diaFormatado = dia < 10 ? "0" + dia : dia;
  var mesFormatado = mes < 10 ? "0" + mes : mes;
  var horaFormatada = hora < 10 ? "0" + hora : hora;
  var minutosFormatados = minutos < 10 ? "0" + minutos : minutos;
  var segundosFormatados = segundos < 10 ? "0" + segundos : segundos;

  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}

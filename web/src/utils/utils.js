import moment from 'moment';


export function formatDate(time) {
  if (!time) return 'Null';
  return moment(time).format('YYYY/MM/DD');
}

export function formatDateTime(time) {
  if (!time) return 'Null';
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
}

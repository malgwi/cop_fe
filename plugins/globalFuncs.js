import moment from 'moment'
 export function fromNow(date){
   return moment(`${date}`, "YYYYMMDD").fromNow()
 }

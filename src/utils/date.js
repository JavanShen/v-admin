export function getDate(date) {
  return new Date(date).toLocaleDateString();
}

export function getDateZh(date) {
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}

export function isSameYear(date1,date2=new Date()) {
    return date1.getFullYear() == date2.getFullYear();
}

export function isSameMonth(date1,date2=new Date()) {
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth();
}

export function isSameDay(date1,date2=new Date()) {
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
}

export function betweenDate(start,end,type='year'){
    let startDate=new Date(start),
        endDate=new Date(end);
    if(type==='year'){
        return endDate.getFullYear()-startDate.getFullYear();
    }else if(type==='month'){
        return (endDate.getFullYear()-startDate.getFullYear())*12+(endDate.getMonth()-startDate.getMonth());
    }else if(type==='day'){
        return (endDate.getFullYear()-startDate.getFullYear())*365+(endDate.getMonth()-startDate.getMonth())*30+(endDate.getDate()-startDate.getDate());
    }
}



export const today=new Date()

export const todayStart=new Date(today.getFullYear(),today.getMonth(),today.getDate())
export function getDate(date) {
  return new Date(date).toLocaleDateString();
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
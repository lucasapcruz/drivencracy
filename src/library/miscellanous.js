import dayjs from "dayjs"

export const dateTimeFormat = "YYYY-MM-DD HH:mm"

export function daysToSeconds(days){
    return days*24*60*60*1000
}

export function formatDateTime(dateTimeMills){
    return dayjs(dateTimeMills).format(dateTimeFormat)
}
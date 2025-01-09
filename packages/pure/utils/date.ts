import config from 'virtual:config'

const dateFormat = new Intl.DateTimeFormat(config.locale.dateLocale, config.locale.dateOptions)

export function getFormattedDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  // if (typeof options !== 'undefined') {
  //   return new Date(date).toLocaleDateString(config.locale.dateLocale, {
  //     year: 'numeric',
  //     month: '2-digit', // 두 자리로 표시
  //     day: '2-digit', // 두 자리로 표시
  //     ...options
  //   })
  // }

  // return dateFormat.format(new Date(date))

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 두 자리로 변환
  const day = String(date.getDate()).padStart(2, '0') // 두 자리로 변환

  return `${year}년 ${month}월 ${day}일`
}

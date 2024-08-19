import moment from 'moment';

export default class DateUtil {
  /**
   * 10位的当前时间戳，精度秒
   * 本地时区时间
   */
  public static now() {
    return Math.round(Date.now() / 1000);
  }

  /**
   * 10位的当前时间戳，精度秒
   * unix时间
   */
  public static unixNow() {
    return moment().unix();
  }

  /**
   * 获取当前时间
   * 默认格式是: YYYY-MM-DD HH:mm:ss
   */
  public static fromTimestampToString(
    time: string | Date,
    format = 'YYYY-MM-DD HH:mm:ss',
  ) {
    if (!time) {
      return '';
    }

    return moment(time).format(format);
  }

  /**
   * 获取当前时间
   * 默认格式是: YYYY-MM-DD HH:mm:ss
   */
  public static timeFormat(format = 'YYYY-MM-DD HH:mm:ss') {
    return moment().format(format);
  }

  /**
   * 获取当前日期
   * 默认格式是: YYYY-MM-DD
   */
  public static dayFormat(format = 'YYYY-MM-DD') {
    return moment().format(format);
  }

  /**
   * 获取昨天日期
   * 默认格式是: YYYY-MM-DD
   */
  public static yesterdayFormat(format = 'YYYY-MM-DD') {
    return moment().add(-1, 'day').format(format);
  }

  /**
   * 获取上周日期
   * 默认格式是: YYYY-MM-DD
   */
  public static lasetWeekFormat(day = -7, format = 'YYYY-MM-DD') {
    return moment().add(day, 'day').format(format);
  }

  /**
   * 根据时间YYYY-MM-DD 转化unix time
   */
  public static timeToUnix(format = 'YYYY-MM-DD') {
    return moment(format).unix().toString();
  }

  /**
   * 获取当前年份
   * 默认格式是: YYYY
   */
  public static getYear(): number {
    return moment().year();
  }

  /**
   * 获取当前月份
   * 默认格式是: MM
   */
  public static getMonth(): number {
    return moment().month() + 1;
  }

  /**
   * 获取当前月份的第一天
   * 默认格式是: MM
   */
  public static getCurrentMonthOfStartDay(date: string): string {
    if (!date) {
      date = moment().format();
    }

    return moment(moment(date)).startOf('month').format('YYYY-MM-DD');
  }

  /**
   * 获取当前月份的最后一天
   * 默认格式是: MM
   */
  public static getCurrentMonthOfEndDay(date: string): string {
    if (!date) {
      date = moment().format();
    }

    return moment(moment(date)).endOf('month').format('YYYY-MM-DD');
  }

  /**
   * 获取当前日
   * 默认格式是: DD
   */
  public static getDay(): number {
    return moment().date();
  }
}

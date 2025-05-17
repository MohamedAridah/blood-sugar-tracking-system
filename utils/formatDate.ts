import { Locale } from "date-fns";
import { enUS } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

interface FormatDateOptions {
  timeZone?: string;
  locale?: Locale;
  showTimeZoneAbbr?: boolean; // e.g. GMT+3
}

/**
 * Formats a date using a time zone and format string.
 *
 * @param date - A Date object, ISO string, or timestamp
 * @param formatStr - A date-fns format string
 * @param options - Optional timeZone override
 */
export default function formatDate(
  date: Date | string | number,
  formatStr: string = `EEEE, MMMM dd, yyyy \'at\' hh:mm a`,
  options: FormatDateOptions = {}
): string {
  const timeZone = options.timeZone || userTimeZone;
  const fmt = options.showTimeZoneAbbr ? `${formatStr} O` : formatStr;

  return formatInTimeZone(date, timeZone, fmt, {
    locale: options.locale || enUS,
  });
}

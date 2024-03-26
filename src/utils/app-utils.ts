import { CheckProps } from '../types/app-types';

function formattedValue(value: number): string {
  const strValue = value.toString();
  if (strValue.length < 2) {
    return '0' + strValue;
  }
  return strValue;
}

export function formattedDate(): string {
  let date = new Date();

  let hours = formattedValue(date.getHours());
  let minutes = formattedValue(date.getMinutes());
  let seconds = formattedValue(date.getSeconds());

  let day = formattedValue(date.getDate());
  let month = formattedValue(date.getMonth() + 1);
  let year = date.getFullYear();

  let currentTime: string = `${hours}:${minutes}:${seconds}`;
  let currentDate: string = `${day}-${month}-${year}`;
  let currentFullDate: string = `${currentDate} ${currentTime}`;

  return currentFullDate;
}

export function consoleLogTimed(message: string) {
  console.log(`${formattedDate()} | ${message}`);
}

export function getUniqueElements(collection: any[]): any[] {
  let collectionElementsStr = collection.map((element) => {
    let elementStr = JSON.stringify(element);
    return elementStr;
  });
  let uniqueElements = new Set([...collectionElementsStr]);
  return Array(...uniqueElements).map((element) => JSON.parse(element));
}

export function checkValue(props: CheckProps) {
  const { value, name, type, required, isDateString } = props;
  if (required && !value && value != 0)
    throw new Error(`'${name}' can't be null.`);
  if (typeof value != type) throw new Error(`'${name}' isn't type ${type}.`);
  if (required && isDateString) {
    const fullDatePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!fullDatePattern.test(value))
      throw new Error(
        `Incorrect date pattern of '${name}'. Expected 'yyyy-mm-dd hh:mm:ss'`
      );
  }
  return value;
}

export function notEmptyString(value: string | String) {
  return value.length > 0;
}

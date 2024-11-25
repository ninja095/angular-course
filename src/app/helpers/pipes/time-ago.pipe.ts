import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  getDeclension(n: number, forms: [string, string, string]): string {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 19) return forms[2];
    if (mod10 === 1) return forms[0];
    if (mod10 >= 2 && mod10 <= 4) return forms[1];
    return forms[2];
  }

  transform(value: Date | string | number): string {
    if (!value) return 'Invalid date';

    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Invalid date';

    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} ${this.getDeclension(seconds, ['секунда', 'секунды', 'секунд'])} назад`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} ${this.getDeclension(minutes, ['минута', 'минуты', 'минут'])} назад`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${this.getDeclension(hours, ['час', 'часа', 'часов'])} назад`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} ${this.getDeclension(days, ['день', 'дня', 'дней'])} назад`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} ${this.getDeclension(months, ['месяц', 'месяца', 'месяцев'])} назад`;
    const years = Math.floor(months / 12);
    return `${years} ${this.getDeclension(years, ['год', 'года', 'лет'])} назад`;
  }
}

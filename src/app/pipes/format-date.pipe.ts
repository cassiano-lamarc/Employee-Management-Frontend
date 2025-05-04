import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(
    value: string | Date,
    mode: 'default' | 'diff' = 'default'
  ): string {
    if (!value) return '';

    const date = new Date(value);

    if (mode === 'diff') {
      return this.calculateDiff(date);
    }

    return formatDate(date, 'MMM d, y', 'en-US');
  }

  private calculateDiff(date: Date): string {
    const now = new Date();

    let years = now.getFullYear() - date.getFullYear();
    let months = now.getMonth() - date.getMonth();
    let days = now.getDate() - date.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return `(${years}y – ${months}m – ${days}d)`;
  }
}

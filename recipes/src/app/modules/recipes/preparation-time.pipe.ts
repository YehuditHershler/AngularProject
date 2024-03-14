import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime',
  standalone: true
})
export class PreparationTimePipe implements PipeTransform {
  private hours = 0;
  private minutes = 0;
  transform(time: number): string {
    this.hours += (time / 60);
    this.minutes += (time - (this.hours * 60));
    return this.hours+":"+this.minutes;
  }

}

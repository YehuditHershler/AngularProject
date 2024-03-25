//prepartion-time.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

 @Pipe({
   name: 'preparationTime',
  standalone: true
})
 export class PreparationTimePipe implements PipeTransform {
//   private hours = 0;
//   private minutes = 0;
   transform(value: number): string {
     if (isNaN(value)) {
       return '--:--'; // טיפול בקלט לא חוקי בחן
     }
     let hours = Math.floor(value / 60);
     let minutes = value % 60;
//     this.hours += (time / 60);
//     this.minutes += (time - (this.hours * 60));
//     return this.hours+":"+this.minutes;
return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

}


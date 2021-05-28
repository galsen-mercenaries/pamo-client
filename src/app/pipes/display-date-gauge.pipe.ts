import { Pipe, PipeTransform } from "@angular/core";
import { MAP_DAYS_EN_TO_FR, MAP_MONTHS_EN_TO_FR } from "..";

@Pipe({
  name: "displayDateGauge",
})
export class DisplayDateGaugePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const date = new Date(value);
    const dateInfos = date.toString().split(" ");
    const dayInLetter = dateInfos[0];
    const month = dateInfos[1];
    const day = +dateInfos[2];
    const displayedDate =
      MAP_DAYS_EN_TO_FR.get(dayInLetter) +
      " " +
      day +
      " " +
      MAP_MONTHS_EN_TO_FR.get(month);
    return displayedDate;
  }
}

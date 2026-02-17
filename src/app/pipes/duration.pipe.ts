import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "duration",
    standalone: true
})
export class DurationPipe implements PipeTransform {

    transform(minutes: number): string {
        if (minutes == null || !minutes) return '';

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (mins === 0) {
            return `${hours}h`;
        }

        return `${hours}h ${mins}m`;
    }

}

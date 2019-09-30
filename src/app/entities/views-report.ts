import { ViewDay } from './view-day';

export class ViewsReport {
    totalViews: number;
    viewDays: ViewDay[];
    constructor() {
        this.totalViews = 0;
        this.viewDays = [];
    }
}

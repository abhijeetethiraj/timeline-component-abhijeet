export interface TimeLineTask {
    id:string;
    title:string;
    startDate: Date; 
    endDate:Date;
    progress:number;
    assignee?:string;
    rowId:string;
    dependencies?:string[];
    color?:string;
    isMilestone?:boolean;
}

export interface TimeLineRow{
    id:string;
    label:string;
    avatar?:string;
    tasks:string[];
}
 
export interface TimeLineViewProps{
    rows:TimeLineRow[];
    tasks:Record<string, TimeLineTask>;
    startDate:Date;
    endDate:Date;
    viewMode:'day' | 'week' | 'month';
    onTaskUpdate: (taskId:string, updates: Partial<TimeLineTask>) => void;
    onTaskMove: (taskId:string, newRowId:string,newStartDate:Date) =>void;
}
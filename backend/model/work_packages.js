export class WorkPackagesModel{
    constructor({derivedStartDate,derivedDueDate,_type,id,lockVersion,subject,description,scheduleManually,startDate,dueDate,estimatedTime,derivedEstimatedTime,derivedRemaniningTime,duration,
        ignoreNonWorkingDays,percentageDone,derivedPercentageDone,createdAt,updatedAt}){
            this.derivedStartDate=derivedStartDate;
            this.derivedDueDate=derivedDueDate;
            this._type=type;
            this.id=id;
            this.lockVersion=lockVersion;
            this.subject=subject;
            this.description=description;
            this.scheduleManually=scheduleManually;
            this.startDate=startDate;
            this.dueDate=dueDate;
            this.estimatedTime=estimatedTime;
            this.derivedEstimatedTime=derivedEstimatedTime;
            this.derivedRemaniningTime=derivedRemaniningTime;
            this.duration=duration;
            this.ignoreNonWorkingDays=ignoreNonWorkingDays;
            this.percentageDone=percentageDone;
            this.derivedPercentageDone=percentageDone;
            this.createdAt=createdAt;
            this.updatedAt=updatedAt;
    }

    toString(){
        return '${this.derivedStartDate} ({$this.derivedDueDate}) ({$this.type}) ({$this.id}) ({$this.lockVersion}) ({$this.subject}) ({$this.description}) ({$this.scheduleManually) ({$this.startDate}) ({$this.dueDate}) ({$this.estimatedTime}) ({$this.derivedEstimatedTime}) ({$this.derivedRemainingTime} ({$this.duration}) ({$this.ignoreWorkingDays}) ({$this.percentageDone}) ({$this.derivedPercentageDone}) ({$this.createdAt}) ({$this.updatedAt})'; 
    }
}
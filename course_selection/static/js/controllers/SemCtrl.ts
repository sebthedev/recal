/// <reference path='../../../../nice/static/ts/typings/tsd.d.ts' />
'use strict';

class SemCtrl {
    public static $inject =[
        '$scope',
        ];

    private static LAST_AVAILABLE_TERM_CODE = 1154;
    private semesters;

    constructor(private $scope) {
        this.$scope.vm = this;
        this.semesters = [];
        this.$scope.semesters = this.semesters;
        this.$scope.canAdd = this.canAdd();
    }

    public setAllInactive() {
        angular.forEach(this.semesters, (semester) => {
            semester.active = false;
        });
    }

    private canAdd(): boolean {
        return this.getNewSemesterTermCode() <= SemCtrl.LAST_AVAILABLE_TERM_CODE;
    }
 
    private getNewSemesterTermCode(): number {
        if (this.semesters.length == 0) {
            return 1152;
        }

        var lastTermCode = this.semesters[this.semesters.length - 1].term_code;
        if (this.semesterIsFall(lastTermCode)) {
            // fall to spring
            return lastTermCode + 2;
        } else {
            // spring to fall
            return lastTermCode + 8;
        }
    }

    private addNewSemester() {
        var id = this.semesters.length + 1;
        var term_code = this.getNewSemesterTermCode();
        var title = this.getTitle(term_code);
        this.semesters.push({
            id: id,
            title: title,
            active: true,
            current: term_code >= 1152 ? true : false,
            term_code: term_code
        });

        this.$scope.canAdd = this.canAdd();
    }

    private getTitle(termCode: number): string {
        var endYear = Math.floor((termCode % 1000) / 10);
        var startYear = endYear - 1;
        var semester = this.semesterIsFall(termCode) ? "Fall" : "Spring";
        return "" + startYear + endYear + semester;
    }
 
    public addSemester() {
        this.setAllInactive();
        this.addNewSemester();
    }    

    private semesterIsFall(termCode): boolean {
        return termCode % 10 == 2;
    }
}

export = SemCtrl;
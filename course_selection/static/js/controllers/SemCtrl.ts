/// <reference path='../../ts/typings/tsd.d.ts' />
'use strict';

import Semester = require('../models/Semester');

class SemCtrl {
    public static $inject =[
        '$scope',
        'localStorageService',
        'UserService',
        'SemesterService'
        ];

    // TODO: get this from the server
    private static CURRENT_SEMESTER_TERM_CODE = 1154;
    private static LAST_AVAILABLE_TERM_CODE = 1162;
    private semesters;

    constructor(private $scope,
            private localStorageService,
            private userService,
            private semesterService) {
        this.semesters = [];
        //this.restoreUserSemesters();
        this._initSemesters();
        this.$scope.semesters = this.semesters;
        this.$scope.canAdd = this.canAdd();

        this.$scope.$watchCollection(
                () => {
                    return this.$scope.semesters;
                }, (newValue, oldValue) => {
                    if (newValue != oldValue) {
                        this.$scope.canAdd = this.canAdd();
                    }
                });
    }

    private _initSemesters() {
        this.semesterService.allSemesters().$promise.then((semesters) => {
            semesters.sort(Semester.compare);
            angular.forEach(semesters, (semester) => {
                if (!this._semesterInArray(semester, this.semesters)) {
                    semester.active = true;
                    semester.current = semester.term_code >= SemCtrl.CURRENT_SEMESTER_TERM_CODE;
                    if (semester.current) {
                        this.addSemester(semester);
                    }
                }
            });
        });
    }

    private restoreUserSemesters() {
        this.userService.schedules.$promise.then((schedules) => {
            var tempSemesters = [];
            angular.forEach(schedules, (schedule) => {
                if (!this._semesterInArray(schedule.semester, tempSemesters)) {
                    tempSemesters.push(schedule.semester);
                }
            });

            tempSemesters.sort(Semester.compare);
            angular.forEach(tempSemesters, (semester) => {
                if (!this._semesterInArray(semester, this.semesters)) {
                    semester.active = true;
                    semester.current = semester.term_code >= SemCtrl.CURRENT_SEMESTER_TERM_CODE;
                    this.addSemester(semester);
                }
            });
        });
    }

    private _semesterInArray(semester, array): boolean {
        var found = false;
        angular.forEach(array, (sem) => {
            if (sem.term_code == semester.term_code) {
                found = true;
                return false; // break loop
            }
        });

        return found;
    }

    public setAllInactive() {
        angular.forEach(this.semesters, (semester) => {
            semester.active = false;
        });
    }

    private canAdd(): boolean {
        return this.getNewSemesterTermCode() <= SemCtrl.LAST_AVAILABLE_TERM_CODE;
    }

    // TODO: this will only give you semesters after
    // the last existing semester
    // for example, if the only semester the user has is 1415Fall,
    // he will not be able to add semesters from previous years
    private getNewSemesterTermCode(): number {
        if (this.semesters.length == 0) {
            return SemCtrl.CURRENT_SEMESTER_TERM_CODE;
        }

        var lastTermCode: number = +this.semesters[this.semesters.length - 1].term_code;
        if (this.semesterIsFall(lastTermCode)) {
            // fall to spring, from 2 to 4
            return lastTermCode + 2;
        } else {
            // spring to fall, from 4 to 12
            return lastTermCode + 8;
        }
    }

    private getNextSemester() {
        var term_code = this.getNewSemesterTermCode();
        return this.semesterService.getByTermCode(term_code);
    }

    private addNewSemester(semester?) {
        if (semester) {
            this.semesters.push(semester);
        } else {
            this.getNextSemester().then((semester) => {
                if (!this._semesterInArray(semester, this.semesters)) {
                    semester.active = true;
                    semester.current = semester.term_code >= SemCtrl.CURRENT_SEMESTER_TERM_CODE;
                    this.semesters.push(semester);
                }
            });
        }
    }

    private getTitle(termCode: number): string {
        // take mid 2 numbers: _XX_ for year
        var endYear = Math.floor((termCode % 1000) / 10);
        var startYear = endYear - 1;
        var semester = this.semesterIsFall(termCode) ? "Fall" : "Spring";
        return "" + startYear + "-" + endYear + " " + semester;
    }

    public addSemester(semester?) {
        this.setAllInactive();
        this.addNewSemester(semester);
    }

    // term codes for the fall semester ends with 2
    // '''''''''''''''''''spring semester ends with 4
    private semesterIsFall(termCode): boolean {
        return termCode % 10 == 2;
    }
}

export = SemCtrl;

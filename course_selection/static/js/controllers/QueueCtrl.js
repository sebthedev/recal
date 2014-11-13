define(["require", "exports"], function(require, exports) {
    'use strict';

    var QueueCtrl = (function () {
        function QueueCtrl($scope, testSharingService) {
            this.$scope = $scope;
            this.testSharingService = testSharingService;
            this.$scope.vm = this;
            this.$scope.data = testSharingService.getData();
        }
        // section belongs to a course that has been enrolled
        QueueCtrl.prototype.onMouseOver = function (section) {
            if (this.testSharingService.isSectionEnrolled(section)) {
                // nothing happens
            } else {
                this.testSharingService.setPreviewSection(section);
            }
        };

        QueueCtrl.prototype.onClick = function (section) {
            if (this.testSharingService.isSectionEnrolled(section)) {
                this.testSharingService.unenrollSection(section);
            } else {
                this.testSharingService.enrollSection(section);
            }
        };
        QueueCtrl.$inject = [
            '$scope',
            'TestSharingService'
        ];
        return QueueCtrl;
    })();

    
    return QueueCtrl;
});
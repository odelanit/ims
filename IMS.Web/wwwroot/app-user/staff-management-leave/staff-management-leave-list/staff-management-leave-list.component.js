"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const staff_management_leave_service_1 = require("../staff-management-leave.service");
const loader_service_1 = require("../../../shared/loader-service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
let ListStaffLeaveManagementComponent = class ListStaffLeaveManagementComponent {
    constructor(staffLeaveManagementService, loaderService, snackBar) {
        this.staffLeaveManagementService = staffLeaveManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.initialData = {};
        this.leaves = [];
        this.pendings = [];
    }
    ngOnInit() {
        this.getStaffLeaves();
    }
    getStaffLeaves() {
        this.loaderService.toggleLoader(true);
        this.staffLeaveManagementService.getStaffLeaves().then(res => {
            this.initialData = res.json();
            this.leaves = this.initialData.leaves;
            this.pendingList();
            this.loaderService.toggleLoader(false);
        });
    }
    numberOfDays(fromDate, endDate) {
        if (fromDate && endDate) {
            var FromDate = new Date(fromDate);
            var EndDate = new Date(endDate);
            const diffTime = Math.abs(FromDate.getTime() - EndDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays + 1;
        }
        else {
            return 0;
        }
    }
    pendingList() {
        this.loaderService.toggleLoader(true);
        this.staffLeaveManagementService.getStudentPendingLeavesByStaffId(this.initialData.staffId).then(res => {
            this.pendings = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    approveAndRejectLeave(leaveId, type) {
        this.loaderService.toggleLoader(true);
        var leaveChangeRequest = { LeaveId: leaveId, Type: type };
        this.staffLeaveManagementService.approveAndRejectLeave(leaveChangeRequest).then(res => {
            var response = res.json();
            this.snackBar.showSnackbar(response.message);
            this.ngOnInit();
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowedToEdit(id) {
        var leave = this.leaves.find(x => x.id === id);
        return (leave.leaveStatus.name === 'Pending');
    }
};
ListStaffLeaveManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-leave-list.html'
    }),
    __metadata("design:paramtypes", [staff_management_leave_service_1.StaffLeaveManagementService, loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService])
], ListStaffLeaveManagementComponent);
exports.ListStaffLeaveManagementComponent = ListStaffLeaveManagementComponent;
//# sourceMappingURL=staff-management-leave-list.component.js.map
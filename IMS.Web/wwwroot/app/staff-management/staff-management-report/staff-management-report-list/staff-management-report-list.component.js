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
const StaffManagementReport = require("../staff-management-report.model");
let StaffManagementReportListComponent = class StaffManagementReportListComponent {
    constructor() {
        this.reports = StaffManagementReport.getStaffList();
        this.charts = StaffManagementReport.getStaffChartList();
    }
    ngOnInit() {
    }
};
StaffManagementReportListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'staff-management-report-list.html'
    }),
    __metadata("design:paramtypes", [])
], StaffManagementReportListComponent);
exports.StaffManagementReportListComponent = StaffManagementReportListComponent;
//# sourceMappingURL=staff-management-report-list.component.js.map
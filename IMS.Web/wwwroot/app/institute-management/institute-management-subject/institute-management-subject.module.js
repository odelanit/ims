"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../shared/shared.module");
const institute_management_subject_component_1 = require("./institute-management-subject.component");
const institute_management_subject_list_component_1 = require("./institute-management-subject-list/institute-management-subject-list.component");
const institute_management_subject_add_component_1 = require("./institute-management-subject-add/institute-management-subject-add.component");
const institute_management_subject_edit_details_1 = require("./institute-management-subject-edit-details/institute-management-subject-edit-details");
const institute_management_subject_service_1 = require("./institute-management-subject.service");
let SubjectManagementModule = class SubjectManagementModule {
};
SubjectManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            institute_management_subject_component_1.SubjectManagementComponent,
            institute_management_subject_list_component_1.ListSubjectManagementComponent,
            institute_management_subject_add_component_1.AddSubjectManagementComponent,
            institute_management_subject_edit_details_1.EditDetailsSubjectManagementComponent
        ],
        providers: [
            institute_management_subject_service_1.SubjectManagementService
        ],
    })
], SubjectManagementModule);
exports.SubjectManagementModule = SubjectManagementModule;
//# sourceMappingURL=institute-management-subject.module.js.map
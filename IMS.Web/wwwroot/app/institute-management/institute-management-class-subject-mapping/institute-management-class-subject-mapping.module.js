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
const institute_management_class_subject_mapping_service_1 = require("./institute-management-class-subject-mapping.service");
const institute_management_class_subject_mapping_component_1 = require("./institute-management-class-subject-mapping.component");
const institute_management_class_subject_mapping_list_component_1 = require("./institute-management-class-subject-mapping-list/institute-management-class-subject-mapping-list.component");
let ClassSubjectMappingManagementModule = class ClassSubjectMappingManagementModule {
};
ClassSubjectMappingManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            institute_management_class_subject_mapping_component_1.ClassSubjectMappingManagementComponent,
            institute_management_class_subject_mapping_list_component_1.ListClassSubjectMappingManagementComponent
        ],
        providers: [
            institute_management_class_subject_mapping_service_1.ClassSubjectMappingManagementService
        ],
    })
], ClassSubjectMappingManagementModule);
exports.ClassSubjectMappingManagementModule = ClassSubjectMappingManagementModule;
//# sourceMappingURL=institute-management-class-subject-mapping.module.js.map
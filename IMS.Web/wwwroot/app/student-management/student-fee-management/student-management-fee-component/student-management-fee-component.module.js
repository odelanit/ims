"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const shared_module_1 = require("../../../../shared/shared.module");
const student_management_fee_component_service_1 = require("./student-management-fee-component.service");
const student_management_fee_component_component_1 = require("./student-management-fee-component.component");
const student_management_fee_component_list_component_1 = require("./student-management-fee-component-list/student-management-fee-component-list.component");
const student_management_fee_component_add_component_1 = require("./student-management-fee-component-add/student-management-fee-component-add.component");
const student_management_fee_component_edit_details_component_1 = require("./student-management-fee-component-edit-details/student-management-fee-component-edit-details.component");
let FeeComponentManagementModule = class FeeComponentManagementModule {
};
FeeComponentManagementModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
        ],
        declarations: [
            student_management_fee_component_component_1.FeeComponentManagementComponent,
            student_management_fee_component_list_component_1.ListFeeComponentManagementComponent,
            student_management_fee_component_add_component_1.AddFeeComponentManagementComponent,
            student_management_fee_component_edit_details_component_1.EditDetailsFeeComponentManagementComponent
        ],
        providers: [
            student_management_fee_component_service_1.FeeComponentManagementService
        ],
    })
], FeeComponentManagementModule);
exports.FeeComponentManagementModule = FeeComponentManagementModule;
//# sourceMappingURL=student-management-fee-component.module.js.map
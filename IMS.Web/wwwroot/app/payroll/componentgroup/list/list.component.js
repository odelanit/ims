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
const loader_service_1 = require("../../../../shared/loader-service");
const permission_service_1 = require("../../../../shared/permission.service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const componentgroup_service_1 = require("../componentgroup.service");
let ListComponent = class ListComponent {
    constructor(groupService, loaderService, permissionService) {
        this.groupService = groupService;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.groupList = [];
    }
    ngOnInit() {
        this.getGroupList();
    }
    getGroupList() {
        this.loaderService.toggleLoader(true);
        this.groupService.getComponentGroupsForLoggedInUser()
            .then(res => {
            this.groupList = res.json();
            this.loaderService.toggleLoader(false);
        }).catch(e => {
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Finance, sidenav_model_1.UserGroupFeatureChildEnum.FinanceBasicReciept, type);
    }
};
ListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './list.component.html',
        styleUrls: ['./list.component.css']
    }),
    __metadata("design:paramtypes", [componentgroup_service_1.ComponentGroupService,
        loader_service_1.LoaderService,
        permission_service_1.PermissionService])
], ListComponent);
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map
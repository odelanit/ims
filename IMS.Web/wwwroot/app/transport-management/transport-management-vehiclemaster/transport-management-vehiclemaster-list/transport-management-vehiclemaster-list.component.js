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
const transport_management_vehiclemaster_service_1 = require("../transport-management-vehiclemaster.service");
const loader_service_1 = require("../../../../shared/loader-service");
const sidenav_model_1 = require("../../../../shared/sidenav/sidenav.model");
const permission_service_1 = require("../../../../shared/permission.service");
let ListTransportManagementVehicleMasterComponent = class ListTransportManagementVehicleMasterComponent {
    constructor(vehicleMasterService, loaderService, permissionService) {
        this.vehicleMasterService = vehicleMasterService;
        this.loaderService = loaderService;
        this.permissionService = permissionService;
        this.vehicles = [];
    }
    ngOnInit() {
        this.getVehicleMasters();
    }
    getVehicleMasters() {
        this.loaderService.toggleLoader(true);
        this.vehicleMasterService.getVehicleMasters().then(res => {
            this.vehicles = res.json();
            this.loaderService.toggleLoader(false);
        });
    }
    isAllowed(type) {
        return this.permissionService.isAllowed(sidenav_model_1.UserGroupFeatureParentEnum.Transportation, sidenav_model_1.UserGroupFeatureChildEnum.TransportVehicle, type);
    }
};
ListTransportManagementVehicleMasterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'transport-management-vehiclemaster-list.html'
    }),
    __metadata("design:paramtypes", [transport_management_vehiclemaster_service_1.VehicleMasterService, loader_service_1.LoaderService,
        permission_service_1.PermissionService])
], ListTransportManagementVehicleMasterComponent);
exports.ListTransportManagementVehicleMasterComponent = ListTransportManagementVehicleMasterComponent;
//# sourceMappingURL=transport-management-vehiclemaster-list.component.js.map
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
const router_1 = require("@angular/router");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const transport_management_vehiclemaster_model_1 = require("../transport-management-vehiclemaster.model");
let AddTransportManagementVehicleMasterComponent = class AddTransportManagementVehicleMasterComponent {
    constructor(vehicleMasterService, loaderService, router, snackBar) {
        this.vehicleMasterService = vehicleMasterService;
        this.loaderService = loaderService;
        this.router = router;
        this.snackBar = snackBar;
        this.currentDate = new Date();
        this.addVehicle = new transport_management_vehiclemaster_model_1.AddVehicleMasterManagementAc();
        this.error = new transport_management_vehiclemaster_model_1.VehicleMasterManagementResponse();
        this.vehicleTypes = ['Car', 'Bus', 'Mini Bus', 'Van'];
        this.fuelTypes = ['Diesel', 'Petrol', 'LPG'];
        this.selectedTab = 0;
        this.documents = [];
        this.fileTypes = ['Image', 'File'];
    }
    ngOnInit() {
    }
    addVehicleMaster() {
        this.loaderService.toggleLoader(true);
        this.vehicleMasterService.addVehicleMaster(this.addVehicle).then(res => {
            var response = res.json();
            if (!response.hasError) {
                this.addOrUpdateStaffDocument(response.data.id, response.message);
            }
            else {
                this.error.ErrorType = response.errorType;
                this.error.HasError = response.hasError;
                this.error.Message = response.message;
            }
            this.loaderService.toggleLoader(false);
        });
    }
    hasError(fieldName) {
        var id = transport_management_vehiclemaster_model_1.VehicleMasterManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            return this.error.HasError;
        }
        else {
            return false;
        }
    }
    resetError(fieldName) {
        var id = transport_management_vehiclemaster_model_1.VehicleMasterManagementResponseType[fieldName];
        if (this.error.ErrorType === id) {
            this.error = new transport_management_vehiclemaster_model_1.VehicleMasterManagementResponse();
        }
    }
    preview(files, index) {
        if (files.length === 0)
            return;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            if (index === 0) {
                this.VehiclePhotoURL = reader.result;
            }
            else if (index === 1) {
                this.RegistrationCopyPhotoURL = reader.result;
            }
            else {
                this.InsuranceCopyPhotoURL = reader.result;
            }
        };
    }
    addImage(id, message) {
        this.loaderService.toggleLoader(true);
        const formData = new FormData();
        var vehicleFiles = this.VehiclePhotoInput.nativeElement.files;
        if (vehicleFiles.length !== 0) {
            for (const file of vehicleFiles) {
                formData.append('VehiclePhoto', file);
            }
        }
        var registrationCopyPhotoFiles = this.RegistrationCopyPhotoInput.nativeElement.files;
        if (registrationCopyPhotoFiles.length !== 0) {
            for (const file of registrationCopyPhotoFiles) {
                formData.append('RegistrationCopyPhoto', file);
            }
        }
        var insuranceCopyPhotoFiles = this.InsuranceCopyPhotoInput.nativeElement.files;
        if (insuranceCopyPhotoFiles.length !== 0) {
            for (const file of insuranceCopyPhotoFiles) {
                formData.append('InsuranceCopyPhoto', file);
            }
        }
        this.vehicleMasterService.addImages(id, formData).then(res => {
            this.snackBar.showSnackbar(message);
            this.router.navigate(['transportmanagement', 'vehiclemaster', 'list']);
            this.loaderService.toggleLoader(false);
        });
    }
    selectTab(tab) {
        this.selectedTab = tab;
    }
    addOrUpdateStaffDocument(staffId, message) {
        this.loaderService.toggleLoader(true);
        const files = this.documents.map(x => x.FileData);
        if (files.length !== 0) {
            const formData = new FormData();
            for (const file of files) {
                formData.append(file.name, file);
            }
            formData.append('model-document', JSON.stringify(this.documents));
            this.vehicleMasterService.addOrUpdateVehicleDocument(staffId, formData).then(res => {
                this.router.navigate(['transportmanagement', 'vehiclemaster', 'list']);
                this.snackBar.showSnackbar(message);
                this.loaderService.toggleLoader(false);
            });
        }
        else {
            this.router.navigate(['transportmanagement', 'vehiclemaster', 'list']);
            this.snackBar.showSnackbar(message);
            this.loaderService.toggleLoader(false);
        }
    }
    previewDocument() {
        var files = this.document.nativeElement.files;
        if (files && files[0]) {
            for (var i = 0; i < files.length; i++) {
                var doc = new transport_management_vehiclemaster_model_1.AddVehicleDocumentMappingAc();
                doc.File = files[i].name;
                doc.Name = files[i].name;
                doc.FileData = files[i];
                doc.FileType = this.fileTypes[1];
                this.documents.push(doc);
            }
        }
    }
    removeDocument(index) {
        this.documents.splice(index, 1);
    }
};
__decorate([
    core_1.ViewChild('VehiclePhotoInput'),
    __metadata("design:type", core_1.ElementRef)
], AddTransportManagementVehicleMasterComponent.prototype, "VehiclePhotoInput", void 0);
__decorate([
    core_1.ViewChild('RegistrationCopyPhotoInput'),
    __metadata("design:type", core_1.ElementRef)
], AddTransportManagementVehicleMasterComponent.prototype, "RegistrationCopyPhotoInput", void 0);
__decorate([
    core_1.ViewChild('InsuranceCopyPhotoInput'),
    __metadata("design:type", core_1.ElementRef)
], AddTransportManagementVehicleMasterComponent.prototype, "InsuranceCopyPhotoInput", void 0);
__decorate([
    core_1.ViewChild('document'),
    __metadata("design:type", core_1.ElementRef)
], AddTransportManagementVehicleMasterComponent.prototype, "document", void 0);
AddTransportManagementVehicleMasterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'transport-management-vehiclemaster-add.html'
    }),
    __metadata("design:paramtypes", [transport_management_vehiclemaster_service_1.VehicleMasterService, loader_service_1.LoaderService,
        router_1.Router, snackbar_service_1.SnackbarService])
], AddTransportManagementVehicleMasterComponent);
exports.AddTransportManagementVehicleMasterComponent = AddTransportManagementVehicleMasterComponent;
//# sourceMappingURL=transport-management-vehiclemaster-add.component.js.map
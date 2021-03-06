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
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../../shared/loader-service");
const snackbar_service_1 = require("../../../../shared/snackbar-service");
const finance_management_receipt_service_1 = require("../finance-management-receipt.service");
const finance_management_receipt_model_1 = require("../finance-management-receipt.model");
let AddFinanceManagementReceiptComponent = class AddFinanceManagementReceiptComponent {
    constructor(loaderService, snackbarService, financeManagementReceiptService, router) {
        this.loaderService = loaderService;
        this.snackbarService = snackbarService;
        this.financeManagementReceiptService = financeManagementReceiptService;
        this.router = router;
        this.addedFinanceReceipt = new finance_management_receipt_model_1.FinanceReceipts();
        this.incomeChartOfAccountsList = [];
        this.systemUsersList = [];
        this.currentDate = new Date();
        // Validations
        this.isEmptyCodeError = false;
        this.errorMessage = '';
    }
    ngOnInit() {
        this.getInitialData();
    }
    getInitialData() {
        this.loaderService.toggleLoader(true);
        this.financeManagementReceiptService.getFinanceReceiptCreationInitialData()
            .then(res => {
            let response = res.json();
            this.incomeChartOfAccountsList = response.incomeChartOfAccountsList;
            this.systemUsersList = response.systemUsersList;
            this.loggedInUserId = response.loggedInUserId;
            this.addedFinanceReceipt.receivedBy = this.loggedInUserId;
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    checkWhiteSpace() {
        if (this.addedFinanceReceipt.code !== null && this.addedFinanceReceipt.code !== undefined && this.addedFinanceReceipt.code.trim() === '') {
            this.isEmptyCodeError = true;
        }
    }
    resetError() {
        if (this.addedFinanceReceipt.code !== null && this.addedFinanceReceipt.code !== undefined && this.addedFinanceReceipt.code.trim() !== '') {
            this.isEmptyCodeError = false;
        }
    }
    addFinanceReceipt() {
        this.loaderService.toggleLoader(true);
        this.addedFinanceReceipt.receiptDate = this.convertDateToUtc(this.addedFinanceReceipt.receiptDate);
        this.financeManagementReceiptService.addNewFinanceReceipt(this.addedFinanceReceipt)
            .then(res => {
            let response = res.json();
            if (response.hasError === null || response.hasError === undefined || !response.hasError) {
                this.snackbarService.showSnackbar(response.message);
                this.router.navigate(['finance', 'receipt', 'list']);
            }
            else {
                this.errorMessage = response.message;
            }
            this.loaderService.toggleLoader(false);
        })
            .catch(err => {
            this.loaderService.toggleLoader(false);
        });
    }
    convertDateToUtc(dateString) {
        var date = new Date(dateString);
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }
};
AddFinanceManagementReceiptComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'finance-management-receipt-add.html'
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService,
        finance_management_receipt_service_1.FinanceManagementReceiptService,
        router_1.Router])
], AddFinanceManagementReceiptComponent);
exports.AddFinanceManagementReceiptComponent = AddFinanceManagementReceiptComponent;
//# sourceMappingURL=finance-management-receipt-add.component.js.map
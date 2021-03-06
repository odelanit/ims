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
const http_service_1 = require("../../../core/http.service");
let StageService = class StageService {
    constructor(http) {
        this.http = http;
        this.StageManagementUrl = 'api/transportationstagemanagement';
    }
    addStage(stage) {
        return this.http.post(this.StageManagementUrl, stage);
    }
    getStages() {
        return this.http.get(this.StageManagementUrl);
    }
    getStage(stageId) {
        return this.http.get(this.StageManagementUrl + '/' + stageId);
    }
    updateStage(stage) {
        return this.http.put(this.StageManagementUrl, stage);
    }
    getInitialData() {
        return this.http.get(this.StageManagementUrl + '/initialdata');
    }
};
StageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], StageService);
exports.StageService = StageService;
//# sourceMappingURL=transport-management-stage.service.js.map
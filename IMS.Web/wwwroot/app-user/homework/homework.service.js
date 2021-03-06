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
const http_service_1 = require("../../core/http.service");
let HomeworkService = class HomeworkService {
    constructor(http) {
        this.http = http;
        this.HomeworkManagementUrl = 'api/homeworkmanagement';
    }
    addOrUpdateHomework(homeWork) {
        return this.http.post(this.HomeworkManagementUrl, homeWork);
    }
    getHomework(getHomework) {
        return this.http.post(this.HomeworkManagementUrl + '/search', getHomework);
    }
    getInitialData() {
        return this.http.get(this.HomeworkManagementUrl + '/initialdata');
    }
    sendMessage(homeWorkMessage) {
        return this.http.post(this.HomeworkManagementUrl + '/message', homeWorkMessage);
    }
    sendMail(homeworkMail) {
        return this.http.post(this.HomeworkManagementUrl + '/mail', homeworkMail);
    }
    isLoggedInUserIsStaff() {
        return this.http.get('api/home/isstaff');
    }
    getStudentHomework(date) {
        return this.http.post(this.HomeworkManagementUrl + '/studenthomework', date);
    }
};
HomeworkService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], HomeworkService);
exports.HomeworkService = HomeworkService;
//# sourceMappingURL=homework.service.js.map
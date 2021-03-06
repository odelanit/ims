import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../../shared/loader-service';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { PermissionService } from '../../../../shared/permission.service';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../../shared/sidenav/sidenav.model';
import { MappingModel, ExamPaper, ClassModel, AcademicModel } from '../exampaper.model';
import { ExamPaperService } from '../exampaper.service';

@Component({
  moduleId: module.id,
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  classList: ClassModel[] = [];
  mappingList: MappingModel[] = [];
  academicYearList: AcademicModel[] = [];
  addExampaper: ExamPaper = new ExamPaper();
  classId: number;
  constructor(
    private loaderService: LoaderService,
    private snackbar: SnackbarService,
    private router: Router,
    private permissionService: PermissionService,
    private apiService: ExamPaperService) { }

  ngOnInit() {
    this.getClassList();
  }

  getClassList() {
    this.loaderService.toggleLoader(true);
    this.apiService.getClassList().then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.classList = response;
        this.getAcademicList();
      }
      else {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['library', 'exampapers']);
      }
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  getAcademicList() {
    this.apiService.getAcademicList().then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.academicYearList = response;
      }
      else {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['library', 'exampapers']);
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  isAllowed(type: string) {
    return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Finance, UserGroupFeatureChildEnum.FinanceBasicReciept, type);
  }

  onChangeClass(classId) {
    this.apiService.getMappingByClassId(classId).then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.mappingList = response;
      }
      else {
        this.snackbar.showSnackbar(response.message);
        this.router.navigate(['library', 'exampapers']);
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }

  add() {
    this.loaderService.toggleLoader(true);
    this.apiService.addExamPaper(this.addExampaper).then(res => {
      let response = res.json();
      if (response.hasError === null || response.hasError === undefined || !response.hasError) {
        this.router.navigate(['library', 'exampapers']);
      }
      else {
        this.snackbar.showSnackbar(response.message);
      }
      this.loaderService.toggleLoader(false);
    }).catch(error => {
      this.snackbar.showSnackbar(error.message);
      this.loaderService.toggleLoader(false);
    });
  }
}

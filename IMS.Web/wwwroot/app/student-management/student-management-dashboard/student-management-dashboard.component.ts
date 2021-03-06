﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CalendarView, CalendarEvent } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';

import { LoaderService } from '../../../shared/loader-service';
import { StudentManagementDashboardService } from './student-management-dashboard.service';
import { StaffNoticeManagementService } from '../../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.service';
import { PermissionService } from '../../../shared/permission.service';
import { StaffManagementHomeworkService } from '../../staff-management/staff-management-activities/staff-management-homework/staff-management-homework.service';
import { NoticeTypeEnum } from '../../staff-management/staff-management-activities/staff-management-notice/staff-management-notice.model';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from '../../../shared/sidenav/sidenav.model';

@Component({
    moduleId: module.id,
    templateUrl: 'student-management-dashboard.html'
})
export class StudentManagementDashboardComponent implements OnInit {

    activitiesList: any[] = [];
    noticeList: any[] = [];
    circularList: any[] = [];
    homeworksList: any[] = [];

    // Counts
    totalStudentsCount: number;
    activeStudentsCount: number;
    inActiveStudentsCount: number;
    terminatedStudentsCount: number;
    totalFeeCollected: number;
    totalFeeRefunded: number;

    // Pie chart
    pieChartLabels: string[] = [];
    pieChartData: number[] = [];
    pieChartType: string = 'pie';
    pieChartColor: any = [{
        backgroundColor: []
    }];
    pieChartOptions: any = {
        responsive: true,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        }
    };

    // Donut chart
    donutChartLabels: string[] = [];
    donutChartData: number[] = [];
    donutChartType: string = 'doughnut';
    donutChartColor: any = [{
        backgroundColor: []
    }];
    donutChartOptions: any = {
        responsive: true,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        }
    };

    // Bar chart
    // Common settings
    barChartType: string = 'bar';
    barChartLegend = false;
    barChartOptions: any = {
        responsive: true,
        scales: {
            xAxes: [{}], yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        }
    };
    // Class wise
    classWiseBarChartLabels: string[] = [];
    classWiseBarChartColor: any = [{
        backgroundColor: []
    }];
    classWiseBarChartData: any[] = [{
        data: [], label: ''
    }];
    // Active/Inactive
    activeWiseBarChartLabels: string[] = [];
    activeWiseBarChartColor: any = [{
        backgroundColor: []
    }];
    activeWiseBarChartData: any[] = [{
        data: [], label: ''
    }]

    // Calendar View
    view: CalendarView = CalendarView.Month;
    viewDate: Date = new Date();
    activeDayIsOpen: boolean = true;
    CalendarView = CalendarView;
    calendarEvents: CalendarEvent[] = [];
    calendarEventColors: any = {
        red: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
        },
        blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
        },
        yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA'
        }
    };

    constructor(private studentManagementDashboardService: StudentManagementDashboardService,
        private loaderService: LoaderService,
        private router: Router,
        private staffNoticeManagementService: StaffNoticeManagementService,
        private permissionService: PermissionService,
        private staffManagementHomeworkService: StaffManagementHomeworkService) { }

    ngOnInit() {
        this.getStudentDashboardData();
    }

    getStudentDashboardData() {
        this.loaderService.toggleLoader(true);
        this.studentManagementDashboardService.getStudentDashboardData()
            .then(res => {
                let response = res.json();
                
                // Set counts
                this.totalStudentsCount = response.totalStudentsCount;
                this.activeStudentsCount = response.activeStudentsCount;
                this.inActiveStudentsCount = response.inActiveStudentsCount;
                this.terminatedStudentsCount = response.terminatedStudentsCount;
                this.totalFeeCollected = response.totalFeeCollected;
                this.totalFeeRefunded = response.totalFeeRefunded;

                // Set pie chart data (Religion wise)
                this.pieChartLabels = response.religionWiseStudentPercentagesList.map(x => x.religionName);
                this.pieChartData = response.religionWiseStudentPercentagesList.map(x => x.studentStaffCount);
                this.pieChartData.forEach(() => {
                    this.pieChartColor[0].backgroundColor.push(this.getRandomColor());
                });

                // Set doghnut chart data (Gender wise)
                this.donutChartLabels = response.genderWiseStudentPercentagesList.map(x => x.gender);
                this.donutChartData = response.genderWiseStudentPercentagesList.map(x => x.studentStaffCount);
                this.donutChartData.forEach(() => {
                    this.donutChartColor[0].backgroundColor.push(this.getRandomColor());
                });

                // Set bar chart data (Class wise)
                this.classWiseBarChartLabels = response.classWiseStudentPercentagesList.map(x => x.className);
                this.classWiseBarChartData[0].data = response.classWiseStudentPercentagesList.map(x => x.studentStaffCount);
                this.classWiseBarChartData[0].data.forEach(() => {
                    this.classWiseBarChartColor[0].backgroundColor.push(this.getRandomColor());
                });

                // Set bar chart data (Active/Inactive)
                this.activeWiseBarChartLabels = response.activeInactiveStudentPercentagesList.map(x => x.activity);
                this.activeWiseBarChartData[0].data = response.activeInactiveStudentPercentagesList.map(x => x.studentStaffCount);
                this.activeWiseBarChartData[0].data.forEach(() => {
                    this.activeWiseBarChartColor[0].backgroundColor.push(this.getRandomColor());
                });

                // Calendar view data
                this.calendarEvents = [];
                // Activities
                this.activitiesList = response.activityList;
                this.activitiesList.forEach(activity => {
                    let event: any = {
                        id: activity.id,
                        type: 'activity',
                        start: new Date(activity.startDate),
                        end: new Date(activity.endDate),
                        title: activity.name,
                        color: this.calendarEventColors.red
                    };
                    this.calendarEvents.push(event);
                });

                this.getCircularNotice();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    getCircularNotice() {
        this.loaderService.toggleLoader(true);
        this.staffNoticeManagementService.getAllNotices()
            .then(res => {
                let response = res.json();
                this.noticeList = response.filter(x => x.noticeType === NoticeTypeEnum.Notice);
                this.circularList = response.filter(x => x.noticeType === NoticeTypeEnum.Circular);

                this.getHomeworks();
                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    getHomeworks() {
        this.loaderService.toggleLoader(true);
        this.staffManagementHomeworkService.getAllHomeworks()
            .then(res => {
                let response = res.json();

                response.forEach(homework => {
                    homework.homeworkSubjectMappings.forEach(homeworkData => {
                        this.homeworksList.push({
                            staff: homework.staff.firstName,
                            homework: homeworkData.homeworkData,
                            homeworkDate: homework.homeworkDate
                        });
                    });
                });

                this.loaderService.toggleLoader(false);
            })
            .catch(err => {
                this.loaderService.toggleLoader(false);
            });
    }

    getRandomColor(): string {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    handleEvent(action: string, event: any): void {
        if (event.type === 'activity') {
            this.router.navigate(['staff', 'activities', event.type, event.id]);
        }
        else if (event.type === 'planner') {
            this.router.navigate(['staff', event.type, event.id]);
        }
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
            }
        }
    }

    isAllowed(type: string) {
        return this.permissionService.isAllowed(UserGroupFeatureParentEnum.Staff, UserGroupFeatureChildEnum.CircularNotice, type);
    }
}

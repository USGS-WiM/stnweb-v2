import { Component, OnInit } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CurrentUserService } from '@services/current-user.service';
import { AuthenticationService } from '@services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { StateService } from '@services/state.service';
import { NetworkNameService } from '@services/network-name.service';
import { SensorTypeService } from '@services/sensor-type.service';
import { APP_SETTINGS } from './app.settings';
import { Member } from '@interfaces/member';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'STN';

    public currentUser;

    constructor(
        public dialog: MatDialog,
        private authenticationService: AuthenticationService,
        public currentUserService: CurrentUserService,
        public StateService: StateService,
        public NetworkNameService: NetworkNameService,
        public SensorTypeService: SensorTypeService
    ) {
        currentUserService.currentUser.subscribe((user) => {
            this.currentUser = user;
        });
    }

    openAboutDialog(): void {
        const dialogRef = this.dialog.open(AboutComponent, {});
        dialogRef.afterClosed().subscribe((result) => {});
    }

    openLoginDialog(): void {
        const dialogRef = this.dialog.open(LoginComponent, {});

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
        });
    }

    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
            const currentUserObj = JSON.parse(
                localStorage.getItem('currentUser')
            );
            this.currentUserService.updateCurrentUser(currentUserObj);
        } else {
            this.currentUserService.updateCurrentUser({
                fname: '',
                lname: '',
                username: '',
            });
            this.openLoginDialog();
        }
    }

    logout() {
        // remove user from local storage to log user out
        this.authenticationService.logout();
        // console.log('logged out');
    }
}

import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ViewerTableComponent} from './viewer-table/viewer-table.component';

const appRoutes: Routes = [
    {path: 'table', component: ViewerTableComponent},
    {path: '**', component: MainComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(
        appRoutes
    ), ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

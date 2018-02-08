import {BrowserModule} from '@angular/platform-browser';
import {HttpModule,} from '@angular/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PerformanceComponent} from './performance/performance.component';
import {PerformanceService} from './services/performace.service';
import {PropertiesPipe} from './pipes/properties.pipe';
import {SessionComponent} from './performance/session/session.component';
import {SceneComponent} from './performance/session/scene/scene.component';
import {MouseWheelDirective} from './performance/session/scene/mousewheel.directive';
import {ViewerComponent} from './performance/session/scene/viewer/viewer.component';
import {DateTransformPipe} from './pipes/date-transform.pipe';
import {AppRoutingModule} from './app-routing.module';
import { MainComponent } from './main/main.component';
import { ViewerTableComponent } from './viewer-table/viewer-table.component';

@NgModule({
    declarations: [
        AppComponent,
        PerformanceComponent,
        PropertiesPipe,
        SessionComponent,
        SceneComponent,
        MouseWheelDirective,
        ViewerComponent,
        DateTransformPipe,
        MainComponent,
        ViewerTableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule
    ],
    providers: [PerformanceService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PerformanceComponent } from './performance/performance.component';
import { PerformanceService } from './services/performace.service';
import { PropertiesPipe } from './pipes/properties.pipe';
import { SessionComponent } from './performance/session/session.component';
import { SceneComponent } from './performance/session/scene/scene.component';
import { MouseWheelDirective  } from './performance/session/scene/mousewheel.directive';
import { ViewerComponent } from './performance/session/scene/viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    PerformanceComponent,
    PropertiesPipe,
    SessionComponent,
    SceneComponent,
    MouseWheelDirective,
    ViewerComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [PerformanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

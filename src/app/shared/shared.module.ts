import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { SearchPipe } from './pipes/search.pipe';
import { ProgressSpinnerComponent } from "./components/progress-spinner/progress-spinner.component";
import { LoaderComponent } from "./components/loader/loader.component";

@NgModule({
    declarations: [
      SearchPipe,
      ProgressSpinnerComponent, // надо регистрировать тут потому что этот компонент будет исп-ся в app.module и admin.module
      LoaderComponent
    ],
    imports: [HttpClientModule],
    exports: [
      HttpClientModule,
      SearchPipe,
      ProgressSpinnerComponent,
      LoaderComponent
    ]
})
export class SharedModule { }
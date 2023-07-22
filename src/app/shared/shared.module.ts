import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    imports: [HttpClientModule],
    exports: [
      HttpClientModule,
      SearchPipe
    ],
    declarations: [
      SearchPipe
    ]
})
export class SharedModule { }
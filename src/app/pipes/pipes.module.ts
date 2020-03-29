import { NgModule } from "@angular/core";
import { ImagePipe } from "./image.pipe";
import { AuthPipe } from './auth.pipe';

@NgModule({
  declarations: [ImagePipe, AuthPipe],
  imports: [],
  exports: [ImagePipe, AuthPipe]
})
export class PipesModule {}

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxValidationMessageComponent } from './validation-message/validation-message.component';
import { MinValueDirective } from './validators/min-value.directive';
import { MaxValueDirective } from './validators/max-value.directive';
import { EmailComposerComponent } from './email-composer/email-composer.component';
import { ThemeModule } from '../@theme/theme.module';
import { CoreModule } from '../@core/core.module';
import { NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { NameColorPipe } from './pipes/name-color.pipe';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

const COMPONENTS = [
  NgxValidationMessageComponent, MinValueDirective, MaxValueDirective, NameColorPipe,
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbInputModule,
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS, EmailComposerComponent, NameColorPipe, DialogConfirmComponent],
  entryComponents: [EmailComposerComponent, DialogConfirmComponent],
})
export class ComponentsModule {
}

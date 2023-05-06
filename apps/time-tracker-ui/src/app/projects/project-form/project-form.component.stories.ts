import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig } from '@storybook/angular';
import { ProjectFormComponent } from './project-form.component';

export default {
  title: 'ProjectFormComponent',
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  component: ProjectFormComponent,
};

export const Primary = {
  args: {},
};

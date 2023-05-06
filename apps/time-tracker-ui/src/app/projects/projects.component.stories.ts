import { Meta } from '@storybook/angular';
import { ProjectsComponent } from './projects.component';

export default {
  title: 'ProjectsComponent',
  component: ProjectsComponent,
} as Meta<ProjectsComponent>;

export const Primary = {
  render: (args: ProjectsComponent) => ({
    props: args,
  }),
  args: {},
};

import { Meta } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';

export default {
  title: 'SidebarComponent',
  component: SidebarComponent,
} as Meta<SidebarComponent>;

export const Primary = {
  render: (args: SidebarComponent) => ({
    props: args,
  }),
  args: {},
};

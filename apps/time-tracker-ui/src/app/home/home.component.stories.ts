import { Meta } from '@storybook/angular';
import { HomeComponent } from './home.component';

export default {
  title: 'HomeComponent',
  component: HomeComponent,
} as Meta<HomeComponent>;

export const Primary = {
  render: (args: HomeComponent) => ({
    props: args,
  }),
  args: {},
};

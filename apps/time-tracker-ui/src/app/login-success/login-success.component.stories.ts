import { Meta } from '@storybook/angular';
import { LoginSuccessComponent } from './login-success.component';

export default {
  title: 'LoginSuccessComponent',
  component: LoginSuccessComponent,
} as Meta<LoginSuccessComponent>;

export const Primary = {
  render: (args: LoginSuccessComponent) => ({
    props: args,
  }),
  args: {},
};

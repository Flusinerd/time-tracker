import { Meta } from '@storybook/angular';
import { LoginFailureComponent } from './login-failure.component';

export default {
  title: 'LoginFailureComponent',
  component: LoginFailureComponent,
} as Meta<LoginFailureComponent>;

export const Primary = {
  render: (args: LoginFailureComponent) => ({
    props: args,
  }),
  args: {},
};

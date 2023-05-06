import { provideAnimations } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';

export const withAnimations = (storyFn: any) => {
  return {
    ...storyFn(),
    ...moduleMetadata({
      providers: [provideAnimations()],
    }),
  };
};

import { initialState, projectsReducer } from './projects.reducer';

describe('Projects Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = projectsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

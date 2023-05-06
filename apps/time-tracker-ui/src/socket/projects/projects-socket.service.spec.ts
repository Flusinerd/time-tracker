import { TestBed } from '@angular/core/testing';

import { ProjectsSocketService } from './projects-socket.service';

describe('ProjectsSocketService', () => {
  let service: ProjectsSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

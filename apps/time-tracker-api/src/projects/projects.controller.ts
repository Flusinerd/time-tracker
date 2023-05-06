import { Body, Controller, Post } from '@nestjs/common';
import { CreateProjectDto } from '@time-tracker/model';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }
}

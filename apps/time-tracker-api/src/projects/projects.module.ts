import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { ProjectsGateway } from './projects.gateway';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [DbModule],
  providers: [ProjectsService, ProjectsGateway, ProjectsGateway],
  controllers: [ProjectsController],
})
export class ProjectsModule {}

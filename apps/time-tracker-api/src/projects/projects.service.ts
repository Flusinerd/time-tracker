import { Injectable } from '@nestjs/common';
import { ProjectDto, UpdateProjectDto } from '@time-tracker/model';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { CreateProjectDto } from '../../../../libs/model/src/lib/create-project.dto';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class ProjectsService {
  private readonly _projects = new BehaviorSubject<ProjectDto[]>([]);

  public readonly projects$ = this._projects.asObservable();

  constructor(private readonly prismaService: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    // Persist the project to the database
    const project = await this.prismaService.project.create({
      data: createProjectDto,
    });

    const projectDto = plainToClass(ProjectDto, project);

    // Publish the project to the stream
    this._projects.next([...this._projects.value, projectDto]);
  }

  async findAll() {
    return await this.prismaService.project.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.project.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.prismaService.project.update({
      where: {
        id,
      },
      data: updateProjectDto,
    });

    const projectDto = plainToClass(ProjectDto, project);

    const projects = this._projects.value;
    const index = projects.findIndex((p) => p.id === id);
    projects[index] = projectDto;

    this._projects.next(projects);
  }

  async remove(id: string) {
    await this.prismaService.project.delete({
      where: {
        id,
      },
    });

    const projects = this._projects.value;
    const index = projects.findIndex((p) => p.id === id);
    projects.splice(index, 1);

    this._projects.next(projects);
  }
}

import { Project } from '@prisma/client';

export class ProjectDto implements Project {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { BehaviorSubject, map, shareReplay, tap, withLatestFrom } from 'rxjs';
import { Socket } from 'socket.io';
import { ProjectsService } from './projects.service';

type Client = {
  id: string;
  socket: Socket;
  authenticated: boolean;
};

@WebSocketGateway({ path: '/api/socket.io', cors: { origin: '*' } })
export class ProjectsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ProjectsGateway.name);
  private readonly clients$ = new BehaviorSubject<Client[]>([]);
  private readonly authenticatedClients$ = this.clients$.pipe(
    map((clients) => clients.filter((c) => c.authenticated)),
    shareReplay(1)
  );

  async handleConnection(client: Socket, ...args: any[]) {
    // Check if the client is authenticated by checking the accessToken cookie
    const accessToken = client.handshake.headers.cookie
      ?.split(';')
      .find((c) => c.startsWith('accessToken'));
    if (!accessToken) {
      this.logger.log(`Client not authenticated: ${client.id}`);
      client.disconnect();
      return;
    }

    // Send the projects to the client
    const projects = await this.projectsService.findAll();
    client.emit('projects', projects);

    this.clients$.next([
      ...this.clients$.value,
      {
        id: client.id,
        socket: client,
        authenticated: true,
      },
    ]);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const clients = this.clients$.value;
    const index = clients.findIndex((c) => c.id === client.id);
    clients.splice(index, 1);
    this.clients$.next(clients);
  }

  constructor(private projectsService: ProjectsService) {
    this.listenForProjects();
  }

  listenForProjects() {
    this.projectsService.projects$
      .pipe(
        withLatestFrom(this.authenticatedClients$),
        tap(([projects, clients]) => {
          clients.forEach((client) => {
            client.socket.emit('projects', projects);
          });
        })
      )
      .subscribe();
  }
}

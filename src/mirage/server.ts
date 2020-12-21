import { belongsTo, Factory, hasMany, Model, Server } from 'miragejs';

export const setupServer = (env?: string): Server => {
  return new Server({
    environment: env ?? 'development',

    models: {
      entry: Model.extend({
        diary: belongsTo(),
      }),
      diary: Model.extend({
        entry: hasMany(),
        user: belongsTo(),
      }),
      user: Model.extend({
        diary: hasMany(),
      }),
    },

    factories: {
      user: Factory.extend({
        username: 'test',
        password: 'password',
        email: 'test@abc.com',
      }),
    },

    seeds: (server): any => {
      server.create('user');
    },

    routes(): void {
        this.urlPrefix = 'https://diaries.app'
    }
  });
};



export const authSettings = {
  guest: {
    view: ['current-user'],
    edit: ['current-user'],
  },
  user: {
    parent: 'guest',
      view: ['current-user'],
      edit: ['current-user'],
  },
  admin: {
    parent: 'user',
      view: ['current-user', 'users'],
      edit: ['current-user', 'users'],
  },
};

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';

import Customer from './models/customer.model.js';
import Product from './models/product.model.js';
import User from './models/user.model.js';

AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS({
  resources: [
    {
      resource: Customer,
      options: {
        properties: {
          createdAt: { isVisible: { list: true, edit: false, filter: true, show: true } },
          updatedAt: { isVisible: { list: true, edit: false, filter: true, show: true } },
        },
        actions: {
          new: { isAccessible: (req) => req.user?.role === 'Admin' },
          edit: { isAccessible: (req) => req.user?.role === 'Admin' },
          delete: { isAccessible: (req) => req.user?.role === 'Admin' },
        },
      },
    },
    {
      resource: Product,
      options: {
        properties: {
          createdAt: { isVisible: { list: true, edit: false, filter: true, show: true } },
          updatedAt: { isVisible: { list: true, edit: false, filter: true, show: true } },
        },
        actions: {
          new: { isAccessible: (req) => req.user?.role === 'Admin' },
          edit: { isAccessible: (req) => req.user?.role === 'Admin' },
          delete: { isAccessible: (req) => req.user?.role === 'Admin' },
        },
      },
    },
  ],
  rootPath: '/admin',
});

const buildAdminRouter = (app) => {
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && await user.comparePassword(password)) {
        if (user.role === 'Admin') {
          return { email: user.email, role: user.role };
        }
        return null;
      }
      return null;
    },
    cookiePassword: 'session-secret',
  }, null, {
    resave: false,
    saveUninitialized: false,
  });

  app.use(adminJs.options.rootPath, adminRouter);
};

export default buildAdminRouter;

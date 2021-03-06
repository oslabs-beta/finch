const client = require('../kubernetes-config');

module.exports = {
  getPods: async (req, res, next) => {
    try {
      res.locals.pods = (await client.api.v1.pods.get()).body.items;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in PodController.getPods: ${err}`,
        status: 400,
        message: 'An error occured fetching pods',
      });
    }
  },
  updatePod: async (req, res, next) => {
    const namespace = req.body.namespace || 'default';
    try {
      await client.api.v1
        .namespaces(namespace)
        .pods(req.query.name)
        .put({ body: req.body });
      next();
    } catch (err) {
      next({
        log: `Encountered an error in podController.update: ${err}`,
        status: 500,
        message: 'An error occured updating the pod',
      });
    }
  },

  deletePod: async (req, res, next) => {
    try {
      const { name } = req.query;
      const namespace = req.query.namespace || 'default';
      await client.api.v1.namespaces(namespace).pods(name).delete();
      next();
    } catch (err) {
      next({
        log: `Encountered an error in podController.delete: ${err}`,
        status: 500,
        message: 'An error occured deleting the pod',
      });
    }
  },
};

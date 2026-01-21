/* eslint-disable no-console */
// @ts-ignore
import cors from 'cors';
import express from 'express';
import http from 'http';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

export const startDevServer = async (
  config: webpack.Configuration[],
  port: number,
) => {
  const app = express();
  const [config1, config2] = config;
  const compiler1 = webpack(config1);
  const compiler2 = webpack(config2);
  app.use(cors());
  app.use(
    webpackDevMiddleware(compiler1, {
      publicPath: config1.output!.publicPath,
    }),
  );
  app.use(
    webpackDevMiddleware(compiler2, {
      publicPath: `${config2.output!.publicPath}worker/`,
    }),
  );
  const httpServer = http.createServer(app);
  httpServer.listen(port);
  console.log(`server listening to ${port}...\n`);
};

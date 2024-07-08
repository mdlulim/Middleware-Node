import {initTracer} from 'jaeger-client';
import {Tracer} from 'opentracing';

// import { createLogger } from './logging';
import config from './config';
// const logger = createLogger('tracer');

const jaegerConfig = config.get('jaeger');

const tracerConfig = {
  serviceName: 'mobile-app-server',
  disable: !jaegerConfig.enabled,
  // Jaeger is only used in dev so enable const sampler
  sampler: {
    type: 'const',
    param: 1,
  },
  reporter:
    config.get('env') !== 'production'
      ? {
          // Use http locally due to udp issues
          collectorEndpoint: `http://${jaegerConfig.agentHost}:14268/api/traces`,
        }
      : {
          agentHost: jaegerConfig.agentHost,
        },
};

const options = {
  tags: {
    // TODO: pull version from package.json
    // 'my-awesome-service.version': '1.1.2',
  },
  // metrics: metrics,
  // logger: {
  //   info(message: string) {
  //     logger.info({ message });
  //   },
  //   error(message: string) {
  //     logger.error({ message });
  //   },
  // },
};

//@ts-ignore
const tracer: Tracer = initTracer(tracerConfig, options);

export default tracer;

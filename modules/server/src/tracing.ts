import {LogLevel} from '@opentelemetry/core';
import {NodeTracerProvider} from '@opentelemetry/node';
import {JaegerExporter} from '@opentelemetry/exporter-jaeger';
import {BatchSpanProcessor} from '@opentelemetry/tracing';
import {Meter, NOOP_METER_PROVIDER} from '@opentelemetry/api';
import {PrometheusExporter} from '@opentelemetry/exporter-prometheus';
import {MeterProvider} from '@opentelemetry/metrics';
import config from '../src/config';

const prometheusEnabled = config.get('prometheus').enabled;

function register() {
  const provider: NodeTracerProvider = new NodeTracerProvider({
    logLevel: LogLevel.ERROR,
  });

  const spanExporter = new JaegerExporter({
    serviceName: 'web',
    tags: [],
    host: 'localhost',
    port: 6832,
  });

  // TODO: should we just use? https://github.com/open-telemetry/opentelemetry-collector
  // TODO: replace this with azure solution when available
  // https://github.com/microsoft/opentelemetry-azure-monitor-js#metrics
  const promExporter = new PrometheusExporter({
    port: 9464,
    startServer: prometheusEnabled,
  });

  // Register the exporter
  const meter = new MeterProvider({
    exporter: promExporter,
    interval: 1000,
  }).getMeter('ssp');

  // Add the exporter to the provider
  provider.addSpanProcessor(
    new BatchSpanProcessor(spanExporter, {
      bufferTimeout: 15000,
      bufferSize: 1000,
    })
  );
  provider.register();

  return {meter};
}

export let _meter: Meter | null = null;

if (process.env.NODE_ENV !== 'test') {
  _meter = register().meter;
} else {
  _meter = NOOP_METER_PROVIDER.getMeter();
}

export const meter = _meter;

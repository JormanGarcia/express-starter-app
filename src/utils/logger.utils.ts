import _log from 'npmlog';

type LogFunction = (scope: string, msg: any) => void;

interface ILog {
  info: LogFunction;
  fatal: LogFunction;
  debug: LogFunction;
  warn: LogFunction;
}

export const log: ILog = {
  info(scope: string, msg: any) {
    _log.info('#' + scope, msg);
  },
  fatal(scope: string, msg: any) {
    _log.error('#' + scope, msg);
  },
  warn(scope: string, msg: any) {
    _log.warn('#' + scope, msg);
  },
  debug(scope: string, msg: any) {
    if (process.env.NODE_ENV !== 'development') return;
    _log.info('#' + scope, msg);
  },
};

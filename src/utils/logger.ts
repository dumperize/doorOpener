enum LoggerVariant {
  INFO = 'info',
}

type LoggerMessage = string | Record<string, unknown>;

// @ts-ignore
const defaultNodeLogger = console;

export const logger: Record<LoggerVariant, (loggerMessage: LoggerMessage) => void> = {
  [LoggerVariant.INFO]: (message) => defaultNodeLogger.info(message),
};

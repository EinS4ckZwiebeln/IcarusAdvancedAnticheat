import * as winston from "winston";
import "winston-daily-rotate-file";
import { Utility } from "../../util/Utility";

/**
 * A static class for logging messages to files.
 */
export class Logger {
	private static _logger: winston.Logger;
	private constructor() {}

	/**
	 * Initializes the logger with two transports: one for debug logs and one for error logs.
	 * @returns void
	 */
	public static init(): void {
		const path: string = GetResourcePath(Utility.RESOURCE_NAME);

		const rotatedDebugLog = new winston.transports.DailyRotateFile({
			filename: `${path}/logs/debug-%DATE%.log`,
			datePattern: "YYYY-MM-DD",
			maxFiles: "14d",
			level: "debug",
		});

		const rotatedErrorLog = new winston.transports.DailyRotateFile({
			filename: `${path}/logs/error-%DATE%.log`,
			datePattern: "YYYY-MM-DD",
			maxFiles: "14d",
			level: "error",
		});

		this._logger = winston.createLogger({
			level: "info",
			format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
			transports: [rotatedDebugLog, rotatedErrorLog],
		});
	}

	/**
	 * Logs a debug message.
	 * @param message - The message to log.
	 * @returns void
	 */
	public static debug(message: string): void {
		this._logger.debug(message);
	}

	/**
	 * Logs an error message.
	 * @param message - The message to log.
	 * @returns void
	 */
	public static error(message: string): void {
		this._logger.error(message);
	}

	/**
	 * Logs a message with the specified level.
	 * @param message - The message to log.
	 * @param level - The level of the message.
	 * @returns void
	 */
	public static log(message: string, level: string): void {
		this._logger.log(message, level);
	}
}

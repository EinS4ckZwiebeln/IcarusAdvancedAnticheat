/**
 * Represents a set of deferral actions.
 */
export type Deferrals = {
	/**
	 * Defers the execution of the script.
	 */
	defer: () => void;
	/**
	 * Updates the deferral message.
	 * @param message - The new message to display.
	 */
	update: (message: string) => void;
	/**
	 * Presents a card to the user.
	 * @param card - The card object or string representation.
	 * @param cb - Optional callback function to handle the card data and raw data.
	 */
	presentCard: (card: object | string, cb?: (data: object, rawData: string) => void) => void;
	/**
	 * Marks the deferral as done.
	 * @param failureReason - Optional reason for deferral failure.
	 */
	done: (failureReason?: string) => void;
};

/**
 * Represents a deferrals config object.
 */
export type DeferralsObject = {
	enabled: boolean;
	rejectionMsg: string;
};

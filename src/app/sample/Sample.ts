module app.sample {

	'use strict';

	/**
	 * Sample TypeScript class
	 */
	export class Sample {

		/**
		 * Initialize a sample with items.
		 * @param data  the inital set of items in the sample.
		 */
		constructor(private data: string[]) {
		}

		/**
		 * Add an item to the sample.
		 * @param item  the item 
		 */
		addItem(item: string) {
			this.data.push(item);
		}

		/**
		 * List all items in the sample.
		 * @return a shallow copy of the items contained in the sample.
		 */
		list(): string[] {
			return this.data.slice(0);
		}

		/**
		 * Count the items in the sample.
		 * @return The number of items in the sample.
		 */
		count(): number {
			return this.data.length;
		}

	}
}

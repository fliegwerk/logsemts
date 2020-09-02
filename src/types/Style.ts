/**
 * Interface defining a style in which text should get logged to the console (background and text color)
 */
export interface StyleInterface {
	/**
	 * The text color
	 */
	color: string;
	/**
	 * The background color
	 */
	background: string;
	/**
	 * The generated CSS for the style
	 */
	readonly css: string;
}

/**
 * Defines a style in which something should get logged to the console.
 *
 * @example ```ts
 * {
 *     color: 'white',
 *     background: 'red'
 * }
 */
export class Style implements StyleInterface {
	/**
	 * Create a new Style
	 * @param color the text color. Must be a valid CSS color property
	 * @param background the background color. Must be a valid CSS color property
	 *
	 * @example ```ts
	 * const errorStyle = new Style('white', 'red');
	 * const successStyle = newStyle('white', '#007700');
	 * ```
	 */
	constructor(public color: string, public background: string) {}

	/**
	 * Get the CSS necessary for this styling. This, additionally, applies `font-weight: bold` to the styles.
	 *
	 * @returns A valid CSS string for the style, cf. example
	 *
	 * @example ```ts
	 * 'color: white; background-color: red; font-weight:bold'
	 * ```
	 */
	get css(): string {
		return `color: ${this.color}; background-color: ${this.background}; font-weight: bold;`;
	}

	/**
	 * Function that gets used when calling `JSON.stringify()`.
	 *
	 * Overwritten in order to include the {@link css} accessor in the serialized styles.
	 *
	 * @returns Serializable form of the style, cf. example
	 *
	 * @example ```json
	 * {
	 *     "color": "white",
	 *     "background": "red",
	 *     "css": "color: white; background-color: red; font-weight:bold"
	 * }
	 * ```
	 */
	toJSON() {
		return { color: this.color, background: this.background, css: this.css };
	}
}

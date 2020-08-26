export interface StyleInterface {
	color: string;
	background: string;
	readonly css: string;
}

/**
 *
 */
export default class Style implements StyleInterface {
	constructor(public color: string, public background: string) {}

	get css() {
		return `color: ${this.color}; background-color: ${this.background}; font-weight: bold;`;
	}

	toJSON() {
		return { color: this.color, background: this.background, css: this.css };
	}
}

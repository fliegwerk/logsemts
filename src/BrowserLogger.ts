import { StyleInterface as Style } from './types/Style';

export default function BrowserLogger(
	type: string,
	style: Style,
	componentName: string,
	componentStyle: Style,
	...args: any[]
) {
	console.log(
		`%c ${type} %c ${componentName} `,
		style.css,
		componentStyle.css,
		...args
	);
}

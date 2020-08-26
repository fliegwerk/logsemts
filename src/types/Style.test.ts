import Style from './Style';

describe('Style', () => {
	let style: Style;

	beforeEach(() => {
		style = new Style('blue', 'black');
	});

	it('should get created correctly', () => {
		expect(style).toBeTruthy();
		expect(style).toBeInstanceOf(Style);
	});

	it('should return the correct CSS code', () => {
		expect(style.css).toContain('color: blue; background-color: black;');
	});

	it('should serialize correctly', () => {
		const serializedStyle = JSON.parse(JSON.stringify(style));

		expect(serializedStyle).toHaveProperty('color');
		expect(serializedStyle).toHaveProperty('background');
		expect(serializedStyle).toHaveProperty('css');
	});
});

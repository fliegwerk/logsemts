import { deserialize, serialize } from './cyclic-serializer';

describe('serialize()', () => {
	it('should serialize cyclic properties', () => {
		let a: any = {};
		a['b'] = { a };

		expect(a).toMatchSnapshot('a');
		const serialized = JSON.parse(serialize(a));

		expect(serialized).toMatchSnapshot('serialized a');

		expect(serialized.pool).toHaveLength(2);
		expect(serialized.pool).toContainEqual({});

		expect(serialized.pointers).toHaveProperty('', 0);
		expect(serialized.pointers).toHaveProperty('->b', 1);
		expect(serialized.pointers).toHaveProperty('->b->a', 0);
	});

	it('should serialize strings', () => {
		expect(serialize('abc')).toMatchSnapshot();
	});

	it('should serialize numbers', () => {
		expect(serialize(3)).toMatchSnapshot();
	});

	it('should serialize booleans', () => {
		expect(serialize(true)).toMatchSnapshot();
		expect(serialize(false)).toMatchSnapshot();
	});

	it('should serialize arrays', () => {
		expect(serialize(['abc', 'cde'])).toMatchSnapshot();
	});

	it('should serialize two references to the same array', () => {
		let arr = [1, 2];
		const serialized = serialize([arr, arr]);
		expect(serialized).toMatchSnapshot();
		expect(typeof serialized).toBe('string');
	});

	it('should serialize functions to strings', () => {
		const serialized = serialize(() => console.log('Hello World!'));
		expect(serialized).toMatchSnapshot();
		expect(typeof serialized).toBe('string');
		expect(JSON.parse(serialized).types[0]).toBe('function');
		expect(typeof JSON.parse(serialized).pool[0]).toBe('string');
	});

	it('should serialize symbols to strings', () => {
		const serialized = serialize(Symbol('abc'));
		expect(serialized).toMatchSnapshot();
		expect(typeof serialized).toBe('string');
		expect(JSON.parse(serialized).types[0]).toBe('symbol');
		expect(typeof JSON.parse(serialized).pool[0]).toBe('string');
	});

	it('should serialize null', () => {
		const serialized = serialize(null);
		expect(serialized).toMatchSnapshot();
		expect(typeof serialized).toBe('string');
	});

	it('should serialize undefined', () => {
		const serialized = serialize(undefined);
		expect(serialized).toMatchSnapshot();
		expect(typeof serialized).toBe('string');
	});

	it('should serialize a regular expression', () => {
		const serialized = serialize(/fwjeofj/g);
		expect(serialized).toMatchSnapshot();
		expect(typeof serialized).toBe('string');
	});

	it('should serialize a Date', () => {
		const serialized = serialize(new Date(2000, 1, 1));
		expect(serialized).toMatchSnapshot();
		expect(typeof serialized).toBe('string');
	});
});

describe('deserialize()', () => {
	it('should deserialize cyclic properties', () => {
		const serialized = {
			pointers: {
				'': 0,
				'->b': 1,
				'->b->a': 0
			},
			pool: [{}, {}],
			types: ['object', 'object']
		};

		const deserialized = deserialize(JSON.stringify(serialized));
		expect(deserialized).toMatchSnapshot('deserialized');
		expect(deserialized['b']['a']).toBe(deserialized);
	});

	it('should deserialize undefined', () => {
		const serialized = { pool: [], pointers: {} };
		expect(deserialize(JSON.stringify(serialized))).toBeUndefined();
	});

	it('should deserialize a BigInt', () => {
		const intString = '8402384023802384032843023840';
		const serialized = {
			pool: [intString],
			pointers: { '': 0 },
			types: ['bigint']
		};

		let deserialized = deserialize(JSON.stringify(serialized));

		expect(typeof deserialized).toBe('bigint');
		expect(deserialized.toString()).toBe(intString);
	});

	it('should deserialize a regular expression', () => {
		const regExpStr = '/abc/g';
		const serialized = {
			pool: [regExpStr],
			pointers: { '': 0 },
			types: ['regexp']
		};

		let deserialized = deserialize(JSON.stringify(serialized));

		expect(deserialized).toBeInstanceOf(RegExp);
		expect(deserialized.toString()).toBe(regExpStr);
	});

	it('should throw when trying to deserialize an invalid regular expression', () => {
		const invalidRegExpStr = 'notARegExp';

		const serialized = JSON.stringify({
			pool: [invalidRegExpStr],
			pointers: { '': 0 },
			types: ['regexp']
		});

		expect(() => deserialize(serialized)).toThrow();
	});

	it('should deserialize a regular expression', () => {
		const dateStr =
			'Tue Feb 01 2000 00:00:00 GMT+0100 (Mitteleuropäische Normalzeit)';
		const serialized = {
			pool: [dateStr],
			pointers: { '': 0 },
			types: ['Date']
		};

		let deserialized = deserialize(JSON.stringify(serialized));

		expect(deserialized).toBeInstanceOf(Date);
		expect(deserialized.toString()).toBe(dateStr);
	});
});

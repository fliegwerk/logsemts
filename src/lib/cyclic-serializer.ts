/**
 * @author Pablo Klaschka
 *
 * @packageDocumentation
 *
 * @example ```ts
 * let a = {};
 * let b = { a:a }
 * a['b'] = a;
 *
 * JSON.stringify(a); // throws Error because of cyclic dependency
 *
 * // serialize a, which returns "instructions" for re-building its structure
 * const serialized = serialize(a);
 *
 * // rebuild a's structure from "instructions"
 * const deserialized = deserialize(serialized);
 *
 * console.log(deserialized); // logs the "correct" structure
 * ```
 */

/**
 * A  JSON-based transport format with support for
 * - cyclic dependencies: `a['b']['a'] === a`
 * - `RegExp`
 * - `Symbol`
 * - `BigInt`
 * - `Date`
 *
 * ### Special cases
 * - functions get converted to strings (using their `.toString()` method)
 * - Regular expressions (`RegExp`) get converted to strings
 * - Symbols get converted to strings
 *
 * @see {@link serialize}
 * @see {@link deserialize}
 *
 * @example ```ts
 * let a = {};
 * let b = { a:a }
 * a['b'] = a;
 *
 * JSON.stringify(a); // throws Error because of cyclic dependency
 *
 * // serialize a, which returns "instructions" for re-building its structure
 * const serialized = serialize(a);
 *
 * // rebuild a's structure from "instructions"
 * const deserialized = deserialize(serialized);
 *
 * console.log(deserialized); // logs the "correct" structure
 * ```
 */
export interface SerializedTransportFormat {
	/**
	 * A memory pool for values the pointers in {@link pointers} can point to
	 */
	pool: any[];
	/**
	 * Pointers (indexes) of values stored in the {@link pool} in the order they can get built in.
	 *
	 * Separations are achieved using the `->` string.
	 *
	 * The pointer to the serialized value is `''`, meaning `pointers['']` is the serialized element's index in the
	 * {@link pool}.
	 *
	 * @example ```js
	 * // the serialized value points to an object (`s`) that is at index 0 in the pool
	 * // `s['a']` has the value of an array stored at index 1 in the pool.
	 * // this array has `s` as its only member, i.e., `s['a'][0] === s`:
	 * { '': 0, '->a': 1, '->a->0': 1 }
	 * ```
	 */
	pointers: { [key: string]: number };
	/**
	 * The tye of the value in the {@link pool} with the same index.
	 *
	 * Can be either a value "returned" by the `typeof` operator or a special value for supported types:
	 * - `regexp` - a `RegExp` object
	 */
	types: (
		| 'undefined'
		| 'object'
		| 'boolean'
		| 'number'
		| 'string'
		| 'symbol'
		| 'function'
		| 'bigint'
		| 'regexp'
		| 'Date'
	)[];
}

/**
 * Serialize a value to the {@link SerializedTransportFormat} specifications
 *
 * @param value the value that gets serialized
 * @return the serialized JSON string
 *
 * @see {@link deserialize}
 *
 * @example ```ts
 * let a = {};
 * let b = { a:a }
 * a['b'] = a;
 *
 * JSON.stringify(a); // throws Error because of cyclic dependency
 *
 * // serialize a, which returns "instructions" for re-building its structure
 * const serialized = serialize(a);
 *
 * // rebuild a's structure from "instructions"
 * const deserialized = deserialize(serialized);
 *
 * console.log(deserialized); // logs the "correct" structure
 * ```
 */
export function serialize(value: any) {
	// Create an empty instructions set that'll get modified
	let instructions: SerializedTransportFormat = {
		pool: [],
		pointers: {},
		types: []
	};

	serializeItem('', value, instructions); // serialize the value into ''

	/**
	 * replace values containing other values (objects and arrays) with their empty counterparts as they'll get rebuilt from the instructions
	 * @param value the value
	 */
	const replacer = (value: any) => {
		if (Array.isArray(value)) return [];
		else if (typeof value === 'object' && value !== null) return {};
		else return value;
	};

	instructions.pool = instructions.pool.map(replacer);

	// Finally, the instructions can be JSON-serialized and returned:
	return JSON.stringify(instructions);
}

/**
 * Deserialize a JSON string representing a {@link SerializedTransportFormat}.
 *
 * @param serialized JSON string with a {@link SerializedTransportFormat} format
 *
 * @see {@link serialize}.
 */
export function deserialize(serialized: string) {
	const instructions: SerializedTransportFormat = JSON.parse(serialized);

	instructions.pool = instructions.pool.map((value: any, index: number) => {
		if (instructions.types[index] === 'regexp') {
			const match = value.match(/^\/(.*)\/([gimy]*)/);
			if (match) {
				const [, pattern, flags] = match;
				return new RegExp(pattern, flags);
			} else {
				throw new Error('Invalid regular expression string: ' + value);
			}
		} else if (instructions.types[index] === 'Date') {
			return new Date(value)
		} else if (instructions.types[index] === 'bigint') {
			return BigInt(value);
		} else {
			return value;
		}
	});

	let builder: any = {}; // create an empty object in which the value can get built

	for (let pointer of Object.keys(instructions.pointers)) {
		const steps = pointer.split('->');

		const toSet = steps.pop();

		let current: any = builder;
		steps.forEach(step => {
			current = current[step];
		});

		current[toSet!] = instructions.pool[instructions.pointers[pointer]];
	}

	return builder[''];
}

/**
 * Serialize a value (some sub-item of the main serialized value) and write it into the `instructions`.
 *
 * @param path the path of the property that gets serialized, separated with `->`
 * @param value the value that should get serialized
 * @param instructions the instructions object
 *
 * @internal
 */
function serializeItem(
	path: string,
	value: any,
	instructions: SerializedTransportFormat
) {
	/**
	 * The index of the current value in the pool
	 *
	 * `-1` if it hasn't been added to the pool, yet
	 */
	let poolIndex = instructions.pool.indexOf(value);

	/**
	 * add pointer of path to the value's position in the pool (that gets created if not existent)
	 */
	function addModifierForValue(
		stringify: boolean = false,
		customType?: 'regexp' | 'Date'
	) {
		const valueExistsInPool = poolIndex >= 0;
		let index = valueExistsInPool
			? poolIndex
			: instructions.pool.push(stringify ? value.toString() : value) - 1;
		instructions.pointers[path] = index;
		if (!valueExistsInPool) {
			instructions.types[index] = customType || typeof value;
		}
	}

	if (
		typeof value === 'symbol' ||
		typeof value === 'bigint' ||
		typeof value === 'function'
	) {
		addModifierForValue(true);
	} else if (value instanceof RegExp) {
		addModifierForValue(true, 'regexp');
	} else if (value instanceof Date) {
		addModifierForValue(true, 'Date')
	} else if (Array.isArray(value)) {
		addModifierForValue();

		// add all array items as `path->${indexInArray}` to the serialization
		if (poolIndex < 0)
			value.forEach((item, index) => {
				serializeItem(path + `->${index}`, item, instructions);
			});
	} else if (typeof value === 'object') {
		addModifierForValue();

		// add all object properties as `path->${propertyName}` to the serialization
		if (poolIndex < 0 && value !== null)
			Object.keys(value).forEach(propertyName => {
				serializeItem(
					path + `->${propertyName}`,
					value[propertyName],
					instructions
				);
			});
	} else if (
		typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'boolean'
	) {
		addModifierForValue();
	}
}

/**
 * Serializer/Deserializer for a  JSON-based transport format with support for cyclic dependencies: `a['b']['a'] === a`
 *
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
 * Serialize values to a JSON-based transport format with support for cyclic dependencies `a['b']['a'] === a`
 *
 * Special cases:
 * - functions get converted to strings (using their `.toString()` method)
 * - Regular expressions (`RegExp`) get converted to strings
 *
 * Deserialization can be achieved using the {@link deserialize} function.
 *
 * @param value the value that gets serialized
 * @return the serialized JSON string
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
    let instructions: {
        pool: any[],
        modifiers: {}
    } = {
        pool: [],
        modifiers: {},
    };

    serializeItem('', value, instructions); // serialize the value into ''

    /**
     * replace values containing other values (objects and arrays) with their empty counterparts as they'll get rebuilt from the instructions
     * @param value the value
     */
    const replacer =
        (value: any) => {
            if (Array.isArray(value)) return []
            else if (typeof value === 'object' && value !== null) return {}
            else return value
        }

    instructions.pool = instructions.pool.map(replacer)

    // Finally, the instructions can be JSON-serialized and returned:
    return JSON.stringify(instructions);
}

/**
 * Deserialize a string that has been serialized with {@link serialize}.
 *
 * @param serialized
 */
export function deserialize(serialized: string) {
    const instructions = JSON.parse(serialized);

    let builder: any = {}; // create an empty object in which the value can get built

    for (let modifier of Object.keys(instructions.modifiers)) {
        const steps = modifier.split('->');

        const toSet = steps.pop();

        let current: any = builder;
        steps.forEach(step => {
            current = current[step]
        })

        current[toSet!] = instructions.pool[instructions.modifiers[modifier]];
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
function serializeItem(path: string, value: any, instructions: { pool: any[], modifiers: any }) {
    /**
     * The index of the current value in the pool
     *
     * `-1` if it hasn't been added to the pool, yet
     */
    let poolIndex = instructions.pool.indexOf(value);

    /**
     * add pointer of path to the value's position in the pool (that gets created if not existent)
     */
    function addModifierForValue() {
        const valueExistsInPool = poolIndex >= 0;
        instructions.modifiers[path] = valueExistsInPool ? poolIndex : instructions.pool.push(value) - 1;
    }

    if (typeof value === 'function' || value instanceof RegExp || typeof value === 'symbol') {
        // handle functions and regular expressions as a strings
        serializeItem(path, value.toString(), instructions);
    } else if (Array.isArray(value)) {
        addModifierForValue();

        // add all array items as `path->${indexInArray}` to the serialization
        if (poolIndex < 0)
            value.forEach((item, index) => {
                serializeItem(path + `->${index}`, item, instructions);
            })
    } else if (typeof value === 'object') {
        addModifierForValue();

        // add all object properties as `path->${propertyName}` to the serialization
        if (poolIndex < 0 && value !== null)
            Object.keys(value).forEach((propertyName) => {
                serializeItem(path + `->${propertyName}`, value[propertyName], instructions);
            })
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        addModifierForValue();
    }
}

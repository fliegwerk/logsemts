import {deserialize, serialize} from "./cyclic-serializer";

describe('serialize()', () => {
    it('should serialize cyclic properties', () => {
        let a: any = {};
        let b = {a};
        a['b'] = b;

        expect(a).toMatchSnapshot('a');
        const serialized = JSON.parse(serialize(a));

        expect(serialized).toMatchSnapshot('serialized a');

        expect(serialized.pool).toHaveLength(2);
        expect(serialized.pool).toContainEqual({});

        expect(serialized.modifiers).toHaveProperty('', 0)
        expect(serialized.modifiers).toHaveProperty('->b', 1)
        expect(serialized.modifiers).toHaveProperty('->b->a', 0)
    })

    it('should serialize strings', () => {
        expect(serialize('abc')).toMatchSnapshot()
    })

    it('should serialize numbers', () => {
        expect(serialize(3)).toMatchSnapshot()
    })

    it('should serialize booleans', () => {
        expect(serialize(true)).toMatchSnapshot()
        expect(serialize(false)).toMatchSnapshot()
    })

    it('should serialize arrays', () => {
        expect(serialize(['abc', 'cde'])).toMatchSnapshot()
    })

    it('should serialize regular expressions to strings', () => {
        const serialized = serialize(/.*/g);
        expect(serialized).toMatchSnapshot()
        expect(typeof serialized).toBe('string');
    })

    it('should serialize functions to strings', () => {
        const serialized = serialize(() => console.log('Hello World!'));
        expect(serialized).toMatchSnapshot()
        expect(typeof serialized).toBe('string');
    })
})

describe('deserialize()', () => {
    it('should deserialize cyclic properties', () => {
        const serialized = {
            "modifiers": {
                "": 0,
                "->b": 1,
                "->b->a": 0,
            },
            "pool": [
                {},
                {},
            ],
        }

        const deserialized = deserialize(JSON.stringify(serialized));
        expect(deserialized).toMatchSnapshot('deserialized');
        expect(deserialized['b']['a']).toBe(deserialized);
    })
})

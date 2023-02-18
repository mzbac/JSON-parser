import { JSONParser } from "./json-parser";

describe("JSONParser", () => {
  describe("parse()", () => {
    test("parses an empty object", () => {
      const input = "{}";
      const expectedOutput = {};
      const parser = new JSONParser(input);

      const output = parser.parse();

      expect(output).toEqual(expectedOutput);
    });

    test("parses an object with string values", () => {
      const input = '{"name": "John", "city": "New York"}';
      const expectedOutput = { name: "John", city: "New York" };

      const parser = new JSONParser(input);

      const output = parser.parse();
      expect(output).toEqual(expectedOutput);
    });

    test("parses an object with numeric values", () => {
      const input = '{"age": 30, "height": 1.8}';
      const expectedOutput = { age: 30, height: 1.8 };

      const parser = new JSONParser(input);

      const output = parser.parse();
      expect(output).toEqual(expectedOutput);
    });

    test("parses an object with boolean values", () => {
      const input = '{"hasChildren": true, "isMarried": false}';
      const expectedOutput = { hasChildren: true, isMarried: false };

      const parser = new JSONParser(input);

      const output = parser.parse();
      expect(output).toEqual(expectedOutput);
    });

    test("parses an array of values", () => {
      const input = '[1, "two", true, null]';
      const expectedOutput = [1, "two", true, null];

      const parser = new JSONParser(input);

      const output = parser.parse();
      expect(output).toEqual(expectedOutput);
    });

    test("parses a complex object with nested arrays and objects", () => {
      const input =
        '{"name": "John", "age": 30, "address": {"city": "New York", "zip": 10001}, "phoneNumbers": ["555-1234", "555-5678"]}';
      const expectedOutput = {
        name: "John",
        age: 30,
        address: { city: "New York", zip: 10001 },
        phoneNumbers: ["555-1234", "555-5678"],
      };

      const parser = new JSONParser(input);

      const output = parser.parse();
      expect(output).toEqual(expectedOutput);
    });

    test("parses an empty array", () => {
      const input = "[]";
      const expectedOutput: any[] = [];

      const parser = new JSONParser(input);

      const output = parser.parse();
      expect(output).toEqual(expectedOutput);
    });

    test("parses a string with escape sequences", () => {
      const input = '"Hello, \\"world\\"!"';
      const expectedOutput = 'Hello, "world"!';

      const parser = new JSONParser(input);

      const output = parser.parse();
      expect(output).toEqual(expectedOutput);
    });

    test("parses a negative number", () => {
      const input = "-42";
      const expectedOutput = -42;

      const parser = new JSONParser(input);

      const output = parser.parse();
      expect(output).toEqual(expectedOutput);
    });

    test("parses a number in scientific notation", () => {
      const input = "3.14159e10";
      const expectedOutput = 3.14159e10;

      const parser = new JSONParser(input);

      const output = parser.parse();
      expect(output).toEqual(expectedOutput);
    });

    test("throws an error for invalid input", () => {
      const input = '{ "name": "John", "city": }';

      const parser = new JSONParser(input);

      expect(() => parser.parse()).toThrowError();
    });

    test("throws an error for incomplete input", () => {
      const input = '{"name": "John", "city":';

      const parser = new JSONParser(input);

      expect(() => parser.parse()).toThrowError();
    });

    test("throws an error for unquoted keys", () => {
      const input = '{name: "John"}';

      const parser = new JSONParser(input);

      expect(() => parser.parse()).toThrowError();
    });

    test("throws an error for missing colon separator", () => {
      const input = '{"name" "John"}';
      const parser = new JSONParser(input);

      expect(() => parser.parse()).toThrowError();
    });

    test("throws an error for non-string keys", () => {
      const input = '{42: "John"}';
      const parser = new JSONParser(input);

      expect(() => parser.parse()).toThrowError();
    });

    test("throws an error for missing comma separator", () => {
      const input = '{"name": "John" "city": "New York"}';
      const parser = new JSONParser(input);

      expect(() => parser.parse()).toThrowError();
    });

    test("throws an error for invalid number format", () => {
      const input = "42.3.14";
      const parser = new JSONParser(input);

      expect(() => parser.parse()).toThrowError();
    });

    test("throws an error for unexpected end of input", () => {
      const input = '{"name": "John", "city": ';
      const parser = new JSONParser(input);

      expect(() => parser.parse()).toThrowError();
    });

    test("throws an error for invalid value type", () => {
      const input = '{ "name": undefined }';
      const parser = new JSONParser(input);

      expect(() => parser.parse()).toThrowError();
    });

    test("parses null value", () => {
      const input = "null";
      const expectedOutput = null;
      const parser = new JSONParser(input);

      const output = parser.parse();

      expect(output).toEqual(expectedOutput);
    });
  });
});

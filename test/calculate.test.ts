import assert from "assert";
import { calculateStats } from "../index";

describe("word-stats", () => {
    describe("calculate", () => {
        it("no words", () => {
            let result = calculateStats([]);
            expect(result).toMatchSnapshot();

            result = calculateStats([]);
            expect(result).toMatchSnapshot();
        });

        it("no words long enough", () => {
            const result = calculateStats(["ab"]);
            expect(result).toMatchSnapshot();
        });

        it(`stats ["aaa"]`, () => {
            expect(calculateStats(["aaa"])).toMatchSnapshot();
        });
        it(`stats ["abc"]`, () => {
            expect(calculateStats(["abc"])).toMatchSnapshot();
        });

        it(`stats ["aaaa"]`, () => {
            expect(calculateStats(["aaaa"])).toMatchSnapshot();
        });
        it(`stats ["abcd"]`, () => {
            expect(calculateStats(["abcd"])).toMatchSnapshot();
        });

        it(`stats ["aaaaa"]`, () => {
            expect(calculateStats(["aaaaa"])).toMatchSnapshot();
        });
        it(`stats ["abcde"]`, () => {
            expect(calculateStats(["abcde"])).toMatchSnapshot();
        });

        it(`stats ["abcde", "abcde"]`, () => {
            expect(calculateStats(["abcde", "abcde"])).toMatchSnapshot();
        });

        it(`stats ["abcde", "fghij"]`, () => {
            expect(calculateStats(["abcde", "fghij"])).toMatchSnapshot();
        });
    });
});

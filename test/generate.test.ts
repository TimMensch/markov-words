import assert from "assert";
import { generate, calculateStats as calculate } from "../index";

describe("Markov words", () => {
    describe("generate", () => {
        it("should generate aaa", () => {
            const result = generate(calculate(["aaa"]), 3);
            expect(result).toMatchSnapshot();
        });

        it("should generate aaa twice", () => {
            const result = generate(calculate(["aaa"]), 3, 2);
            expect(result).toMatchSnapshot();
        });

        it("should generate aaa and aab", () => {
            const stats = calculate(["aaa", "aab"]);
            let aaa = false;
            let aab = false;
            for (let i = 0; i < 100000; i++) {
                const result = generate(stats, 3);
                assert.equal(1, result.length);
                if (result[0] === "aaa") {
                    aaa = true;
                    if (aab) {
                        assert(true, "generated aaa and aab");
                        return;
                    }
                } else if (result[0] === "aab") {
                    aab = true;
                    if (aaa) {
                        assert(true, "generated aaa and aab");
                        return;
                    }
                } else {
                    fail(`${result[0]} Should be one of aaa or aab`);
                }
            }
        });

        it("should work with a large array of words", () => {
            const words = [
                "ability",
                "analyst",
                "artificial",
                "bout",
                "challenge",
                "conception",
                "crooked",
                "demand",
                "deny",
                "discussion",
                "dispute",
                "dodge",
                "double",
                "doubtful",
                "education",
                "enigma",
                "exploration",
                "fancy",
                "have",
                "head",
                "impossible",
                "inquiry",
                "inquisitive",
                "intellectual",
                "intriguing",
                "investigate",
                "judgment",
                "know",
                "knowing",
                "known",
                "learning",
                "light",
                "maneuver",
                "mark",
                "mind",
                "nose",
                "notice",
                "observation",
                "pay",
                "plea",
                "plot",
                "polite",
                "possess",
                "problem",
                "profound",
                "prying",
                "pump",
                "pursue",
                "query",
                "questioning",
                "reading",
                "reason",
                "rebut",
                "request",
                "retraction",
                "scent",
                "school",
                "shift",
                "sifting",
                "solution",
                "study",
                "surprise",
                "take",
                "theory",
                "trial",
                "trick",
                "wit",
            ];

            const stats = calculate(words);
            const result = generate(stats, 5, 20);

            assert(result != null, "Should be able to generate");
        });
    });
});

import { LetterCount } from "./LetterCount";
import { Stats } from "./Stats";
import { SubsequentLetterCount } from "./SubsequentLetterCount";

// increase counts for a single letter, creating a property if necessary
function countLetter(counts: LetterCount, letter: string | number) {
    var stat = counts[letter];
    if (!stat) {
        counts[letter] = 1;
    } else {
        counts[letter] = stat + 1;
    }
    counts.total += 1;
}

// incorporate the statistics for a single word into the existing
// stats object
export function incorporateWord(stats: Stats, word: string) {
    if (word.length < 3) {
        return;
    }

    if (!stats.firstLetters) {
        stats.firstLetters = { total: 0 };
    }

    // first letter stats
    const l1 = word.charAt(0);
    countLetter(stats.firstLetters, l1);

    // second letter stats, relative to first letter
    let l2 = word.charAt(1);
    let totals = stats.secondLetters[l1];
    if (!totals) {
        stats.secondLetters[l1] = totals = { total: 0 };
    }
    countLetter(totals as LetterCount, l2);

    // remaining letter stats, relative to preceding 2 letters
    let digram = l1 + l2;
    for (let j = 2, strlen = word.length; j < strlen; j++) {
        let digramTotals;
        l2 = digram.charAt(1);
        const l3 = word.charAt(j);
        if (j < strlen - 2) {
            totals = stats.letters[digram];
            digramTotals = stats.letters[l2];
            if (!totals) {
                stats.letters[digram] = totals = { total: 0 };
            }
            if (!digramTotals) {
                stats.letters[l2] = digramTotals = { total: 0 };
            }
        } else if (j < strlen - 1) {
            totals = stats.penultimateLetters[digram];
            digramTotals = stats.penultimateLetters[l2];
            if (!totals) {
                stats.penultimateLetters[digram] = totals = { total: 0 };
            }
            if (!digramTotals) {
                stats.penultimateLetters[l2] = digramTotals = { total: 0 };
            }
        } else {
            totals = stats.lastLetters[digram];
            digramTotals = stats.lastLetters[l2];
            if (!totals) {
                stats.lastLetters[digram] = totals = { total: 0 };
            }
            if (!digramTotals) {
                stats.lastLetters[l2] = digramTotals = { total: 0 };
            }
        }

        countLetter(totals as LetterCount, l3);
        countLetter(digramTotals as LetterCount, l3);
        digram = digram.charAt(1) + l3;
    }
}

// calculate the statistics to be used for generating the Markov words.
// wordList should be long enough to avoid not having word endings for
// most letter combinations.
export function calculateStats(wordList: string[]) {
    const firstLetters = { total: 0 } as LetterCount;
    const secondLetters = {} as SubsequentLetterCount;
    const letters = {} as SubsequentLetterCount;
    const penultimateLetters = {} as SubsequentLetterCount;
    const lastLetters = {} as SubsequentLetterCount;

    var stats = {
        firstLetters,
        secondLetters,
        letters,
        penultimateLetters,
        lastLetters,
    };

    if (!wordList || !wordList.length) {
        return stats;
    }

    for (let i = 0, len = wordList.length; i < len; i++) {
        incorporateWord(stats, wordList[i]);
    }

    return stats;
}

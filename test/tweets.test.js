const { parseTweets } = require("../src/tweets");

const NEG_TWEETS = [
  {
    text: "This tweet doesn't contain the trigger words",
  },
  {
    text: "This tweet will not send an email.",
  },
  {
    text: "This is a TriviaTuesday post with the word collection",
  },
];

const POSITIVE_TWEETS = [
  {
    text: "Collections are suspended.",
  },
  {
    text: "Collections will resume.",
  },
  {
    text: "Collections are delayed.",
  },
  {
    text: "The collections today will not happen.",
  },
];

const MIXED_TWEETS = [...NEG_TWEETS, ...POSITIVE_TWEETS];

describe("parseTweets()", () => {
  describe("baseline functioning", () => {
    test("it returns an array", () => {
      expect(parseTweets(NEG_TWEETS)).toBeInstanceOf(Array);
    });
  });

  describe("when negative array", () => {
    test("it should return an empty array", () => {
      expect(parseTweets(NEG_TWEETS)).toHaveLength(0);
    });
  });

  describe("when positive array", () => {
    test("it should return an array that matches input", () => {
      expect(parseTweets(POSITIVE_TWEETS)).toHaveLength(4);
      expect(parseTweets(POSITIVE_TWEETS)).toEqual(
        expect.arrayContaining(POSITIVE_TWEETS)
      );
    });
  });

  describe("when mixed array", () => {
    test("it should return array of only trigger-tweets", () => {
      expect(parseTweets(MIXED_TWEETS)).toHaveLength(4);
      expect(parseTweets(MIXED_TWEETS)).toEqual(
        expect.arrayContaining(POSITIVE_TWEETS)
      );
    });
  });
});

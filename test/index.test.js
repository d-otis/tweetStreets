const mockedGetUserTweets = jest.fn();

jest.mock("../src/tweets.js", () => ({
  getUserTweets: () => mockedGetUserTweets(),
}));

describe("app entry point", () => {
  test("it should call getUserTweets()", () => {
    require("../index");
    expect(mockedGetUserTweets).toHaveBeenCalled();
  });
});

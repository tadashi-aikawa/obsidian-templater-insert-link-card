const { getFaviconUrl } = require("./main");
const JSDOM = require("jsdom").JSDOM;

describe("getFaviconUrl", () => {
  describe.each`
    name         | url                                                                    | expected
    ${"mockito"} | ${"https://site.mockito.org/"}                                         | ${"https://site.mockito.org/favicon.ico"}
    ${"ESLint"}  | ${"https://eslint.org/docs/latest/rules"}                              | ${"https://eslint.org/favicon.ico"}
    ${"GitHub"}  | ${"https://github.com/tadashi-aikawa/obsidian-another-quick-switcher"} | ${"https://github.githubassets.com/favicons/favicon.svg"}
    ${"voicy"}   | ${"https://voicy.jp/channel/1380/459280"}                              | ${"https://voicy.jp/favicon.ico"}
    ${"Zenn"}    | ${"https://zenn.dev/estra/books/obsidian-dot-zenn"}                    | ${"https://zenn.dev/images/logo-transparent.png"}
    ${"Qiita"}   | ${"https://qiita.com/ugr0/items/514dcab4275aa74f3add"}                 | ${"https://cdn.qiita.com/assets/favicons/public/production-c620d3e403342b1022967ba5e3db1aaa.ico"}
  `("getFaviconUrl", ({ name, url, expected }) => {
    test(`${name}`, async () => {
      const textResponse = await (await fetch(url)).text();
      expect(getFaviconUrl(new JSDOM(textResponse).window.document, url)).toBe(
        expected
      );
    });
  });
});

# Obsidian Templater Insert link card

This repository is snippets that enable inserting a link as a card using [Templater], the [Obsidian] plugin.

## Demo

![](demo.gif)

## Requirements

You need to install [Obsidian] and [Templater].

## Get started

1⃣ Create a **Scripts directory** for using [Script User Functions] on [Templater]. For example, `_Privates/Templater/Scripts`

![](1.png)

2⃣ Copy or link `main.js` under the **Scripts directory**

![](2.png)

3⃣ Set **Scripts directory** to `Templater > Script files folder location`

![](3.png)

4⃣ Copy definitions of `main.css` to your CSS files (`CSS snippets` / `publish.css`)

5⃣ Create a template as follows

`Insert Link Card.md`

```js
<%*
const DESC_MAX_LEN = 100

const url = await tp.system.prompt("Enter URL", DESC_MAX_LEN)
if (url) {
  tR = await tp.user.create_card(url)
}
%>
```

Now, you can create a card link as HTML from the URL.

[templater]: https://github.com/SilentVoid13/Templater
[obsidian]: https://obsidian.md/
[script user functions]: https://silentvoid13.github.io/Templater/docs/user-functions/script-user-functions

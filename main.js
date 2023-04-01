function trimMax(str, num) {
  return str.length > num ? `${str.substring(0, num)}...` : str;
}

function trimEmptyLine(str) {
  return str
    .split("\n")
    .filter((x) => x)
    .join("");
}

async function fetchAsDom(url) {
  const res = await request({ url });
  return new DOMParser().parseFromString(res, "text/html");
}

function getMetaByProperty(dom, property) {
  return dom.querySelector(`meta[property='${property}']`)?.attributes?.content
    ?.value;
}

function getMetaByName(dom, name) {
  return dom.querySelector(`meta[name='${name}']`)?.attributes?.content?.value;
}

function getSrcById(dom, id) {
  return dom.querySelector("#" + id)?.attributes?.src?.value;
}

function getFaviconUrl(dom, url) {
  let iconHref =
    dom.querySelector("link[rel='icon']")?.attributes?.href?.value ??
    dom.querySelector("link[rel='shortcut icon']")?.attributes?.href?.value;
  if (!iconHref) {
    return new URL("/favicon.ico", url).toString();
  }

  const baseUrl = dom.querySelector("base")?.attributes?.href?.value;
  return baseUrl
    ? new URL(iconHref, new URL(baseUrl, url).toString()).toString()
    : new URL(iconHref, url).toString();
}

function getImageUrl(dom) {
  return (
    getMetaByProperty(dom, "og:image") ?? getSrcById(dom, "ebooksImgBlkFront")
  );
}

function isSecure(url) {
  return url && !url.startsWith("http://");
}

async function createCard(url, descMaxLen) {
  const html = await fetchAsDom(url);

  const siteName = getMetaByProperty(html, "og:site_name") ?? new URL(url).host;
  const title =
    getMetaByProperty(html, "og:title") ??
    getMetaByProperty(html, "title") ??
    html.querySelector("title")?.text ??
    url;
  const description =
    getMetaByProperty(html, "og:description") ??
    getMetaByProperty(html, "description") ??
    getMetaByName(html, "description") ??
    "";
  const faviconUrl = getFaviconUrl(html, url);
  const imageUrl = getImageUrl(html);

  const imageDom = isSecure(imageUrl)
    ? `<img src="${imageUrl}" class="link-card-image"/>`
    : "";

  return `<div class="link-card">
	<div class="link-card-header">
		<img src="${faviconUrl}" class="link-card-site-icon"/>
		<span class="link-card-site-name">${siteName}</span>
	</div>
	<div class="link-card-body">
		<div class="link-card-content">
			<div>
				<p class="link-card-title">${title}</p>
			</div>
			<div class="link-card-description">
				${trimEmptyLine(trimMax(description, descMaxLen))}
			</div>
		</div>
		${imageDom}
	</div>
	<a href="${url}"></a>
</div>`;
}

module.exports = createCard;

// For test
module.exports.getFaviconUrl = getFaviconUrl;

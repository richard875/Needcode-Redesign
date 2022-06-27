const escapeRegExp = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
const replaceAll = (str: string, find: string, replace: string) =>
  str.replace(new RegExp(escapeRegExp(find), "g"), replace);

const GithubCodeLink = (str: string) => {
  let newString = str;
  newString = replaceAll(newString, "github.com", "raw.githubusercontent.com");
  newString = replaceAll(newString, "/blob/", "/");

  return newString;
};

export default GithubCodeLink;

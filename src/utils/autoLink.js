/**
 * Look for text to turn into links
 * @param {String} text Chat Response Message text
 */
const autoLink = (text) => {
  // List of Case Sensitive words we want to replace with links.
  const linkMap = [
    {
      word: 'ALEX',
      link: 'https://start.myalex.com/patagoniaworks/'
    },
    {
      word: 'Brainshark',
      link: 'https://www.brainshark.com/1/player/usi?pi=zJUzCKwnyzkMsjz0&r3f1=&fb=0'
    },
    {
      word: 'Concur',
      link: 'http://concur.patagonia.com' // HTTPS does not work
    },
    {
      word: 'Talkspace',
      link: 'https://www.talkspace.com/connect'
    },
    {
      word: 'UMR',
      link: 'https://www.umr.com/member'
    },
    {
      word: 'Vanguard',
      link: 'https://ownyourfuture.vanguard.com'
    },
    {
      word: 'Workday',
      link: 'https://wd5.myworkday.com/patagonia'
    }
  ];

  // Setup some storage variables
  const existingLinks = [];
  let linkedText = text;
  let count = 0;

  // Format Emails as Markdown if they are not already in Markdown so people can click on them
  try {
    // eslint-disable-next-line
    [...linkedText.matchAll(/[\s]([^\[][A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})[,.\s]?\b/g)]?.forEach((match) => {
      linkedText = linkedText.replaceAll(match[1], `[${match[1]}](mailto:${match[1]})`);
    });
  } catch (err) {
    console.error('AutLink', err);
  }

  // Bulk replacement for find and replace
  const replaceBulk = (str, findArray, replaceArray) => {
    // Skip if nothing to find or replace
    if (findArray.length === 0 || replaceArray.length === 0) {
      console.log('AutLink', 'Bulk Replace initiated with empty values');
      return str;
    } else if (findArray.length !== replaceArray.length) {
      console.log('AutLink', 'Bulk Replace initiated different lengths for find and replace');
      return str;
    }

    let i,
      regex = [],
      map = {};
    for (i = 0; i < findArray.length; i++) {
      regex.push(findArray[i].replace(/\b([^[(]+[-[\]{}()*+?.\\^$|#,])\b/g, '\\$1'));
      map[findArray[i]] = `[${findArray[i]}](${replaceArray[i]})`;
    }
    regex = regex.join('|');
    str = str.replace(new RegExp(regex, 'g'), function (matched) {
      return map[matched];
    });
    return str;
  };

  // Temporarily remove existing markdown links as link text might contain the words we want to replace
  try {
    linkedText.match(/\[(.*?)\]\(.*?\)/g)?.forEach((link) => {
      count++;
      const key = `{{LINK_${count}}}`;
      existingLinks.push({
        key: key,
        url: link
      });
      linkedText = linkedText.replace(link, key);
    });
  } catch (err) {
    console.error('AutLink', err);
  }

  // Temporarily remove existing links as link text might contain the words we want to replace
  try {
    linkedText.match(/(https?:\/\/[^\s]+)/g)?.forEach((link) => {
      count++;
      const key = `{{LINK_${count}}}`;
      existingLinks.push({
        key: key,
        url: link
      });
      linkedText = linkedText.replace(link, key);
    });
  } catch (err) {
    console.error('AutLink', err);
  }

  // Extract Link Maps for replacement
  const words = linkMap.map((item) => item.word);
  const links = linkMap.map((item) => item.link);

  // Perform bulk replacement avoiding "Cumulative Replace"
  try {
    linkedText = replaceBulk(linkedText, words, links);
  } catch (err) {
    console.error('AutLink', err);
  }

  // Put the links back
  existingLinks.forEach((link) => {
    linkedText = linkedText.replace(link.key, link.url);
  });

  return linkedText;
};

export default autoLink;

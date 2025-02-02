const autoSourceLinks = (sources) => {
  if (sources && sources.length > 0) {
    let sourceLinks = '<p><details><summary>Sources</summary>\n\n';

    // Remove duplicates
    const dedupe = sources.reduce((p, c) => {
      if (
        !p.some((el) => {
          return el.title === c.title;
        })
      ) {
        p.push(c);
      }
      return p;
    }, []);

    dedupe.forEach((source) => {
      sourceLinks += `- [${source.title}](/docs/${source.title})\n`;
    });

    sourceLinks += '</details></p>';
    return sourceLinks;
  }
  return '';
};

export default autoSourceLinks;

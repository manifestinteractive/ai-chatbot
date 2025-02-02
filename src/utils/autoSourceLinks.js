const autoSourceLinks = (sources) => {
  if (sources && sources.length > 0) {
    const randomId = Math.random().toString(36).substring(2, 15);
    let sourceLinks = `<details id="source-${randomId}"><summary data-trigger="source-${randomId}">Sources</summary>\n`;

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

    sourceLinks += '</details>';
    return sourceLinks;
  }

  return '';
};

export default autoSourceLinks;

export default (linkColor) =>
    (mention, url, title) => {
        return [
            "<a target='blank' style='color:",
            linkColor,
            "' href='",
            url,
            "'>",
            mention,
            "</a>"
        ].join("");
    };

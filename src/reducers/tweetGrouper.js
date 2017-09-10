export default function groupTweets(tweets, startDate, chunkSize, cols) {
    let sortedTweets = tweets.sort(function (a, b) {
        return new Date(b["created_at"]) - new Date(a["created_at"]);
    }).filter(tweet => new Date(tweet["created_at"]) > startDate);

    let colCount = 0;
    return [].concat.apply([],
        sortedTweets.map(function (elem, i) {
            function divide() {
                colCount++;
                return [sortedTweets.slice(i, i + chunkSize)];
            }

            return (i % chunkSize || colCount > cols ) ? [] : divide();
        })
    );
}
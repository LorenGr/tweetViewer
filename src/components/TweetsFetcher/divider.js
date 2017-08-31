export default function divider(items, by) {

    return items.map(
        (item, index) => {
            return index % by === 0 ? items.slice(index, index + by) : null;
        })
        .filter(item => item);
}
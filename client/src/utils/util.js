export const addEllipsis = (text) => {
    if(text.length > 60) {
        return text.substring(0, 50) + '...';
    }
}
export const avatarColor = (email) => {
    const colors = ['#FF4D4F', '#5760FF'];
    return colors[email?.charCodeAt(1) % 2]
};

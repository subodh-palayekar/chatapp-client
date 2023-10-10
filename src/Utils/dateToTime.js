export default function formatTime(time) {
    const date = new Date(time)
    const hours = date.getHours() % 12 || 12; // Get hours in 12-hour format
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    // Pad single-digit minutes with leading zero
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
}
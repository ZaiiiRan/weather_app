export default function convertTo24Hours(time) {
    const [hours, minutes, period] = time.match(/(\d+):(\d+)\s*(AM|PM)/).slice(1);
    let convertedHours = parseInt(hours, 10);
    if (period === 'PM' && convertedHours !== 12) {
        convertedHours += 12;
    } else if (period === 'AM' && convertedHours === 12) {
        convertedHours = 0;
    }
    const formattedHours = convertedHours.toString().padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
}
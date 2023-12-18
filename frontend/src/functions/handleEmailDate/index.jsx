export default function handleEmailDate(time) {
    const date = time.split("T")[0].split("-")[2] + "/" + time.split("T")[0].split("-")[1] + "/" + time.split("T")[0].split("-")[0];
    return date;
}
export function handleRecipients(rec) {
  let recipients = "";
  let length = rec.length;

  rec.map((recipient, index) => {
    if (index === length - 1) {
      recipients += recipient;
    } else {
      recipients += recipient + ", ";
    }
  });

  return recipients;
}

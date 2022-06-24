// doc is a mongo document.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function convertDocToObj(doc: any): void {
  doc._id = doc._id.toString();
}

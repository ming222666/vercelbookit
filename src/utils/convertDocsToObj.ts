import convertDocToObj from './convertDocToObj';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function convertDocsToObj(docs: any[]): void {
  docs.forEach((doc, i) => {
    convertDocToObj(docs[i]);
  });
}

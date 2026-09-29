/** Sets the chosen fragment of a title in italic, editorial style. */
export function EditorialTitle({ text, emphasis }: { text: string; emphasis?: string }) {
  const at = emphasis ? text.lastIndexOf(emphasis) : -1;
  if (!emphasis || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <em>{emphasis}</em>
      {text.slice(at + emphasis.length)}
    </>
  );
}

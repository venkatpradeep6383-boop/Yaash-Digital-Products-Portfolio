export function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <svg aria-hidden="true" viewBox="0 0 20 20"><path d={diagonal ? "M5 15 15 5M7 5h8v8" : "M3 10h14m-5-5 5 5-5 5"}/></svg>; }
export function Plus() { return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M10 3v14M3 10h14"/></svg>; }

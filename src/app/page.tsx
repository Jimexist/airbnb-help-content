import data from "../../processed.json";
import Link from "next/link";
import { notFound } from "next/navigation";

const length = Object.keys(data).length;
const pageSize = 20;
const pages = Math.ceil(length / pageSize);

export default function Home({
  searchParams,
}: {
  searchParams: { p: string | undefined };
}) {
  const { p } = searchParams;
  const page = p ? parseInt(p) : 1;
  if (page <= 0 || page > pages) {
    notFound();
  }
  const start = (page - 1) * pageSize;
  return (
    <main className="flex flex-col min-h-screen items-center justify-between my-8">
      <h1 className="text-3xl">Airbnb Help Data</h1>
      <ul className="text-lg my-4">
        {Object.entries(data)
          .slice(start, start + pageSize)
          .map(([article_id, obj]) => {
            return (
              <li key={article_id} className="py-1">
                <Link href={`/article/${article_id}`}>
                  <span className="px-2 font-bold">[{article_id}]</span>
                  <span>{obj.title}</span>
                </Link>
              </li>
            );
          })}
      </ul>
      <div className="flex flex-row item-center justify-around my-4 text-sm">
        {page > 1 && (
          <Link className="flex px-2" href={`/?p=${page - 1}`}>
            [Prev Page]
          </Link>
        )}
        {page < pages && (
          <Link className="flex px-2" href={`/?p=${page + 1}`}>
            [Next Page]
          </Link>
        )}
        <span className="px-2">
          Page {page} of {pages}
        </span>
      </div>
    </main>
  );
}

import Link from "next/link";
import data from "../../../../processed.json";

export default function Article({ params }: { params: { articleId: string } }) {
  const { articleId } = params;
  const article = (data as Record<number, { title: string; content: string }>)[
    parseInt(articleId as string)
  ];
  return (
    <main className="flex flex-col min-h-screen items-center flex-start p-24">
      <h1 className="text-2xl py-7">{article.title}</h1>
      <div className="my-3">
        {article.content.split("\n").map((paragraph) => {
          return <p className="my-2">{paragraph}</p>;
        })}
      </div>
      <p className="my-3">
        <Link href="/">[Back]</Link>
      </p>
    </main>
  );
}

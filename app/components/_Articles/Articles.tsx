"use client";
import React from "react";
import { useRouter } from "next/navigation";
import RecordViewer from "../__Layouts/RecordViewer/RecordViewer";
import AddArticle from "./AddArticle";

type Props = {
  articles: any[];
  currentEstablishment: any;
  publicEstablishmentId: string;
};

function Articles({ articles = [], publicEstablishmentId = "", currentEstablishment }: Props) {
  const router = useRouter();
  const [curArticles, setCurArticles] = React.useState([]) as any;
  const [showAddScreen, setShowAddScreen] = React.useState(false);

  React.useEffect(() => {
    if (articles && articles.length > 0) {
      setCurArticles(articles);
    }
  }, [articles]);

  const navigateTo = (id: any) => {
    router.push(`/dashboard/article/${publicEstablishmentId}?id=${id}`);
  };

  if (!currentEstablishment) return null;
  return (
    <>
      <RecordViewer
        records={curArticles}
        onPress={(id: any) => navigateTo(id)}
        addAction={setShowAddScreen}
        addLabel="Add New Article"
        route="articles"
        setRecords={setCurArticles}
      />
      {showAddScreen && <AddArticle setCurArticles={setCurArticles} publicEstablishmentId={publicEstablishmentId} close={() => setShowAddScreen(false)} />}
    </>
  );
}

export default Articles;

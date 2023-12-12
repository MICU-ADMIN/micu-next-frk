import { Article } from "@/_types/dbTypes";
import { handleErrors, handleSuccess, parseDataIfString } from "@/app/_helpers/web/formatters";
import { removeFromCache, requestHandler } from "@/app/_helpers/web/requestHandler";
import AddArticle from "@/app/components/_Articles/AddArticle";
import RecordViewer from "@/app/components/__Layouts/RecordViewer/RecordViewer";
import React from "react";
import Loader from "../../Loader/Loader";
import ArticleEditor from "@/app/components/_Articles/ArticleEditor/ArticleEditor";
import { ArrowLeftSquareIcon } from "lucide-react";
import { deleteFromCacheWithPrefix } from "@/app/_helpers/web/cache/cache";

type Props = {
  row: any;
  publicEstablishmentId: string;
};

function FormArticles({ row, publicEstablishmentId }: Props) {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showAddArticle, setShowAddArticle] = React.useState(false);
  const [currentArticle, setCurrentArticle] = React.useState<Article | null>(null);

  React.useEffect(() => {
    fetchSlides();
    return () => {};
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const res = await requestHandler({
      type: "get",
      route: `articles/relation?relationId=${row.id}&relationName=RecordData&lastId=${articles[articles.length - 1]?.id || 0}`,
      returnCache: true,
      shouldCache: true,
    });
    setLoading(false);
    if (!res.errors) {
      setArticles([...articles, ...res]);
    } else {
      handleErrors(res);
    }
  };

  const updateArticle = async (data: { id: any; establishmentPublicId: any }) => {
    setLoading(true);
    data.establishmentPublicId = "dev";
    const response = await requestHandler({
      type: "put",
      body: data,
      route: "articles",
    });
    setLoading(false);
    if (!response.errors) {
      handleSuccess("Article updated successfully");
      deleteFromCacheWithPrefix("articles/relation");
    } else handleErrors(response);
  };

  const onSetCurrentArticle = (art: Article) => {
    console.log("a", art);
    art.content = parseDataIfString(art.content);
    setCurrentArticle(art);
  };

  return (
    <div className="bg-white rounded pt-5 h-full">
      <>
        {loading && (
          <div className="w-full h-full relative top-[150px] flex justify-center items-center">
            <Loader />
          </div>
        )}

        {currentArticle && !loading ? (
          <>
            <ArrowLeftSquareIcon
              className="h-5 w-5 absolute left-3 top-0 cursor-pointer text-gray-400 cursor-pointer"
              style={{ zIndex: 999999 }}
              onClick={() => setCurrentArticle(null)}
            />
            <ArticleEditor
              article={currentArticle}
              updateArticle={(data) => {
                updateArticle({ ...data });
              }}
              setLoading={setLoading}
              loading={loading}
              establishmentPublicId={publicEstablishmentId}
            />
          </>
        ) : (
          !loading && (
            <>
              <RecordViewer
                records={articles} //@ts-ignore
                onPress={(_label: string, data: any) => onSetCurrentArticle(data)}
                addAction={() => setShowAddArticle(true)}
                addLabel="Add New Article"
                labelId
                route="articles/relation"
                setRecords={setArticles}
                inRecord
              />
              {showAddArticle && (
                <AddArticle
                  close={() => setShowAddArticle(false)}
                  setCurArticles={setArticles}
                  publicEstablishmentId={publicEstablishmentId}
                  relationData={{ relationId: row.id, relationName: "RecordData" }}
                />
              )}
            </>
          )
        )}
      </>
    </div>
  );
}

export default FormArticles;

```tsx

"use client";

import { handleErrors, handleSuccess } from "@/app/_helpers/web/formatters";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import { requestHandler, removeFromCache } from "@/app/_helpers/web/requestHandler";
import ArticleEditor from "@/app/components/ArticleEditor/ArticleEditor";
import Loader from "@/app/components/Loader/Loader";
import Nav from "@/app/components/Nav/Nav";
import React from "react";

function ArticlesEditorPage() {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();
  const [articleId, setArticleId] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [article, setArticle] = React.useState(null);

  React.useEffect(() => {
    const id = window.location.href.split("?id=")[1];
    setArticleId(parseInt(id));
  }, []);

  React.useEffect(() => {
    if (currentEstablishment && articleId) {
      fetchArticle();
    }
  }, [currentEstablishment, articleId]);

  const fetchArticle = async () => {
    const response = await requestHandler({
      shouldCache: true,
      returnCache: true,
      type: "get",
      route: "articles/single?id=" + articleId,
    });

    setLoading(false);

    if (!response.errors) {
      setArticle(response);
    } else handleErrors(response);
  };

  const updateArticle = async (data: { id: any; establishmentPublicId: null }) => {
    setLoading(true);
    data.id = articleId;
    data.establishmentPublicId = publicEstablishmentId;
    const response = await requestHandler({
      type: "put",
      body: data,
      route: "articles",
    });

    setLoading(false);

    if (!response.errors) {
      handleSuccess("Article updated successfully");
      removeFromCache(`articles/single?id=${articleId}`);
    } else handleErrors(response);
  };

  return (
    <>
      {loading && <Loader />}
      <div className=" min-h-screen">
        <Nav currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />
        {article ? (
          <div className="page-wrapper">
            <ArticleEditor
              article={article}
              loading={loading}
              setLoading={setLoading}
              updateArticle={updateArticle}
              establishmentPublicId={publicEstablishmentId}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ArticlesEditorPage;


```

```mermaid

Here is a Mermaid Markdown overview for the Go file you provided:
```mermaid
graph LR
    + ArticlesEditorPage [Go file]
    +- use client [import]
    +- handleErrors [import]
    +- handleSuccess [import]
    +- useEstablishment [import]
    +- requestHandler [import]
    +- ArticleEditor [import]
    +- Loader [import]
    +- Nav [import]
    +- React [import]
    +- loading [state]
    +- article [state]
    +- articleId [state]
    +- currentEstablishment [state]
    +- publicEstablishmentId [state]
    +- fetchArticle [effect]
    +- updateArticle [effect]
    +- setLoading [effect]
    +- removeFromCache [effect]
```
This overview shows the structure of the Go file, including the imports, state variables, and effects. The `graph` keyword is used to define the graph structure, and the `+` symbol is used to indicate that

```

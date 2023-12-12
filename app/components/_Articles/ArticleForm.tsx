import React from "react";
import { handleErrors, handleSuccess } from "@/app/_helpers/web/formatters";
import { requestHandler } from "@/app/_helpers/web/requestHandler";
import { FieldsType } from "@/_types/FormTypes";
import dynamic from "next/dynamic";
import Spinner from "../Elements/Spinner/Spinner";

const Form = dynamic(() => import("@/app/components/Elements/Form/Form"), { loading: () => <Spinner /> });

let curData = {} as any;

const defaultModel = {
  title: "",
  description: "",
  thumbnail: "https://images.pexels.com/photos/2236674/pexels-photo-2236674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

const fieldGroupFields = [
  {
    name: "title",
    placeholder: "Title",
    required: true,
    maxLength: 90,
    autoFocus: true,
    type: "input",
  },
  {
    name: "description",
    placeholder: "Description",
    type: "textarea",
    maxLength: 500,
  },
  {
    subType: "url",
    label: " Add a thumbnail image for your article *",
    placeholder: "Thumbnail",
    required: true,
    name: "thumbnail",
    type: "input",
    maxLength: 500,
  },
  {
    type: "custom",
    component({ model, field, fields }) {
      return (
        <img
          src={model.thumbnail}
          alt="thumbnail"
          className=" mb-5 mt-4  h-[30vh] w-full rounded-md border border-gray-300 object-cover p-1 transition duration-150 ease-in-out focus:border-indigo-500 focus:outline-none sm:text-sm sm:leading-5"
        />
      );
    },
  },
  {
    type: "select",
    name: "template",

    placeholder: "Select a template",
    options: [
      { label: "Template 1", value: "template1" },
      { label: "Template 2", value: "template2" },
    ],
  },
] as FieldsType[];

type Props = {
  close: () => void;
  setCurArticles: (arg0: any) => void;
  publicEstablishmentId: string;
  relationData?: { relationId: string; relationName: string };
  editModel?: any;
};

function ArticleForm({ close, setCurArticles, publicEstablishmentId, relationData, editModel }: Props) {
  const [model, setModel] = React.useState({ ...defaultModel });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (editModel) {
      setModel({ ...editModel });
    }
  }, [editModel]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    data.content = " ";
    data.publicEstablishmentId = publicEstablishmentId;

    if (relationData) {
      data.relationId = relationData.relationId;
      data.relationName = relationData.relationName;
    }

    curData = data;

    requestHandler({ type: editModel ? "put" : "post", body: data, route: "articles" }).then((res) => {
      setLoading(false);

      if (!res?.errors) {
        handleSuccess("Article created successfully");

        if (editModel) {
          curData.updatedAt = new Date().toISOString();
          setCurArticles((prev: any) => {
            const curArticles = [...prev];
            const index = curArticles.findIndex((article: any) => article.id === editModel.id);
            curArticles[index] = curData;
            return curArticles;
          });
        } else {
          curData.id = res.id;
          curData.createdAt = Date.now();
          setCurArticles((prev: any) => [...prev, curData]);
          setModel({ ...defaultModel });
        }
        // removeFromCache('articles-1')
        return close();
      }

      handleErrors(res);
    });
  };

  return (
    <>
      <div className="modal-center">
        <div className="modal-center-medium h-[95vh] overflow-hidden rounded-md bg-white p-8 shadow-xl">
          <h2 className="text-indigo-600">{editModel ? "Edit" : "Add"} Article</h2>

          <p className="mt-6 text-gray-500">Provide a title and description for article</p>

          <Form
            className="mt-4 "
            onSubmit={onSubmit}
            model={model}
            setModel={setModel}
            loading={loading}
            fields={[{ fields: fieldGroupFields }]}
            onCancel={close}
          />
        </div>
      </div>
      <div onClick={close} className="modal-overlay"></div>
    </>
  );
}

export default ArticleForm;

"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { updateRecordDataRow } from "@/actions/record-actions";
import { fetchUsers } from "@/actions/user-actions";
import { useEstablishment } from "@/app/_helpers/web/hooks/useEstablishment";
import { addToCache } from "@/app/_helpers/web/requestHandler";
import Spinner from "@/app/components/Elements/Spinner/Spinner";
import TableFormContent from "@/app/components/Elements/TableElement/TableForm/TableFormContent";
import Nav from "@/app/components/__Layouts/Nav/Nav";
import dynamic from "next/dynamic";

const FileViewerModal = dynamic(() => import("@/app/components/_Uploads/FileViewerModal"), { loading: () => <Spinner /> });

type Props = {
  data: any;
};

function RecordItem({ data }: Props) {
  const { currentEstablishment, publicEstablishmentId } = useEstablishment();

  const [model, setModel] = React.useState({});
  const [saving, setSaving] = React.useState(false);
  const [users, setUsers] = React.useState({ obj: {}, arr: [] });
  const [navOpen, setNavOpen] = React.useState(true);
  const [openFile, setOpenFile] = React.useState(null);

  const changeTimeout = React.useRef(null) as any;

  React.useEffect(() => {
    fetchUsers((c: any, m: any) => {
      setUsers({ arr: c, obj: m });
    });
    if (data) {
      setTimeout(() => {
        addToCache("reccordItemid=" + data.id, data.data);
      }, 0);

      const curRow = { ...data.model, id: data.id, userId: data.userId, createdAt: data.createdAt, updatedAt: data.updatedAt, index: data.index };
      setModel(curRow);
    }
  }, []);

  return (
    <>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} currentEstablishment={currentEstablishment} establishemntLogin={() => {}} />
      <Toaster />
      <div
        style={{
          marginTop: navOpen ? "-5rem" : "2rem",
        }}
        className="flex flex-col w-full bg-white justify-center items-center"
      >
        <div className="lg:min-w-[1100px] lg:w-[70vw] w-full relative">
          {saving && (
            <div className="text-sm fadeIn text-gray-500 flex items-center flex-row absolute top-2 right-2 mt-2 mr-2">
              <span className="mr-1 text-indigo-500">Saving</span> <Spinner className="w-5 h-5 inline-block " />
            </div>
          )}
          <TableFormContent
            publicEstablishmentId={publicEstablishmentId}
            row={model}
            onValChange={(row) => {
              let oldRow = { ...model };
              setModel(row);
              changeTimeout.current && clearTimeout(changeTimeout.current);
              changeTimeout.current = setTimeout(() => {
                updateRecordDataRow({ ...row }, setSaving, saving, (message) => {
                  if (message?.errors) setModel(oldRow);
                });
              }, 500);
            }}
            columns={data?.properties || []}
            field={{ cellSelection: true }}
            setOpenFile={setOpenFile}
            users={users}
          />
        </div>
      </div>
      {openFile && <FileViewerModal file={openFile} close={() => setOpenFile(null)} />}
    </>
  );
}

export default RecordItem;

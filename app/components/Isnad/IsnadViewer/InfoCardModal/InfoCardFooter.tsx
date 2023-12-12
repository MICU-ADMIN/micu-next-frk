import React from "react";
import Link from "next/link";
import { ScholarNodeData } from "../IsnadViewer";
import Button from "@/app/components/Elements/Button/Button";

type InfoCardFooterProps = {
  closeModal: () => void;
  data: ScholarNodeData;
};

function InfoCardFooter({ closeModal, data }: InfoCardFooterProps) {
  return (
    <>
      <Button className="mt-2 w-full border-gray-200 text-gray-500 " onClick={closeModal}>
        Go back
      </Button>
      <Link
        className=" text-sm text-gray-500 hover:text-gray-700 mt-2 block"
        href={`https://muslimscholars.info/manage.php?ylist=-1&yfield=0&yoption=0&yorder=0&ysource=0&scholarSearch=${data.id}&submit=Find`}
        target="_blank"
      >
        Content provided with sources by muslimscholars.info
      </Link>
    </>
  );
}

export default InfoCardFooter;

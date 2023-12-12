import React from "react";
import dynamic from "next/dynamic";
import Spinner from "../../Spinner/Spinner";

const EditPropertyContent = dynamic(() => import("./EditPropertyContent"), { loading: () => <Spinner /> });
const Button = dynamic(() => import("../../Button/Button"), { loading: () => <Spinner /> });

type Props = {
  close: () => void;
  onEditProperty: (property: any) => void;
  onDeleteProperty: (index: number) => void;
  property: any;
  index: number;
  wrapperRef: React.MutableRefObject<any>;
};

function EditPropertyMenu({ close, property, onEditProperty, index, onDeleteProperty, wrapperRef }: Props) {
  const [currentProperty, setCurrentProperty] = React.useState(property);
  const [changes, setChanges] = React.useState(false);

  React.useEffect(() => {
    setCurrentProperty(property);
  }, [property]);

  return (
    <>
      <div
        style={{ zIndex: 1000, top: wrapperRef?.current?.offsetTop, height: wrapperRef?.current?.offsetHeight }}
        className="flex bg-white h-full border slideLeft p-3 rounded shadow-md  transition duration-500 ease-in-out min-w-[300px] max-w-[500px] fixed  right-0 flex-col"
      >
        <p className="text-indigo-500">Edit property</p>

        <EditPropertyContent
          property={property}
          index={index}
          onDeleteProperty={onDeleteProperty}
          currentProperty={currentProperty}
          setCurrentProperty={setCurrentProperty}
          changes={changes}
          setChanges={setChanges}
        />
        <div className="mt-3 absolute bottom-3 left-3" style={{ opacity: changes ? 1 : 0.5 }}>
          <Button disabled={!changes} size="sm" onClick={() => onEditProperty(currentProperty)}>
            Save changes
          </Button>
        </div>
      </div>
      <div onClick={close} style={{ background: "transparent" }} className="modal-overlay"></div>
    </>
  );
}

export default EditPropertyMenu;

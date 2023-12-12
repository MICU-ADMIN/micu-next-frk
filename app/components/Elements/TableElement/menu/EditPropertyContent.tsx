import React from "react";
import FormGroup from "../../Form/FormGroup";
import Badge from "../../Badge/Badge";
import { PlusCircle, Trash2 } from "react-feather";
import Button from "../../Button/Button";

type Props = {
  property: any;
  index: number;
  onDeleteProperty: (index: number) => void;
  currentProperty: any;
  setCurrentProperty: (v: any) => void;
  changes: boolean;
  setChanges: (v: boolean) => void;
};

function EditPropertyContent({
  property,
  index,
  onDeleteProperty,
  currentProperty,
  setCurrentProperty,
  changes,
  setChanges,
}: Props) {
  const [errors, setErrors] = React.useState({}) as any;
  const [onDelete, setOnDelete] = React.useState(false);
  const [showOptionAdd, setShowOptionAdd] = React.useState(false);
  const [curOption, setCurOption] = React.useState(null) as any;

  return (
    <div className="flex flex-col w-full mt-3">
      <FormGroup
        className="w-full"
        altSetModel={true}
        errors={errors}
        setErrors={setErrors}
        model={currentProperty}
        setModel={(model) => {
          if (!changes) setChanges(true);
          setCurrentProperty(model);
        }}
        fields={[
          {
            name: "placeholder",
            placeholder: "Label",
            type: "input",
            maxLength: 100,
          },
          {
            name: "title",
            placeholder: "Title",
            type: "input",
            maxLength: 30,
            hidden: ({ model }: any) => model.type !== "button",
          },
          {
            name: "type",
            placeholder: "Type",
            type: "select",
            options: [
              { label: "Text", value: "editor" },
              { label: "Validated input", value: "input" },
              { label: "Select", value: "select" },
              { label: "Files & media", value: "file" },
              { label: "Number", value: "number" },
              { label: "Date", value: "date" },
              { label: "Checkbox", value: "checkbox" },
              { label: "Button", value: "button" },
              { label: "ID", value: "id" },
              { label: "Created at", value: "createdAt" },
              { label: "Updated at", value: "updatedAt" },
              { label: "Color", value: "color" },
            ],
          },
          {
            name: "subType",
            placeholder: "Input type",
            type: "select",
            options: [
              { label: "Text", value: "text" },
              { label: "Email", value: "email" },
              { label: "Password", value: "password" },
              { label: "Phone ", value: "phone" },
              { label: "URL", value: "url" },
              { label: "Characters only", value: "char" },
            ],
            hidden: ({ model }: any) => model.type !== "input",
          },
          {
            name: "dateSubType",
            placeholder: "Date type",
            type: "select",
            options: [
              { label: "Date", value: "date" },
              { label: "Date time", value: "datetime-local" },
              { label: "Time", value: "time" },
              { label: "Month", value: "month" },
              { label: "Week", value: "week" },
              { label: "Year", value: "year" },
            ],
            hidden: ({ model }: any) => model.type !== "date",
          },
          {
            name: "required",
            title: "Required",
            type: "checkbox",
            hidden: ({ model }: any) =>
              model.type !== "input" &&
              model.type !== "select" &&
              model.type !== "editor" &&
              model.type !== "number",
          },
          {
            name: "max",
            placeholder: "Max",
            type: "input",
            subType: "number",
            max: 100000000,
            min: 0,
            hidden: ({ model }: any) => model.type !== "number",
          },
          {
            name: "min",
            placeholder: "Min",
            type: "input",
            subType: "number",
            max: 100000000,
            hidden: ({ model }: any) => model.type !== "number",
          },
          {
            name: "max",
            placeholder: "Max",
            label: "Max date",
            type: "input",
            subType: "datetime-local",
            hidden: ({ model }: any) => model.type !== "date",
          },
          {
            name: "min",
            placeholder: "Min",
            label: "Min date",
            type: "input",
            subType: "datetime-local",
            hidden: ({ model }: any) => model.type !== "date",
          },
          {
            name: "step",
            placeholder: "Step",
            type: "input",
            subType: "number",
            max: 100000000,
            hidden: ({ model }: any) => model.type !== "number",
          },
          {
            name: "numberSubType",
            type: "select",
            placeholder: "Number type",
            options: [
              { label: "Number", value: "number" },
              { label: "Currency", value: "currency" },
              { label: "Percentage", value: "percentage" },
            ],
            hidden: ({ model }: any) => model.type !== "number",
          },
          {
            name: "options",
            placeholder: "Options",
            type: "custom",
            hidden: ({ model }: any) => model.type !== "select",
            component: ({ model }: any) => (
              <div className="flex flex-col my-2">
                {currentProperty.options &&
                currentProperty.options.length > 0 ? (
                  <div className="flex flex-row flex-wrap mt-2">
                    {currentProperty.options.map(
                      (option: any, index: number) => (
                        <Badge
                          onClick={() => {
                            setCurOption(option);
                            console.log(index);
                          }}
                          className="mr-2 cursor-pointer hover:shadow-sm"
                        >
                          {option.label}
                        </Badge>
                      )
                    )}
                  </div>
                ) : (
                  <span className="text-xs mt-1 ml-3 text-gray-400">
                    No options added yet
                  </span>
                )}
                <PlusCircle
                  onClick={() => {
                    setCurOption({ label: "", value: "" });
                    setShowOptionAdd(true);
                    // setModel({ ...model, options: [...model.options, { label: "", value: "" }] });
                  }}
                  className="h-5 w-5 text-primary-500 cursor-pointer mt-3 ml-2"
                />

                {curOption && (
                  <div className="flex flex-col mt-3 fadeIn">
                    <p className="text-primary-500">
                      {showOptionAdd ? "Add option" : "Edit option"}
                    </p>
                    <FormGroup
                      className="w-full"
                      altSetModel={true}
                      errors={errors}
                      setErrors={setErrors}
                      model={curOption}
                      setModel={(model) => {
                        setCurOption(model);
                      }}
                      fields={[
                        {
                          name: "value",
                          placeholder: "Value",
                          type: "input",
                          maxLength: 100,
                        },
                      ]}
                    />
                    <div className="flex flex-row mt-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setChanges(true);
                          if (showOptionAdd) {
                            setCurrentProperty({
                              ...currentProperty,
                              options: [
                                ...currentProperty.options,
                                {
                                  label: curOption.value,
                                  value: curOption.value,
                                  id: Date.now(),
                                },
                              ],
                            });
                          } else {
                            setCurrentProperty((prev: any) => {
                              const options = prev.options.map(
                                (option: any) => {
                                  if (option.id === curOption.id) {
                                    return curOption;
                                  } else {
                                    return option;
                                  }
                                }
                              );
                              return { ...prev, options };
                            });
                          }

                          console.log(currentProperty);

                          setCurOption(null);
                          setShowOptionAdd(false);
                        }}
                        className="mr-2"
                      >
                        Add
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setShowOptionAdd(false);
                          setCurOption(null);
                        }}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ),
          },
          {
            name: "maxLength",
            placeholder: "Max length",
            type: "input",
            subType: "number",
            max: 500,
            min: 0,
            hidden: ({ model }: any) => model.type !== "input",
          },
          {
            name: "minLength",
            placeholder: "Min length",
            type: "input",
            subType: "number",
            max: 499,
            hidden: ({ model }: any) => model.type !== "input",
          },
          {
            name: "description",
            placeholder: "Description",
            type: "textarea",
            maxLength: 250,
            hidden: ({ model }: any) => model.type !== "input",
            description: "This description will be shown below the input",
          },
        ]}
      />
      <hr className="my-3" />
      {property.name !== "value" ? (
        !onDelete ? (
          <Trash2
            className="h-5 w-5 text-red-500 cursor-pointer"
            onClick={() => setOnDelete(true)}
          />
        ) : (
          <div className="flex flex-col items-center fadeIn">
            <p className="text-red-500 mr-2">Confirm delete?</p>
            <div className="flex flex-row mt-2 ">
              <Button
                size="sm"
                onClick={() => onDeleteProperty(index)}
                style={{ background: "#D54040" }}
                className="mr-2"
              >
                Delete
              </Button>
              <Button
                size="sm"
                onClick={() => setOnDelete(false)}
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        )
      ) : (
        <span className="text-xs text-gray-400">
          This property cannot be deleted
        </span>
      )}
    </div>
  );
}

export default EditPropertyContent;

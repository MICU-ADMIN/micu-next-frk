```tsx

import React from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { gqlF, requestHandler } from "@/app/_helpers/web/requestHandler";

type SelectProps = {
  options: any[];
  multiple?: boolean;
  isCreatable?: boolean;
  onChange: (value: any) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  name?: string;
  value?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  query?: string;
  placeholder?: string;
  createKey?: string;
  noClear?: boolean;
  queryKey?: string;
  required?: boolean;
  createInput?: string;
};

const SelectComponent = ({
  options,
  multiple = false,
  isCreatable,
  onChange,
  className = "",
  disabled = false,
  required = false,
  createInput = "",
  loading = false,
  name = "category",
  noClear = false,
  value,
  onFocus,
  onBlur,
  query = "",
  createKey = "",
  placeholder = "Select",
  queryKey = "",
  ...props
}: SelectProps) => {
  const [labels, setLabels] = React.useState({}) as any;
  const [curOptions, setCurOptions] = React.useState([]) as any;
  const handleChange = (selectedOption: { value: any }[]) => {
    console.log("selectedOption", selectedOption);
    if (multiple) {
      const values = [];
      for (let i = 0; i < selectedOption.length; i++) {
        values.push(selectedOption[i].id || selectedOption[i].value);
      }

      onChange(values);
    } else {
      onChange(selectedOption.value);
    }
  };

  React.useEffect(() => {
    if (options && options.length > 0) {
      console.log("options", options);
      const neOpts: { value: any; label: any }[] = [];
      options.forEach((option) => {
        neOpts.push({ value: option.id || option.value, label: option.label });
      });
      setCurOptions(neOpts);
    }
  }, [options]);

  React.useEffect(() => {
    const labels = {};
    if (curOptions && curOptions.length > 0) {
      curOptions.forEach((option: { id: any; value: any; label: any }) => {
        labels[option?.id || option.value] = option.label;
      });
    }
    setLabels(labels);
  }, [curOptions]);

  React.useEffect(() => {
    if (queryKey) {
      fetchOptions();
    }
  }, []);

  const getMultiValue = (value) => {
    if (value && value.length > 0) {
      return value.map((val) => {
        return { id: val, value: val, label: labels[val] };
      });
    }
    return [];
  };

  const fetchOptions = () => {
    requestHandler({
      body: gqlF(
        query
        //   `query{
        //   establishments{
        //     id
        //   }
        // }`
      ),
      cacheKey: queryKey,
      shouldCache: true,
      returnCache: true,
    }).then((res) => {
      if (res?.data && res?.data[queryKey]) {
        setCurOptions(res?.data[queryKey]);
      }
    });
  };

  const createOptions = (inputValue: string) => {
    const routeSplit = window.location.pathname.split("/");
    const publicId = routeSplit[routeSplit.length - 1];

    if (createKey) {
      requestHandler({
        body: gqlF(
          `mutation create${createKey}($input: ${createInput}!) {
          ${createKey}(input: $input) {
          id
          label
          }
          }
          `,
          {
            input: {
              label: inputValue,
              description: "test",
              establishmentPublicId: publicId,
            },
          }
        ),
      }).then((res) => {
        if (res?.data && res?.data[createKey]) {
          const newOption = res?.data[createKey];
          setCurOptions([...curOptions, newOption]);
          onChange([...value, newOption.id]);
        }
      });
    }
  };

  if (isCreatable) {
    return (
      <CreatableSelect
        options={!multiple ? curOptions : value ? curOptions.filter((option: { id: any }) => !value.includes(option.id)) : curOptions}
        isMulti={multiple ? true : false}
        value={multiple ? getMultiValue(value) : { value: value, label: labels[value] }}
        className={className}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
        isClearable
        onCreateOption={(inputValue) => {
          createOptions(inputValue);
        }}
        styles={styles}
        isDisabled={disabled}
        isLoading={loading}
        onFocus={() => {
          onFocus && onFocus();
          query && queryKey && fetchOptions();
        }}
        onBlur={onBlur}
        name={name}
      />
    );
  } else {
    return (
      <Select
        options={curOptions}
        isMulti={multiple ? true : false}
        value={multiple ? getMultiValue(value) : { value: value, label: labels[value] }}
        className={className}
        onChange={handleChange}
        isClearable={!noClear}
        isSearchable
        isDisabled={disabled}
        isLoading={loading}
        styles={styles}
        onFocus={() => {
          onFocus && onFocus();
          query && queryKey && fetchOptions();
        }}
        onBlur={onBlur}
        name={name}
        placeholder={placeholder}
      />
    );
  }
};

const styles = {
  control: (provided: any, state: any) => ({
    ...provided,

    borderRadius: "0.375rem",
    border: "2px solid #d1d5db",
    zIndex: 0,
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    boxShadow: "none",
    "&:focus": {
      borderColor: "rgb(79 70 229)",
    },
    "&:hover": {
      borderColor: "rgb(79 70 229)",
    },
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    zIndex: 99999,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    outline: "none",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    borderRadius: "0.125rem",
    zIndex: 99999,
  }),
};

export default SelectComponent;


```

```mermaid

This is a Go file that defines a `Select` component using the `react-select` library. The component takes in various props, such as `options`, `multiple`, `isCreatable`, `onChange`, `className`, `disabled`, `loading`, `name`, `value`, `onFocus`, and `onBlur`. It also uses the `gqlF` function from the `requestHandler` module to make GraphQL queries.
The component returns a `Select` component from the `react-select` library, with the options fetched from a GraphQL query. If the `isCreatable` prop is set to `true`, the component will create a new option when the user clicks the "Create" button.
The component also defines a `styles` object that defines the styles for the `Select` component.
Here is a breakdown of the code:
* The first section of the code defines the `SelectComponent` component.
* The `type` prop is set to `SelectProps`, which is a type alias defined in the code.
* The `const` keyword is used to define a new variable called `labels`.
* The `const` keyword is used to define a new

```

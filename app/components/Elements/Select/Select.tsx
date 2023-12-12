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
  defaultMenuIsOpen?: boolean;
  createRequest?: (id: string, cb: (res: any) => void) => void;
  optionFetcher?: (search: string, cb: (res: any) => void) => void;
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
  defaultMenuIsOpen = false,
  loading = false,
  name = "category",
  noClear = false,
  value,
  onFocus,
  onBlur,
  query = "",
  createRequest,
  optionFetcher,
  createKey = "",
  placeholder = "Select",
  queryKey = "",
  ...props
}: SelectProps) => {
  const [labels, setLabels] = React.useState({}) as any;
  const [loadingOptions, setLoadingOptions] = React.useState(false) as any;
  const [curOptions, setCurOptions] = React.useState([]) as any;
  const handleChange = (selectedOption: { value: any }[]) => {
    if (multiple) {
      const values = [];
      const valueAndLabel = [];
      for (let i = 0; i < selectedOption.length; i++) {
        values.push(selectedOption[i].id || selectedOption[i].value);
        valueAndLabel.push({ value: selectedOption[i].id || selectedOption[i].value, label: selectedOption[i].label });
      }

      onChange(values, valueAndLabel);
    } else {
      onChange(selectedOption.id || selectedOption.value, selectedOption.label, selectedOption);
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
    if (props.fetchOnMount && optionFetcher) {
      optionFetcher("", (res) => {
        if (res && !res.errors) {
          setCurOptions(res);
        }
      });
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
    setLoadingOptions(true);
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
    if (!createRequest) return;
    setLoadingOptions(true);
    createRequest(inputValue, (res) => {
      setLoadingOptions(false);
      if (res?.success) {
        const newOption = { value: res?.data[createKey].id, label: res?.data[createKey].label };
        const newOptions = [...curOptions, newOption];
        setCurOptions(newOptions);
        handleChange(newOptions);
      }
    });
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
        defaultMenuIsOpen={defaultMenuIsOpen}
        isClearable
        onCreateOption={(inputValue) => {
          createOptions(inputValue);
        }}
        styles={styles}
        isDisabled={disabled}
        isLoading={loading || loadingOptions}
        onFocus={() => {
          onFocus && onFocus();
          optionFetcher &&
            optionFetcher("", (res) => {
              if (res && !res.errors) {
                setCurOptions(res);
              }
            });
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
        isLoading={loading || loadingOptions}
        defaultMenuIsOpen={defaultMenuIsOpen}
        styles={styles}
        onFocus={() => {
          onFocus && onFocus();
          optionFetcher &&
            optionFetcher("", (res) => {
              if (res && !res.errors) {
                setCurOptions(res);
              }
            });
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
    border: "1.5px solid #d1d5db",
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
    backgroundColor: state.isSelected ? "rgb(79 70 229)" : state.isFocused ? "rgb(199 210 254)" : "white",
    color: state.isFocused || state.isSelected ? "white" : "black",
    zIndex: 99999,
    "&:hover": {
      backgroundColor: "rgb(199 210 254)",
    },
  }),
};

export default SelectComponent;

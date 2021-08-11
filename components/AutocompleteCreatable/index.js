import { useEffect, useState } from "react";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import { Target as TargetIcon } from "react-feather";

const filter = createFilterOptions();

export default function AutocompleteCreatable({
  name,
  optionKey,
  options,
  label,
  variant,
  handleAutocompleteChange,
  disabled,
  task,
  ...props
}) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (name === "accuracy_type") {
      handleAutocompleteChange;
    }
    if (handleAutocompleteChange) {
      handleAutocompleteChange(value?.name || value, name);
    }
  }, [value]);

  useEffect(() => {
    setValue(null)
  }, [task]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue(newValue);
        } else if (newValue && newValue.inputValue) {
          setValue(newValue.inputValue);
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            [optionKey]: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option[optionKey];
      }}
      renderOption={(option) => option[optionKey]}
      fullWidth
      freeSolo
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          label={label}
          value={value?.name || value}
          variant={variant ?? "outlined"}
        />
      )}
    />
  );
}

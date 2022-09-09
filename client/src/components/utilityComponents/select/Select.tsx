import React, { useEffect, useState } from "react";

interface Props {
  id: string;
  name: string;
  required: boolean;
  options: string[];
  onChange: Function;
  onBlur: Function;
  currentState?: string;
}

const Select: React.FC<Props> = ({ id, name, required, options, onChange, onBlur, currentState }): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState(currentState || options[0]);

  const listOptions = options.map(function (option) {
    return (
      <option key={option} value={option} label={option}>
        {option}
      </option>
    );
  });

  return (
    <>
      <label htmlFor={name}>Choose a currency:</label>
      <select
        id={id}
        name={name}
        required={required}
        onChange={(e) => {
          onChange(e);
          setSelectedOption(e.currentTarget.value);
        }}
        onBlur={(e) => {
          onBlur(e);
        }}
        value={selectedOption}
      >
        {listOptions}
      </select>
    </>
  );
};

export default Select;

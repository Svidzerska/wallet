import React from "react";

interface Props {
  id: string;
  name: string;
  required: boolean;
  options: string[];
  onChange: Function;
}

const Select: React.FC<Props> = ({ id, name, required, options, onChange }): JSX.Element => {
  const listOptions = options.map(function (option) {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });

  return (
    <select id={id} name={name} required={required} onChange={(e) => onChange(e)}>
      {listOptions}
    </select>
  );
};

export default Select;

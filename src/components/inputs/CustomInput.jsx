import React from "react";
import { TextInput } from "@mantine/core";

const CustomInput = ({ label, error, placeholder, onChange, value, name, icon }) => {
  return (
    <TextInput
      className="mt-3 w-full"
      radius="md"
      size="md"
      id={value}
      label={label}
      error={error}
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
      icon={icon}
    />
  );
};

export default CustomInput;

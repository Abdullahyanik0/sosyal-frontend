import React from "react";
import { PasswordInput } from "@mantine/core";
import { AiOutlineLock } from "react-icons/ai";

export const CustomPasswordInput = ({ error, onChange, value, name }) => {
  return (
    <PasswordInput
    className="mt-4"
      placeholder="Şifrenizi Giriniz"
      label="Şifre"
      error={error}
      onChange={onChange}
      value={value}
      name={name}
      size="md"
      icon={<AiOutlineLock size={24} />}
      id="input-demo"
    />
  );
};

import { Checkbox } from "@mantine/core";
import React from "react";

const CustomCheckbox = ({ label, error, onChange, value, name }) => {
      return <Checkbox name={name} onChange={onChange} error={error} value={value} mt="md" label={label} />;
};

export default CustomCheckbox;

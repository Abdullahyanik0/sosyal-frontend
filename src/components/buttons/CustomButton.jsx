import React from "react";
import { Button } from "@mantine/core";

const CustomButton = ({ children, disabled, icon, type, variant, fullWidth, className, loading, color,onClick }) => {
  return (
    <Button onClick={onClick} color={color} className={className} fullWidth={fullWidth} loading={loading} variant={variant} type={type} rightIcon={icon} disabled={disabled} size="lg">
      {children}
    </Button>
  );
};

export default CustomButton;

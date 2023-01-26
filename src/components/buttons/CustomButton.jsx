import React from 'react'
import { Button } from '@mantine/core';

const CustomButton = ({children,disabled,icon,type,variant}) => {
  return (
    <Button variant={variant} type={type} rightIcon={icon} disabled={disabled} size="md">
     {children}
    </Button>
  )
}

export default CustomButton


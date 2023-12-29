import { useState } from 'react';

type FieldState = {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
};

const initialFieldLength: FieldState = {
  name: false,
  email: false,
  password: false,
  confirmPassword: false
};

export const useFieldValidation = () => {
  const [fieldLength, setFieldLength] = useState<FieldState>(initialFieldLength);

  const validateFields = (fields: Partial<FieldState>) => {    
    setFieldLength((prevFieldLength) => {
      return { ...prevFieldLength, ...fields };
    });
  };

  return { fieldLength, validateFields };
};
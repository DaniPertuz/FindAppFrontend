import { useState } from 'react';

interface EmptyFieldValidation {
  isEmpty: boolean;
  checkEmptyFields: (...fields: string[]) => boolean;
}

export const useEmptyFieldValidation = (): EmptyFieldValidation => {
  const [isEmpty, setIsEmpty] = useState(false);

  const checkEmptyFields = (...fields: string[]): boolean => {
    const isEmptyField = fields.some((field) => field.length === 0);
    setIsEmpty(isEmptyField);
    return isEmptyField;
  };

  return { isEmpty, checkEmptyFields };
};
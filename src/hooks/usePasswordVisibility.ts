import { useState } from 'react';

export const usePasswordVisibility = () => {

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] = useState(true);
  const [eyeIcon, setEyeIcon] = useState('EyeClosed');
  const [eyeIconConfirm, setEyeIconConfirm] = useState('EyeClosed');

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    setEyeIcon((prevIcon) =>
      prevIcon === 'EyeClosed' ? 'Eye' : 'EyeClosed'
    );
  };

  const handleConfirmPasswordVisibility = () => {
    setPasswordConfirmVisibility(!passwordConfirmVisibility);
    setEyeIconConfirm((prevIcon) =>
      prevIcon === 'EyeClosed' ? 'Eye' : 'EyeClosed'
    );
  };

  return {
    eyeIcon,
    eyeIconConfirm,
    passwordVisibility,
    passwordConfirmVisibility,
    handlePasswordVisibility,
    handleConfirmPasswordVisibility
  };
}
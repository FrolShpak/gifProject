import React, { SyntheticEvent, useRef } from 'react';
import uploadVideo from '../../../api';

const InputFile = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const handleChange = async (event: SyntheticEvent) => {
    console.log('change', event);
    if (
      fileInput.current &&
      fileInput.current.files &&
      fileInput.current.files.length > 0
    ) {
      console.log('got in');
      console.log('file', fileInput.current.files[0]);
      await uploadVideo(fileInput.current.files[0]);
    }
  };
  return (
    <div>
      <label>
        Choose a video:
        <br />
        <input type="file" ref={fileInput} onChange={handleChange} />
      </label>
    </div>
  );
};

export default InputFile;

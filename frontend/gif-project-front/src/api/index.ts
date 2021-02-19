const uploadVideo = (file: File) => {
  const formData = new FormData();
  formData.append('video', file);

  fetch('http://localhost:4000/api/video', {
    method: 'PUT',
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default uploadVideo;

export const renderFileByUrl = async (url) => {
  const fileRes = await fetch(url);
  const data = await fileRes.blob();
  const file = new File([data], 'new-image.jpg', {
    type: 'image/jpeg',
  });
  return file;
};

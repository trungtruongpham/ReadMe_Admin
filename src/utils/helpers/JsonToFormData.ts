function JsonToFormData(json: any) {
  let formData = new FormData();
  for (let key in json) {
    if (json[key] instanceof FileList) {
      formData.append(key, json[key][0]);
      console.log(json[key][0]);
      console.log(key);
    } else {
      formData.append(key, json[key]);
    }
  }
  return formData;
}

export default JsonToFormData;

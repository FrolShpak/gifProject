export default class VideoDoc {
  constructor(uuid, fileExtension) {
    this.uuid = uuid;
    this.fileExtension = fileExtension;
  }

  getFileName() {
    return `${this.uuid}.${this.fileExtension}`;
  }
}

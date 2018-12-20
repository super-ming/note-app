import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  //create unique file name using current timestamp
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  return stored.key;
}

export async function s3Delete(fileKey) {
    console.log("fileKey: " +fileKey);
    const removed = await Storage.vault.remove(fileKey);
    console.log(removed);
    return removed;
}

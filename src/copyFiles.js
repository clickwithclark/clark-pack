import { promisify } from 'util';
import { join } from 'path';
import { copyFile } from 'fs';

const copyFilePromise = promisify(copyFile);

export default async function copyFiles(source, destination, files) {
  try {
    await Promise.all(
      files.map((eachFile) =>
        copyFilePromise(join(source, eachFile), join(destination, eachFile))
      )
    );
    console.log('All files copied successfully');
  } catch (error) {
    console.error('Error copying files:', error);
    throw error; // Rethrow the error if you want to handle it further up the chain
  }
}

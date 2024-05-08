import zlib from "zlib";

function compressBase64(base64String) {
  // Convert the Base64 string to a Buffer
  const buffer = Buffer.from(base64String, 'base64');

  // Compress the buffer using zlib
  const compressedBuffer = zlib.deflateSync(buffer);

  // Convert the compressed buffer to a Base64 string
  const compressedBase64 = compressedBuffer.toString('base64');

  return compressedBase64;
}

function decompressBase64(compressedBase64) {
  // Convert the compressed Base64 string to a Buffer
  const compressedBuffer = Buffer.from(compressedBase64, 'base64');

  // Decompress the buffer using zlib
  const decompressedBuffer = zlib.inflateSync(compressedBuffer);

  // Convert the decompressed buffer to a Base64 string
  const decompressedBase64 = decompressedBuffer.toString('base64');

  return decompressedBase64;
}

export { compressBase64, decompressBase64 };
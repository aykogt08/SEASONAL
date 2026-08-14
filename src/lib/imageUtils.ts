/**
 * Checks if a file is an Apple HEIC/HEIF image
 */
function isHeicFile(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return (
    name.endsWith(".heic") ||
    name.endsWith(".heif") ||
    type === "image/heic" ||
    type === "image/heif"
  );
}

/**
 * Resizes an image file (supports PNG, JPEG, WebP, GIF, SVG, and iPhone HEIC/HEIF)
 * to a max dimension and converts to compressed base64.
 */
export async function resizeImageFile(
  file: File,
  maxSize: number = 256,
  quality: number = 0.85
): Promise<string> {
  let processedBlob: Blob = file;

  // If it's a HEIC file from iPhone/Mac, convert it to JPEG first
  if (isHeicFile(file)) {
    try {
      const heic2any = (await import("heic2any")).default;
      const converted = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.9,
      });
      processedBlob = Array.isArray(converted) ? converted[0] : converted;
    } catch (e) {
      console.warn("heic2any conversion failed, fallback to native decode:", e);
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = (err) => reject(err);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP (or fallback JPEG)
        try {
          const compressedBase64 = canvas.toDataURL("image/webp", quality);
          resolve(compressedBase64);
        } catch {
          const fallbackBase64 = canvas.toDataURL("image/jpeg", quality);
          resolve(fallbackBase64);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(processedBlob);
  });
}

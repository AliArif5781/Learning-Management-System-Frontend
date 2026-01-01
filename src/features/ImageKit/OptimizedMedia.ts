import type { MediaType, UploadResponse } from "@/types/type";

export function getOptimizedMedia(res: UploadResponse) {
  let optimizedUrl = res.url;
  let mediaType: MediaType = "image";

  if (res.fileType && res.fileType.startsWith("image")) {
    optimizedUrl = `${res.url}?tr=f-webp,q-60`; // convert to webp & reduce quality
    mediaType = "image";
  } else if (res.fileType && res.fileType.startsWith("video")) {
    mediaType = "video";
  } else {
    mediaType = null;
  }

  return {
    url: optimizedUrl,
    mediaType,
  };
}

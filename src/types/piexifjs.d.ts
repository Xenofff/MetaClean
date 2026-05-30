declare module "piexifjs" {
  const piexif: {
    load: (dataUrl: string) => Record<string, unknown>;
    dump: (exifObj: Record<string, unknown>) => string;
    insert: (exifStr: string, dataUrl: string) => string;
    ExifIFD: Record<string, string>;
    ImageIFD: Record<string, string>;
    GPSIFD: Record<string, string>;
    InteropIFD: Record<string, string>;
  };
  export default piexif;
}

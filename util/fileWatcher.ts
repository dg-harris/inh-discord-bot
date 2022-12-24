import { BufReader } from "https://deno.land/std@0.170.0/io/mod.ts";
const path = "./test.txt";

type NewContentAction = (newContent: string) => void;

const defaultOptions = {
  bufferSize: 1024,
};

type WatchFileOptions = Partial<typeof defaultOptions>;

export const watchFile = async (
  filePath: string,
  action: NewContentAction,
  options: WatchFileOptions = {}
) => {
  const { bufferSize } = { ...defaultOptions, ...options };

  const file = await Deno.open(filePath);
  await Deno.seek(file.rid, 0, Deno.SeekMode.End);
  const watcher = Deno.watchFs(path);
  for await (const event of watcher) {
    if (event.paths.includes(path)) {
      const endReader = new BufReader(file);

      const buffer =
        (await endReader.readSlice(bufferSize)) || new Uint8Array();
      const newContent = await new TextDecoder().decode(buffer);
      if (newContent !== null && newContent !== "") {
        action(newContent);
      }
    }
    // Example event: { kind: "create", paths: [ "/home/alice/deno/foo.txt" ] }
  }
};

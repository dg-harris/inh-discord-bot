export const isDryRun = () => {
  return !!Deno.env.get("DRY_RUN")?.match(/true/i);
};

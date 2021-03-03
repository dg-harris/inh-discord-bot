export const invokeCommand = async (command: String) => {
  const script = `./commands/${command}.sh`

  try {
    const results = Deno.run({
	  cmd: [script],
	  stdout: 'piped',
	  stderr: 'piped',
    })

    const {code} = await results.status();
    if (code === 0) {
      const rawOutput = await results.output();
      const output = new TextDecoder().decode(rawOutput);
      return output
    } else {
      const rawError = await results.stderrOutput();
      Deno.stderr.write(rawError);
      return "Error Parsing command, check logs";
    }
  } catch (error) {
    console.log(error)
    return error.toString();
  }
}

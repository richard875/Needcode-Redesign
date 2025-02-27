if (!/yarn/.test(process.env.npm_execpath || "")) {
  console.error("🚨 Please use Yarn for this project.");
  process.exit(1);
}

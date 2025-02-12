export function environmentConfiguration() {
  return {
    PORT: Number(process.env.PORT) || 3000,
  };
}

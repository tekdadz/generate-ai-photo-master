import Replicate from "replicate";

export const FOREVER_MODEL = "lucataco/realistic-vision-v4.0:eded127fc9f01381b1d26b15e752ce80803263b852760c6bf16e3d70207fef84";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export default replicate;
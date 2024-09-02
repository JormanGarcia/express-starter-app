type Required<T> = {
  [P in keyof T]-?: T[P];
};

interface EnvVarsObject {
  PORT?: string;
  JWT_SECRET_KEY?: string;
  DATABASE_PORT?: number;
  DATABASE_HOST?: string;
  DATABASE_NAME?: string;
  DATABASE_USERNAME?: string;
  DATABASE_PASSWORD?: string;
}

type CleanVarsObject = Required<EnvVarsObject>;

const getEnvVars = (): EnvVarsObject => {
  return {
    PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_PORT: Number(process.env.DATABASE_PORT),
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  };
};

const getCleanVars = () => {
  const envVars = getEnvVars();

  const isSomeUndefined = Object.entries(envVars).find((env_var) => env_var[1] === undefined);

  if (isSomeUndefined) {
    throw new Error(`Missing env variable: ${isSomeUndefined[0]}`);
  }

  return envVars as CleanVarsObject;
};

export const CLEAN_VARS = getCleanVars();

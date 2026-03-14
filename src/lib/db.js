import sql from "mssql";

const dbConfig = {
  user: "sa",
  password: "PpdHome@1234",
  server: "sqlserver",
  port: 1433,
  database: "ppdHome_db",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool;

export async function getPool() {
  if (!pool) {
    pool = await sql.connect(dbConfig);
  }
  return pool;
}

import connection from '#/db';

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await login(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}
// login
const login = async (req, res) => {
  
};
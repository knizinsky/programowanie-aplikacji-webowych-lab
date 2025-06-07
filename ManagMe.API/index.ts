import express, { Request } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 3000;

const tokenSecret = process.env.TOKEN_SECRET as string;
let refreshTokens: string[] = [];

app.use(cors());
app.use(express.json());

// Mock bazy użytkowników
const users = [
  {
    id: 1,
    login: "admin",
    password: "admin123",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  },
  {
    id: 2,
    login: "user",
    password: "user123",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World - simple api with JWT!");
});

// LOGIN endpoint
app.post("/login", (req, res) => {
  const { login, password } = req.body;

  const user = users.find((u) => u.login === login && u.password === password);
  if (!user) {
    return res.status(401).send({ error: "Invalid login or password" });
  }

  const token = generateToken(user.id, 60); // 1 min
  const refreshToken = generateToken(user.id, 60 * 60); // 1h
  refreshTokens.push(refreshToken);

  res.status(200).send({ token, refreshToken });
});

// REFRESH TOKEN endpoint
app.post("/refreshToken", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(400).send("Bad refresh token!");
  }

  jwt.verify(refreshToken, tokenSecret, (err: any, decoded: any) => {
    if (err) return res.status(401).send(err.message);

    const token = generateToken(decoded.userId, 60);
    const newRefreshToken = generateToken(decoded.userId, 60 * 60);

    // opcjonalnie: usuwamy stary refresh token
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
    refreshTokens.push(newRefreshToken);

    res.status(200).send({ token, refreshToken: newRefreshToken });
  });
});

// PROTECTED endpoint
app.get("/protected/:id/:delay?", verifyToken, (req, res) => {
  const id = req.params.id;
  const delay = req.params.delay ? +req.params.delay : 1000;
  setTimeout(() => {
    res.status(200).send({ message: `protected endpoint ${id}` });
  }, delay);
});

// ME endpoint — zwraca dane użytkownika
app.get("/me", verifyToken, (req: any, res) => {
  const userId = req.user?.userId;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  // Zwracamy dane BEZ hasła
  const { password, ...userData } = user;
  res.status(200).send(userData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function generateToken(userId: number, expirationInSeconds: number) {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
  const token = jwt.sign({ exp, userId }, tokenSecret, { algorithm: "HS256" });
  return token;
}

function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, tokenSecret, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.status(401).send(err.message);
    }
    req.user = user;
    next();
  });
}

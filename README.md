🔙 Backend – Galactic Bounty Board API

📦 Tech Stack

🟢 Node.js + Express

🗄 MongoDB – data storage

🔐 JWT – authentication

📦 REST API – bounties, auth, user routes

⚙️ Setup & Run
Navigate to backend:

cd backend

Install dependencies:

npm install
Configure environment variables in .env:

PORT=5000
MONGO_URI="mongodb+srv://brazbogdan:AK4LOmiFTPMCSpmQ@cluster0.zjxmbms.mongodb.net/galacticBounty_db?retryWrites=true&w=majority"
JWT_SECRET="galactic_bounty_jwt_secret_token"


Start the server:

npm run start

Backend runs at: 👉 http://localhost:5000
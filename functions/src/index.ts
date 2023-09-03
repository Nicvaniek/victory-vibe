import * as functions from 'firebase-functions'
import * as express from 'express'
import * as admin from 'firebase-admin'
import * as crypto from 'crypto'
import * as cors from 'cors'

admin.initializeApp()

const app = express()

// Middleware to parse JSON requests
app.use(express.json())
app.use(cors())

// Define the route for creating a new post
app.post('/login', async (req, res) => {
    const { code } = req.body

    if (!code) {
        return res.status(400).json({ message: "Missing property 'code'" })
    }

    const db = admin.firestore()

    const usersCollection = db.collection('users')
    const query = usersCollection.where('loginCode', '==', code)

    const snapshot = await query.get()

    if (snapshot.size !== 1) {
        return res.status(401).json({ message: 'Invalid login code' })
    }

    const document = snapshot.docs[0]

    const randomPortion = crypto.randomBytes(16).toString('hex')

    const sessionId = crypto
        .createHash('sha256')
        .update(`${code}${randomPortion}`)
        .digest('hex')

    return res.status(200).json({
        sessionId,
        user: {
            id: document.id,
            name: document.data()['name'],
            isAdmin: document.data()['isAdmin'],
        },
    })
})

// Export the Express app as a Firebase Cloud Function
exports.app = functions.https.onRequest(app)

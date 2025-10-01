## Product AI Demo

An AI-powered product discovery demo built with Next.js (App Router), MongoDB, and Pinecone. Users can browse products and view AI-recommended similar products using embeddings generated via the Hugging Face Inference API.

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Vector DB**: Pinecone
- **Embeddings**: Hugging Face `sentence-transformers/all-MiniLM-L6-v2` via Inference API

---

## Quick Start

1) Install dependencies
```bash
npm install
```

2) Create environment file `.env.local`
```bash
MONGO_URI=your_mongodb_connection_string
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
HF_TOKEN=your_huggingface_api_token
```

3) Run the app (dev)
```bash
npm run dev
```
Open http://localhost:3000

4) Seed Pinecone vectors (after you have products in MongoDB)
```bash
node seedPinecone.js
```

> Note: Ensure your Pinecone index (name in `PINECONE_INDEX_NAME`) exists and is configured for the embedding dimension returned by the Hugging Face model.

---

## Scripts
- `npm run dev` — start Next.js in development (Turbopack)
- `npm run build` — build for production (Turbopack)
- `npm run start` — start production server
- `npm run lint` — run ESLint

---

## Environment Variables
- `MONGO_URI`: MongoDB connection string
- `PINECONE_API_KEY`: Pinecone API key
- `PINECONE_INDEX_NAME`: Pinecone index name
- `HF_TOKEN`: Hugging Face Inference API token

Create `.env.local` at the project root. Next.js automatically loads it.

---

## Project Structure
```
src/
  app/
    api/
      products/
        route.js                # GET all products
        [id]/route.js           # GET product by id + similar via Pinecone
    components/
      ProductCard.jsx
    lib/
      db.js                     # Mongo connection helper
      pinecone.js               # Pinecone client helper
    models/
      product.js                # Product Mongoose model
    page.js                     # Home page
    products/
      page.jsx                  # Product list page
      [id]/page.jsx             # Product detail w/ similar products
seedPinecone.js                 # Seeds Pinecone from Mongo products
```

---

## API

### GET /api/products
Returns a list of products from MongoDB.

Example response:
```json
[
  {
    "_id": "...",
    "name": "...",
    "category": "...",
    "price": 0,
    "description": "...",
    "image": "..."
  }
]
```

### GET /api/products/[id]
Returns a single product and a list of similar products (via Pinecone vector search using an embedding of the product name + description).

Example response:
```json
{
  "product": { "_id": "...", "name": "...", "description": "..." },
  "similarProducts": [
    { "id": "...", "score": 0.87, "name": "...", "category": "...", "price": 0, "description": "...", "image": "..." }
  ]
}
```

---

## Data & Seeding
- Products are stored in MongoDB using the `Product` model.
- `seedPinecone.js` reads products from MongoDB, generates embeddings using the Hugging Face Inference API, and upserts vectors to Pinecone with product metadata.
- Ensure your MongoDB has product documents before running the seed. You can insert them manually or via a custom script/UI.

---

## Development Notes
- This project uses the Next.js App Router (`src/app`).
- UI styling uses Tailwind CSS 4. Adjust global styles in `src/app/globals.css`.
- React loading states are handled with `react-spinners`.

---

## Troubleshooting
- "MongoDB connection failed": verify `MONGO_URI` and network access.
- Pinecone errors: confirm `PINECONE_API_KEY`/`PINECONE_INDEX_NAME` and index dimension/region.
- Hugging Face API errors: ensure `HF_TOKEN` has access, check rate limits.
- 404 on product detail: make sure the `id` exists in MongoDB and that `seedPinecone.js` ran (for similar results).

---

## License
This repository is for demo and educational purposes.

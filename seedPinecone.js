import dotenv from "dotenv";
import { getPineconeClient } from "./src/app/lib/pinecone.js";
import { connectDB } from "./src/app/lib/db.js";
import Product from "./src/app/models/product.js";

dotenv.config();

async function getHFEmbedding(text) {
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: text }),
    }
  );

  const result = await response.json();
  
  console.log("HF API Response:", JSON.stringify(result, null, 2));
  console.log("Result type:", typeof result);
  console.log("Result length:", Array.isArray(result) ? result.length : "Not an array");
  
  return result; 
}

async function run() {
  await connectDB();

  const pinecone = await getPineconeClient();
  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

  const products = await Product.find();

  for (const product of products) {
    const text = `${product.name} ${product.description}`;
    const embedding = await getHFEmbedding(text);
    await index.upsert([
      {
        id: product._id.toString(),
        values: embedding,
        metadata: {
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
          image: product.image,
        },
      },
    ]);

    console.log(`✅ Uploaded ${product.name}`);
  }

  console.log("🎉 All products uploaded to Pinecone using Hugging Face embeddings!");
}

run().catch(console.error);
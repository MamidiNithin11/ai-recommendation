import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Product from "../../../models/product";
import { getPineconeClient } from "../../../lib/pinecone";

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

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    await connectDB();
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const embedding = await getHFEmbedding(`${product.name} ${product.description}`);
    const pinecone = await getPineconeClient();
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
    const queryResult = await index.query({
      vector: embedding,
      topK: 8,
      includeMetadata: true,
    });

    const similarProducts = queryResult.matches
      .filter((match) => match.id !== id)
      .map((match) => ({
        id: match.id,
        score: match.score,
        ...match.metadata,
      }));

    return NextResponse.json({ product, similarProducts });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
import {connectDB} from '../../lib/db'
import Product from '../../models/product'

export async function GET() {
    try{
        await connectDB();
        const products=await Product.find({});
        return new Response(JSON.stringify(products))
    }catch(error){
        return new Response(JSON.stringify({error:'Failed to fetch products'}),{status:500,headers:{'Content-Type':'application/json'}});
    }
}
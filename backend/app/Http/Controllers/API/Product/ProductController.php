<?php

namespace App\Http\Controllers\Api\Product;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get all product
        $products = Product::all();

        //return collection of product as a resource
        return new ProductResource(true, 'Success!', $products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //define validation rules
        $validator = Validator::make($request->all(), [
            'nama'        => 'required|string|min:3|max:255',
            'kategori'    => 'required|array|min:1',
            'kategori.*'  => 'required|string|distinct|min:1',
            'stok'        => 'required|numeric',
            'harga'       => 'required|numeric',
            'gambar'      => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'kode_barang' => 'required|string',
        ]);

        //check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        if ($request->hasFile('gambar')) {
            $image = $request->file('gambar');
            $image->storeAs('public/products', $image->hashName());
        } else {
            return response()->json(['message' => 'Image is required.'], 422);
        }

        //create product
        $product = Product::create([
            'nama'        => $request->nama,
            'kategori'    => $request->kategori,
            'stok'        => $request->stok,
            'harga'       => $request->harga,
            'gambar'      => $image->hashName(),
            'kode_barang' => $request->kode_barang
        ]);

        //return response
        return new ProductResource(true, 'Created successfully!', $product);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);

        // return single product by id
        return new ProductResource(true, 'Success!', $product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  string $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $id)
    {
        // Activate data validation
        $validator = Validator::make($request->all(), [
            'nama'        => 'required',
            'kategori'    => 'required',
            'stok'        => 'required',
            'harga'       => 'required',
            'kode_barang' => 'required',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Find product by ID
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Initialize update data array
        $updateData = [
            'nama'        => $request->input('nama'),
            'kategori'    => $request->input('kategori'),
            'stok'        => $request->input('stok'),
            'harga'       => $request->input('harga'),
            'kode_barang' => $request->input('kode_barang')
        ];

        // Check and handle image upload
        if ($request->hasFile('gambar')) {
            $image = $request->file('gambar');
            $image->storeAs('public/posts', $image->hashName());
            Storage::delete('public/posts/' . basename($product->image));
            $updateData['gambar'] = $image->hashName();
        }

        // Update product with new data
        $product->update($updateData);

        // Return response
        return new ProductResource(true, 'Updated successfully!', $product);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //find post by ID
        $post = Product::find($id);

        //delete image
        Storage::delete('public/posts/' . basename($post->image));

        //delete post
        $post->delete();

        //return response
        return new ProductResource(true, 'Deleted successfully!', null);
    }
}

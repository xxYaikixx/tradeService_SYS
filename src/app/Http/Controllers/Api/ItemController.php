<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    // postの一覧を表示する
    public function index()
    {
        $items = Item::all();
        for ($n = 0; $n<count($items); $n++) {
            $items[$n]['nickname']=DB::table('users')->find($items[$n]->user_id)->nickname;
        }
        return response()->json($items, 200);
    }
    // itemの追加
    public function create(Request $request)
    {
        $item = new Item;
        $item->name = $request->itemName;
        $item->status = $request->itemStatus;
        $item->comment = $request->comment;
        $image = $request->file('image');
        $path = Storage::disk('public')->putFile('image', $image);
        $item->image = 'storage/'.$path;
        $item->user_id =  Auth::id();
        $item->change_item_name = $request->itemTargetName;
        $item->change_item_status = $request->itemTargetStatus;
        $item->shipping_method = $request->shippingMethod;
        $item->save();
    }
}

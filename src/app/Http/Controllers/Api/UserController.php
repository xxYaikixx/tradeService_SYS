<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // userを作成する
    public function create(Request $request)
    {
        $user = new User;
        $user->name = $request->name;
        $user->nickname = $request->nickname;
        //画像保存
        $thumbnail = $request->file('thumbnail');
        $path = Storage::disk('public')->putFile('thumbnail', $thumbnail);
        $user->thumbnail = $path;
        
        $user->email = $request->email;
        $user->zipcode =  $request->zipcode;
        $user->address = $request->address;
        $user->address2 = $request->address2;
        $user->password = Hash::make($request->password);
        $user->email_verified_at = Carbon::now();
        $user->save();
    }
}

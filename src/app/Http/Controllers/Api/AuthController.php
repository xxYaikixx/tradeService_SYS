<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required',
            'password'=>'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status'=>401,
                    'message'=>'入力情報が不正です',
                ]);
            } else {
                $token = $user->createToken($user->email.'_Token')->plainTextToken;
                return response()->json([
                    'status'=>200,
                    'id'=>$user->id,
                    'username'=>$user->name,
                    'url'=>Storage::url($user->thumbnail),
                    'nickname'=>$user->nickname,
                    'thumbnail'=>$user->thumbnail,
                    'token'=>$token,
                    'message'=>'ログインに成功しました。'
                ]);
            }
        }
    }

    public function logout()
    {
        Log::info(auth()->user());
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'ログアウト成功',
        ]);
    }
}

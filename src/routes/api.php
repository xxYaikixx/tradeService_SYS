<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// 未認証状態で使う
Route::post('login', [AuthController::class, 'login']);
Route::post('posts/register', [UserController::class, 'create']);


// 認証済み状態で使う
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('posts', [ItemController::class,'index']);
    Route::post('posts/create', [ItemController::class,'create']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('search', [ItemController::class,'search']);
    Route::post('logout', [AuthController::class, 'logout']);
});

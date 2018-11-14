<?php

use Illuminate\Http\Request;

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

const API_CONTROLLER_PATH = 'API\\';

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResources([
    'users' => API_CONTROLLER_PATH.'UserController'
]);

Route::get('profile',API_CONTROLLER_PATH.'UserController@profile');
Route::post('profile/edit/{id}',API_CONTROLLER_PATH.'UserController@profileUpdate');
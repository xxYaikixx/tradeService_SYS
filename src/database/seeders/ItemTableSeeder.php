<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Faker\Factory as Faker;
use App\Models\Item;
use Illuminate\Support\Facades\DB;

class ItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //一括削除
        Item::truncate();
        $faker =  Faker::create('ja_JP');
        $params=[
            [
                'name' => 'カプセルトイ（グランティ）',
                'status' => rand(0, 3),
                'image' => $faker->imageUrl($width = 300, $height = 300),
                'user_id' => rand(1, 4),
                'comment' => $faker->realText($maxNbChars = 50),
                'change_item_name' => 'カプセルトイ（スナッフィー）',
                'change_item_status' => rand(0, 3),
                'shipping_method' => rand(0, 4),
            ],
            [
                'name' => 'カプセルトイ（雪の日のうさこちゃん）',
                'status' => rand(0, 3),
                'image' => $faker->imageUrl($width = 300, $height = 300),
                'user_id' => rand(1, 4),
                'comment' => $faker->realText($maxNbChars = 50),
                'change_item_name' => 'カプセルトイ（ボリス）',
                'change_item_status' => rand(0, 3),
                'shipping_method' => rand(0, 4),
            ],
            [
                'name' => 'カプセルトイ（ボリス）',
                'status' => rand(0, 3),
                'image' => $faker->imageUrl($width = 300, $height = 300),
                'user_id' => rand(1, 4),
                'comment' => $faker->realText($maxNbChars = 50),
                'change_item_name' => 'カプセルトイ（ミッフィーのママ）',
                'change_item_status' => rand(0, 3),
                'shipping_method' => rand(0, 4),
            ],
            [
                'name' => 'カプセルトイ（ミッフィーのパパ）',
                'status' => rand(0, 3),
                'image' => $faker->imageUrl($width = 300, $height = 300),
                'user_id' => rand(1, 4),
                'comment' => $faker->realText($maxNbChars = 50),
                'change_item_name' => 'カプセルトイ（スナッフィー）',
                'change_item_status' => rand(0, 3),
                'shipping_method' => rand(0, 4),
            ],
        ];
        $now = Carbon::now();
        foreach ($params as $param) {
            $param['created_at'] = $now;
            $param['updated_at'] = $now;
            DB::table('items')->insert($param);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Faker\Factory as Faker;
use App\Models\TradeInfo;
use Illuminate\Support\Facades\DB;

class TradeInfoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //一括削除
        TradeInfo::truncate();
        $faker =  Faker::create('ja_JP');
        $params=[
            [
                'item_id' => rand(1, 4),
                'change_item_name' => 'カプセルトイ（ミッフィーのお母さん）',
                'change_item_status' => rand(0, 3),
                'shipping_method' => rand(0, 4),
            ],
            [
                'item_id' => rand(1, 4),
                'change_item_name' => 'カプセルトイ（バーバラ）',
                'change_item_status' => rand(0, 3),
                'shipping_method' => rand(0, 4),
            ],
            [
                'item_id' => rand(1, 4),
                'change_item_name' => 'カプセルトイ（雪の日のうさこちゃん）',
                'change_item_status' => rand(0, 3),
                'shipping_method' => rand(0, 4),
            ],
            [
                'item_id' => rand(1, 4),
                'change_item_name' => 'カプセルトイ（ダーン）',
                'change_item_status' => rand(0, 3),
                'shipping_method' => rand(0, 4),
            ],
        ];
        $now = Carbon::now();
        foreach ($params as $param) {
            $param['created_at'] = $now;
            $param['updated_at'] = $now;
            DB::table('trade_infos')->insert($param);
        }
    }
}

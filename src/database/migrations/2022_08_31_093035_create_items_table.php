<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->char('status')->comment('0:カプセル未開封 1:カプセルのみ開封済み 2:カプセルおよび内包装開封済み（新品同様） 3:開封済中古品');
            $table->string('image')->nullable();
            $table->string('user_id')->references('id')->on('users');
            $table->longText('comment')->nullable();
            $table->string('change_item_name');
            $table->char('change_item_status')->comment('0:カプセル未開封 1:カプセルのみ開封済み 2:カプセルおよび内包装開封済み（新品同様） 3:開封済中古品');
            $table->char('shipping_method')->comment('0:手渡し 1:郵便（記名） 2:郵便（匿名） 3:宅配（記名） 4:宅配（匿名）');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
};

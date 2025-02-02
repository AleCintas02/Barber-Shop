<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barbero extends Model
{
    use HasFactory;
    protected $table = 'barberos';
    protected $fillable = [
        'nombre',
        'telefono',
        'email',
        'estado'
    ];

    public function pedido()
    {
        return $this->hasMany(Pedido::class, 'id_barbero');
    }

}

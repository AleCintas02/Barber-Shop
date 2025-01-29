<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedidos';

    protected $fillable = [
        'nombre_cliente',
        'id_barbero',
        'id_servicio',
        'estado',
    ];

    public function barbero()
    {
        return $this->belongsTo(Barbero::class,'id_barbero');
    }

    public function servicio()
    {
        return $this->belongsTo(Servicio::class,'id_servivio');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Barbero;
use App\Models\Pedido;
use App\Models\Servicio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{

    public function index() {}


    public function create()
    {
        return Inertia::render('Pedidos');
    }


    public function store(Request $request)
    {
        $validateData = $request->validate([
            'nombre_cliente' => 'required|string|max:255',
            'id_barbero' => 'nullable|integer|min:1',
            'id_servicio' => 'nullable|integer|min:1',
            'estado' => 'sometimes|in:pendiente,aprobado,terminado,vencido'
        ]);

        try {
            $nuevoPedido = new Pedido();
            $nuevoPedido->nombre_cliente = $validateData['nombre_cliente']; 
            $nuevoPedido->id_barbero = $validateData['id_barbero'] ?? null;
            $nuevoPedido->id_servicio = $validateData['id_servicio'] ?? null;
            $nuevoPedido->estado = $validateData['estado'] ?? 'pendiente';
            $nuevoPedido->save();

            return response()->json([
                'success' => true,
                'message' => 'Pedido realizado correctamente',
                'pedido' => $nuevoPedido
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al realizar el pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    public function show(string $id)
    {
        //
    }


    public function edit(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        //
    }


    public function destroy(string $id)
    {
        //
    }

    public function attach(Request $request, string $id)
    {

        $validateData = $request->validate([
            'id_barbero' => 'sometimes|integer|min:1',
            'id_servicio' => 'sometimes|integer|min:1'
        ]);

        try {
            $pedido = Pedido::find($id);

            if (!$pedido) {
                return response()->json([
                    'success' => false,
                    'message' => 'Pedido no encontrado',
                ], 404);
            }

            if (!empty($validateData['id_barbero'])) {

                $barbero = Barbero::find($validateData['id_barbero']);

                if (!$barbero) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Barbero no encontrado',
                    ], 404);
                }

                $pedido->id_barbero = $validateData['id_barbero'];
            }


            if (!empty($validateData['id_servicio'])) {

                $servicio = Servicio::find($validateData['id_servicio']);
                if (!$servicio) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Servicio no encontrado',
                    ], 404);
                }
                $pedido->id_servicio = $validateData['id_servicio'] ;
            }

            $pedido->save();
            return response()->json([
                'success' => true,
                'message' => 'Pedido actualizado correctamente',
                'pedido' => $pedido
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el pedido',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

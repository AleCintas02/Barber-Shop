<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Exception;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiciosController extends Controller
{
    public function index()
    {
        try {
            $servicios = Servicio::all();

            return response()->json([
                'success' => true,
                'message' => "Lista de servicios",
                'data' => $servicios
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'error al listar servicios',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function create()
    {
        return Inertia::render('NuevoServicio');
    }
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
            'descripcion' => 'nullable|string|max:255',
            'tiempo_estimado' => 'required|integer|min:1',
        ]);

        try {

            $servicio = new Servicio();
            $servicio->nombre = $validatedData['nombre'];
            $servicio->precio = $validatedData['precio'];
            $servicio->descripcion = $validatedData['descripcion'];
            $servicio->tiempo_estimado = $validatedData['tiempo_estimado'];

            $servicio->save();

            return response()->json([
                'success' => true,
                'message' => 'Servicio creado exitosamente.',
                'servicio' => $servicio,
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Error al crear el servicio.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function update(Request $request, string $id)
    {
        $validateData = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'precio' => 'sometimes|numeric|min:0',
            'descripcion' => 'sometimes|string|max:255',
            'tiempo_estimado' => 'sometimes|integer|min:1',
        ]);

        try {
            $servicioEditar = Servicio::findOrFail($id);

            if (!$servicioEditar) {
                return response()->json([
                    'success' => false,
                    'message' => 'servicio no encontrado'
                ], 404);
            }

            $servicioEditar->update($validateData);
            $servicioEditar->save();

            return response()->json([
                'success' => true,
                'message' => 'servicio editado con exito',
                'servicio' => $servicioEditar
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'error al editar servicio',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function destroy(string $id)
    {

        try {
            $servicioEliminar = Servicio::find($id);

            if (!$servicioEliminar) {
                return response()->json([
                    'success' => false,
                    'message' => 'Servicio no encontrado',
                ], 404);
            }

            $servicioEliminar->delete();
            return response()->json([
                'success' => true,
                'message' => 'Servicio eliminado',
                'servicio' => $servicioEliminar
            ],200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar servicio',
                'error' => $e->getMessage()
            ],500);
        }
    }
    public function show(string $id)
    {
        try {
            $servicio = Servicio::find($id);
            if (!$servicio) {
                return response()->json([
                    'success' => false,
                    'message' => 'servicio no encontrado'
                ],404);
            }

            return response()->json([
                'success' => true,
                'servicio' => $servicio
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al encontrar servicio',
                'error' => $e->getMessage()
            ],500);
        }
    }
    public function edit(string $id) {}
}

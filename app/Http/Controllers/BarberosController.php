<?php

namespace App\Http\Controllers;

use App\Models\Barbero;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarberosController extends Controller
{

    public function index()
    {
        try {
            $barberos = Barbero::all();
            return response()->json([
                'success' => true,
                'barberos' => $barberos
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'error al listar baberos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function create()
    {
        return  Inertia::render('GestionBarberos');
    }

    public function store(Request $request)
    {
        $validateData = $request->validate([
            'nombre' => 'required|string|max:255',
            'telefono' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        try {
            $barbero = Barbero::create($validateData);

            return response()->json([
                'success' => true,
                'message' => 'Barbero creado',
                'barbero' => $barbero
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'error al crear babero',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $barbero = Barbero::find($id);

            if (!$barbero) {
                return response()->json([
                    'success' => false,
                    'message' => 'barbero no encontrado'
                ], 204);
            }
            return response()->json([
                'success' => true,
                'message' => 'Barbero encontrado',
                'barbero' => $barbero
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'error al crear babero',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    { 
        // Validar solo los campos que están presentes en la solicitud
        $validateData = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'telefono' => 'sometimes|string|max:255',
            'email' => 'sometimes|nullable|email|max:255',
            'estado' => 'sometimes|in:activo,inactivo'
        ]);

        try {
            $barberoEditar = Barbero::find($id);

            if (!$barberoEditar) {
                return response()->json([
                    'success' => false,
                    'message' => 'barbero no encontrado'
                ]);
            }

            $barberoEditar->update($validateData);

            $barberoEditar->save();

            return response()->json([
                'success' => true,
                'message' => 'barbero editado',
                'barbero' => $barberoEditar
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'error al actualizar barbero',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function destroy(string $id)
    {
        try {
            $barberoEliminar = Barbero::find($id);

            if (!$barberoEliminar) {
                return response()->json([
                    'success' => false,
                    'message' => 'barbero no encontado'
                ]);
            }

            $barberoEliminar->delete();

            return response()->json([
                'success' => true,
                'message' => 'barbero eliminado',
                'barbero' => $barberoEliminar
            ]);

            Barbero::destroy($barberoEliminar);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'error al crear babero',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

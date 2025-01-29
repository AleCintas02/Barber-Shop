import React from 'react';

function ModalEditarServicio({ visible, servicio, onClose, onSave }) {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Editar Servicio</h3>
                <form>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                            value={servicioSeleccionado?.nombre || ''}
                            onChange={(e) =>
                                setServicioSeleccionado({ ...servicioSeleccionado, nombre: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                            Precio
                        </label>
                        <input
                            type="number"
                            id="precio"
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                            value={servicioSeleccionado?.precio || ''}
                            onChange={(e) =>
                                setServicioSeleccionado({ ...servicioSeleccionado, precio: e.target.value })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tiempo_estimado" className="block text-sm font-medium text-gray-700">
                            Tiempo Estimado
                        </label>
                        <input
                            type="text"
                            id="tiempo_estimado"
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                            value={servicioSeleccionado?.tiempo_estimado || ''}
                            onChange={(e) =>
                                setServicioSeleccionado({ ...servicioSeleccionado, tiempo_estimado: e.target.value })
                            }
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            onClick={cerrarModal}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                // Aquí puedes manejar el envío del formulario
                                console.log('Formulario enviado', servicioSeleccionado);
                                cerrarModal();
                            }}
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditarServicio;

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import '../../css/agregarServicio.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import FormServices from '@/Components/FormServices';

function NuevoServicio() {
    const [servicios, setServicios] = useState([]); // Estado para almacenar los servicios
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null); // Estado para almacenar el servicio seleccionado para editar

    // Función para obtener los servicios
    const listarServicios = async () => {
        try {
            const response = await fetch('/listar-servicios', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al obtener los servicios.');
            }

            const data = await response.json();

            // Validar que `data.data` sea un arreglo
            if (Array.isArray(data.data)) {
                setServicios(data.data);
            } else {
                throw new Error('La estructura de datos es inválida.');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // Función para eliminar un servicio
    const eliminarServicio = async (id) => {
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const response = await fetch(`/eliminar-servicio/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token, // Incluye el token CSRF aquí
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el servicio.');
            }

            // Actualizar la lista de servicios eliminando el servicio con el id proporcionado
            setServicios((prevServicios) => prevServicios.filter((servicio) => servicio.id !== id));
            console.log(`Servicio con ID ${id} eliminado.`);
        } catch (error) {
            console.error('Error al eliminar el servicio:', error.message);
        }
    };

    // Función para abrir el modal y seleccionar un servicio para editar
    const abrirModal = (servicio) => {
        setServicioSeleccionado(servicio);
        setModalVisible(true);
    };

    // Función para cerrar el modal
    const cerrarModal = () => {
        setServicioSeleccionado(null);
        setModalVisible(false);
    };

    // ** Función para editar un servicio **
    const editarServicio = async (e) => {
        e.preventDefault(); // Evita el envío del formulario por defecto
        try {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const response = await fetch(`/editar-servicio/${servicioSeleccionado.id}`, {
                method: 'PUT', // O PATCH según lo manejes en tu backend
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token, // Token CSRF para seguridad
                },
                body: JSON.stringify(servicioSeleccionado), // Enviar datos del servicio editado
            });

            if (!response.ok) {
                throw new Error('Error al editar el servicio.');
            }

            const updatedServicio = await response.json();

            // Actualizar la lista de servicios localmente
            setServicios((prevServicios) =>
                prevServicios.map((servicio) =>
                    servicio.id === updatedServicio.id ? updatedServicio : servicio
                )
            );

            console.log('Servicio actualizado:', updatedServicio);

            // Opcional: Volver a listar servicios para garantizar sincronización con el servidor
            await listarServicios();

            cerrarModal(); // Cerrar el modal después de guardar
        } catch (error) {
            console.error('Error al editar el servicio:', error.message);
        }
    };


    // Obtener servicios al cargar el componente
    useEffect(() => {
        listarServicios();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Nuevo Servicio
                </h2>
            }
        >
            <Head title="Nuevo Servicio" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="contenedor-general overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <FormServices></FormServices>
                        </div>

                        {/* Contenedor de tarjetas */}
                        <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                            {servicios.length > 0 ? (
                                servicios.map((servicio, index) => (
                                    <div key={index} className="card bg-gray-100 p-4 rounded-lg shadow-md">
                                        <p className="titulo-servicio font-bold text-lg">{servicio.nombre}</p>
                                        <p className="titulo-servicio font-bold text-lg text-gray-400">{servicio.descripcion}</p>
                                        <p className="precio-servicio text-gray-600">${servicio.precio}</p>
                                        <p className="duracion-servicio text-gray-500">
                                            {servicio.tiempo_estimado || 'No especificado'} <i className="bi bi-clock"></i>
                                        </p>
                                        <div className="flex justify-end space-x-2 mt-2">
                                            <button
                                                className="bg-transparent border-0 p-2 text-blue-500"
                                                onClick={() => abrirModal(servicio)}
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                            <button
                                                className="bg-transparent border-0 p-2 text-red-500"
                                                onClick={() => eliminarServicio(servicio.id)}
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No hay servicios disponibles.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Editar Servicio</h3>
                        <form onSubmit={editarServicio}>
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
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

export default NuevoServicio;

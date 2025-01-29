export const agregarServicio = async ({ nombre, precio, descripcion, tiempoEstimado }) => {
    // Obtener el token CSRF desde la metaetiqueta
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    if (!csrfToken) {
        return { success: false, message: 'Token CSRF no encontrado.' };
    }

    try {
        const response = await fetch('/agregar-servicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,  // Añadir el token CSRF a los encabezados
            },
            body: JSON.stringify({
                nombre,
                precio: parseFloat(precio),
                descripcion,
                tiempoEstimado,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al agregar el servicio.');
        }


        return { success: true, message: 'Servicio agregado exitosamente.' };
    } catch (error) {
        return { success: false, message: error.message || 'Error de red al agregar el servicio.' };
    }
};

// const listarServicios = async () => {
//     try {
//         const response = await fetch('/listar-servicios', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             throw new Error('Error al obtener los servicios.');
//         }

//         const data = await response.json();

//         // Imprimir la respuesta para depurar
//         console.log('Respuesta del servidor:', data);

//         // Comprobar si la respuesta es un array directamente
//         if (Array.isArray(data)) {
//             setServicios(data);
//         } else {
//             console.log('La estructura no es un array:', data);
//             throw new Error('La estructura de datos es inválida.');
//         }
//     } catch (error) {
//         console.error('Error:', error.message);
//         setMensaje('No se pudieron cargar los servicios.');
//         setSuccess(false);
//     }
// };

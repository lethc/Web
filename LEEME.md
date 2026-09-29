# Propuesta Tesis GAMT

Diseño estático adaptable a móviles y escritorio. Abrir con un servidor local desde `dist`.

## Contenido
- Estructura según la maqueta: presentación + video, tres áreas y redes.
- Colores de marca: #009d1a y #00254f.
- Video vertical en contenedor 9:16, preparado para 1080 × 1920.
- Enlaces de WhatsApp, Instagram, Facebook, TikTok y YouTube actualizados con los proporcionados por el usuario. Se unió el salto de línea del enlace de WhatsApp: mensaje «Hola, deseo empezar mi tesis 🎓».
- El video se amplía en una ventana modal al hacer clic o tocar. Cierre con botón, Escape o fondo exterior; al cerrar continúa silenciado y conserva la posición de reproducción.
- Retratos ilustrativos generados con IA: no representan al equipo real.
- Portada y video provienen de la web de GAMT.
- Tipografías DM Sans y Manrope vía Google Fonts, con respaldo sans-serif.
- Animaciones respetan la preferencia de movimiento reducido.

## Actualización multimedia
El video vertical se sirve como assets/presentacion-web.mp4 (H.264/AAC compatible con navegadores), conservando el MOV original. Inicia automáticamente silenciado y en bucle; al ampliar activa sonido y controles. Al cerrar continúa silenciado en la portada. Algunos dispositivos pueden restringir autoplay por ahorro de energía.

## Interacciones de contacto

Los contactos y los botones de asesoría muestran un halo de color que se expande y desvanece cada dos segundos, con ciclos escalonados. Funciona automáticamente en escritorio y móvil; respeta movimiento reducido y no desplaza las áreas de clic.

El halo de “Asesoría gratis” usa un verde bosque más oscuro. La sección de redes incluye un letrero naranja animado “¡Haz clic aquí!” y cinco flechas, alineadas con cada canal también en teléfonos.

Al ampliar el video, este aparece como una tarjeta vertical flotante sobre la página. El fondo permanece visible y atenuado para conservar el contexto, mientras el reproductor activa sonido y controles.

En teléfonos, el texto y el video se mantienen lado a lado, las tres carreras comparten una fila y los cinco contactos otra. Se ocultan textos secundarios, adornos y el botón fijo inferior para conservar una distribución compacta. Los enlaces mantienen su área táctil y el video sigue ampliándose al tocarlo.

Las tarjetas de WhatsApp, Instagram, Facebook, TikTok y YouTube usan los colores oficiales de cada plataforma. Los enlaces sociales y las llamadas de contacto incorporan entrada escalonada, elevación, aro expansivo y respuesta al toque. Las animaciones se desactivan cuando el dispositivo solicita movimiento reducido.

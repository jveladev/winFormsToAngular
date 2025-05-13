#!/bin/bash

# Variables de configuración - Modificar estos prefijos según sea necesario
PREFIJO_ANGULAR="target_PROV_"
PREFIJO_WIN="source_PROV_"

# Definir las rutas de origen y destino
ORIGEN_ANGULAR="/home/jvela/Proyectos/oesia/POC-IA-GenerateCode/FicherosOrigenDestino/Provincias/AngularDestino"
ORIGEN_WIN="/home/jvela/Proyectos/oesia/POC-IA-GenerateCode/FicherosOrigenDestino/Provincias/WinOrigen"
DESTINO="/home/jvela/Proyectos/oesia/POC-IA-GenerateCode/FicherosOrigenDestino/rename"

# Crear la carpeta de destino si no existe
mkdir -p "$DESTINO"

echo "=== Procesando archivos de AngularDestino ==="
# Encontrar todos los archivos en la primera carpeta de origen (incluyendo subcarpetas) y copiarlos
# al destino con el prefijo configurado
find "$ORIGEN_ANGULAR" -type f -print0 | while IFS= read -r -d '' archivo; do
    # Obtener solo el nombre del archivo sin la ruta
    nombre_archivo=$(basename "$archivo")

    # Copiar el archivo al destino con el nuevo nombre
    cp "$archivo" "$DESTINO/${PREFIJO_ANGULAR}$nombre_archivo"

    echo "Copiado: $archivo -> $DESTINO/${PREFIJO_ANGULAR}$nombre_archivo"
done

echo -e "\n=== Procesando archivos de WinOrigen ==="
# Encontrar todos los archivos en la segunda carpeta de origen (incluyendo subcarpetas) y copiarlos
# al destino con el prefijo configurado
find "$ORIGEN_WIN" -type f -print0 2>/dev/null | while IFS= read -r -d '' archivo; do
    # Obtener solo el nombre del archivo sin la ruta
    nombre_archivo=$(basename "$archivo")

    # Copiar el archivo al destino con el nuevo nombre
    cp "$archivo" "$DESTINO/${PREFIJO_WIN}$nombre_archivo"

    echo "Copiado: $archivo -> $DESTINO/${PREFIJO_WIN}$nombre_archivo"
done

echo -e "\nProceso completado. Todos los archivos fueron copiados a $DESTINO."
echo "- Archivos de AngularDestino con prefijo '${PREFIJO_ANGULAR}'"
echo "- Archivos de WinOrigen con prefijo '${PREFIJO_WIN}'"
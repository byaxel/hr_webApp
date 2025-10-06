// Indica que este componente se ejecuta en el cliente (browser) y puede usar hooks de React
"use client";

// Importa la función para crear el cliente de Supabase
import { createClient } from "@/lib/supabase/client";

// Importa el componente Button personalizado
import { Button } from "@/components/ui/button";

// Importa el hook de Next.js para controlar la navegación programática
import { useRouter } from "next/navigation";

// Importa hooks de React para estado y efectos
import { useEffect, useState } from "react";

// Importa el tipo "User"
import { User } from "@/types/user"

// -----------------------------------------------------------------------------
// Componente LogoutButton
// -----------------------------------------------------------------------------
export function LogoutButton() {
   // Estado para almacenar la información del usuario logueado
   const [user, setUser] = useState<User | null>(null);

  // Inicializa el router de Next.js para poder redirigir después de cerrar sesión
  const router = useRouter();

  // useEffect que se ejecuta al montar el componente
  useEffect(() => {
    // Crea una instancia del cliente de Supabase
    const supabase = createClient();

    // Función que obtiene el usuario autenticado y su info de la tabla "users"
    async function fetchUser() {
      const { data: authData } = await supabase.auth.getUser();
      const uid = authData.user?.id;
      if (!uid) return;

      const { data: userData} = await supabase
        .from("users")
        .select("*")
        .eq("id", uid)
        .single()

        if (userData) setUser(userData) // Actualiza el estado con la info del usuario
    }

    fetchUser();

  }, []); // Dependencias vacías: solo se ejecuta al montar

  // Función asincrónica que cierra la sesión del usuario
  const logout = async () => {
    // Crea una instancia del cliente de Supabase
    const supabase = createClient();
    // Cierra la sesión del usuario
    await supabase.auth.signOut();
    // Redirige a la página de login después de cerrar sesión
    router.push("/auth/login");
  };

  return (
    // Contenedor principal: flex vertical, alineado al inicio, con espacio entre elementos
    <div className="flex flex-col items-start gap-4">
      {user ? (
        
        // Muestra el saludo con el email del usuario si hay sesión
        <p className="text-sm font-light">Hey, {user.first_name}!</p>
      ) : (
        // Muestra "Loading..." mientras se obtiene la información del usuario
        <p className="text-sm font-light">Loading...</p>
      )}
      
      <div className="flex flex-col text-center w-full gap-1">
        {/* Botón para cerrar sesión */}
        <Button size="full" onClick={logout}>Logout</Button>

        {/* Muestra el email del usuario debajo del botón */}
        {user && <p className="text-xs font-light">{user.email}</p>}
      </div>
    </div>
  );
}
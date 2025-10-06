// Importa el componente Link de Next.js, que permite la navegación entre páginas sin recargar la página
import Link from "next/link";

// Importa un componente de botón personalizado desde la carpeta de la interfaz (UI)
import { Button } from "../ui/button";

// Importa la función createClient desde el archivo donde se configura el cliente de Supabase (conexión con la base de datos)
import { createClient } from "@/lib/supabase/server";


// Declara un componente asíncrono llamado AuthButton
// Se marca como async porque va a realizar una operación que requiere esperar (la consulta a Supabase)
export async function AuthButton() {

  // Crea una instancia del cliente de Supabase para poder interactuar con la base de datos y el sistema de autenticación
  const supabase = await createClient();

  // Obtiene las "claims" del usuario actual, es decir, los datos del token de autenticación del usuario logueado
  // También podrías usar supabase.auth.getUser(), pero este método es más rápido porque solo obtiene las claims del token
  const { data } = await supabase.auth.getClaims();

  // Extrae el objeto 'claims' (que contiene información del usuario) del resultado obtenido
  const user = data?.claims;

  // Devuelve diferente contenido dependiendo de si el usuario existe o no
  return user ? (

    // Si hay un usuario logueado, muestra su email y un botón de logout
    <div className="flex gap-2">

      {/* Botón para ir a la página protegida (dashboard) */}
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/dashboard">Go dashboard</Link>
      </Button>
     
      {/* Botón que simula la solicitud de una demo */}
      <Button asChild size="sm" variant={"default"}>
        <Link href="/">Request a demo</Link>
      </Button>
    </div>

  ) : (

    // Si no hay usuario logueado, muestra los botones para iniciar sesión o registrarse
    <div className="flex gap-2">

      {/* Botón para ir a la página de inicio de sesión */}
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>

      {/* Botón que simula la solicitud de una demo */}
      <Button asChild size="sm" variant={"default"}>
        <Link href="/">Request a demo</Link>
      </Button>
    </div>
  );
}
